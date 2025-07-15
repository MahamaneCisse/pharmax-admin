import { Client, Account, Databases, ID, Query, Avatars } from "appwrite";
import router from "next/router";

export const config = {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!,
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
  pharmaciensCollectionId:
    process.env.NEXT_PUBLIC_APPWRITE_PHARMACIENS_COLLECTIONS_ID!,
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
    const user = await getCurrentUser();
    if (!user) throw new Error("Utilisateur non connecté");

    const existing = await databases.listDocuments(
      config.databaseId,
      config.pharmaciensCollectionId,
      [Query.equal("pharmaciensId", user.$id)]
    );

    if (existing.documents.length === 0) {
      await databases.createDocument(
        config.databaseId,
        config.pharmaciensCollectionId,
        ID.unique(),
        {
          email: user.email,
          name: user.name,
          pharmaciensId: user.$id,
        }
      );
    }
    console.log("Pharmacien enregistré ou déjà existant.");

    return true;
  } catch (error) {
    console.error("Erreur enregistrement pharmacien :", error);
    return false;
  }
};

export const handleLogout = async () => {
  await account.deleteSession("current");
  // Redirect to login page after logout
  router.push("/login");
};
