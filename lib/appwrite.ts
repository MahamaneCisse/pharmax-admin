import { Client, Account, Databases, ID, Query, Avatars } from "appwrite";
import router from "next/router";

export const config = {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!,
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
  pharmaciensCollectionId:
    process.env.NEXT_PUBLIC_APPWRITE_PHARMACIENS_COLLECTIONS_ID!,
  pharmaciesCollectionId:
    process.env.NEXT_PUBLIC_APPWRITE_PHARMACIES_COLLECTIONS_ID!,
  medicamentsCollectionId:
    process.env.NEXT_PUBLIC_APPWRITE_MEDICAMENTS_COLLECTIONS_ID!,
};

const client = new Client();
client.setEndpoint(config.endpoint).setProject(config.projectId);

const account = new Account(client);
const databases = new Databases(client);
const avatar = new Avatars(client);

let cachedUser: any = null;

export { client, account, databases, ID, Query };

export async function login() {
  try {
    const successUrl = `${window.location.origin}/dashboard`;
    const failureUrl = `${window.location.origin}/login`;
    const response = await account.createOAuth2Session(
      "google",
      successUrl,
      failureUrl
    );
    console.log("connecter");
    if (!response) throw new Error("failed to login");
    await createPharmacienIfNotExists();
    console.log("traitement");
  } catch (error: any) {
    console.log("Erreur de connexion" + error.message);
  }
}

// export const handleLogin = async () => {
//   try {
//     const successUrl = `${window.location.origin}/dashboard`;
//     const failureUrl = `${window.location.origin}/login`;

//     await account.createOAuth2Session("google", successUrl, failureUrl);
//   } catch (err: any) {
//     alert("Erreur de connexion : " + err.message);
//   }
// };

export const getCurrentUser = async () => {
  if (cachedUser) return cachedUser;

  try {
    const user = await account.get();

    // 1. Rechercher dans la collection des pharmaciens
    const result = await databases.listDocuments(
      config.databaseId,
      config.pharmaciensCollectionId,
      [Query.equal("pharmaciensId", user.$id)]
    );

    if (result.total === 0) {
      console.warn("Pharmacien non trouvé dans la base de données.");
      return null;
    }

    // 2. Ajouter l'avatar
    const pharmacien = result.documents[0];
    pharmacien.avatar = avatar.getInitials(pharmacien.name).toString();

    cachedUser = pharmacien;
    return cachedUser;
  } catch (error) {
    console.error("Erreur lors de la récupération du pharmacien :", error);
    return null;
  }
};

export const createPharmacienIfNotExists = async () => {
  try {
    const user = await account.get(); // récupère user connecté Appwrite

    // 🔍 1. Vérifie si ce pharmacien existe déjà dans la base
    const existing = await databases.listDocuments(
      config.databaseId,
      config.pharmaciensCollectionId,
      [Query.equal("pharmaciensId", user.$id)]
    );

    // ✅ S'il existe, on retourne simplement le document
    if (existing.documents.length > 0) {
      return existing.documents[0];
    }

    // 🆕 Sinon, on le crée
    const newPharmacien = await databases.createDocument(
      config.databaseId,
      config.pharmaciensCollectionId,
      ID.unique(),
      {
        name: user.name,
        email: user.email,
        pharmaciensId: user.$id, // lien vers Appwrite user
      }
    );

    return newPharmacien;
  } catch (error) {
    console.error("Erreur enregistrement pharmacien :", error);
    return null;
  }
};

export const handleLogout = async () => {
  await account.deleteSession("current");
  // Redirect to login page after logout
  router.push("/login");
};

export const createPharmacie = async (data: any) => {
  try {
    // 🔐 Obtenir le pharmacien connecté (créé si inexistant)
    const pharmacien = await createPharmacienIfNotExists();
    if (!pharmacien) throw new Error("Pharmacien introuvable");

    // 🏥 Créer la pharmacie avec le lien vers le pharmacien
    const response = await databases.createDocument(
      config.databaseId,
      config.pharmaciesCollectionId, // ← adapte selon ton ID de collection
      ID.unique(),
      {
        ...data,
        pharmacien: pharmacien.$id, // 🔗 champ relation Appwrite
      }
    );

    return response;
  } catch (error) {
    console.error("Erreur lors de la création de la pharmacie:", error);
    throw error;
  }
};

export const getPharmacieByPharmacien = async (pharmacienId: string) => {
  try {
    const result = await databases.listDocuments(
      config.databaseId,
      config.pharmaciesCollectionId,
      [Query.equal("pharmaciens", pharmacienId)]
    );

    if (result.total === 0) return null;
    return result.documents[0]; // on suppose une seule pharmacie par pharmacien
  } catch (err) {
    console.error("Erreur récupération pharmacie:", err);
    return null;
  }
};

export const createMedicament = async ({
  name,
  prix,
}: {
  name: string;
  prix: number;
}) => {
  try {
    const user = await getCurrentUser();
    if (!user) throw new Error("Utilisateur non connecté");

    const pharmacie = await getPharmacieByPharmacien(user.$id);
    if (!pharmacie) throw new Error("Pharmacie introuvable");

    const generatedId = ID.unique();
    console.log("ID généré :", generatedId); // 🔍 Doit être aléatoire

    const medicament = await databases.createDocument(
      config.databaseId,
      config.medicamentsCollectionId,
      generatedId,
      {
        name,
        prix,
        pharmacieId: pharmacie.$id,
      }
    );
    return medicament;
  } catch (err) {
    console.error("Erreur ajout médicament :", err);
    throw err;
  }
};

export const getMedicamentsByPharmacie = async (pharmacieId: string) => {
  try {
    const result = await databases.listDocuments(
      config.databaseId,
      config.medicamentsCollectionId,
      [Query.equal("pharmacieId", pharmacieId)] // champ de relation exact
    );

    return result.documents;
  } catch (error) {
    console.error("Erreur récupération médicaments :", error);
    return [];
  }
};
