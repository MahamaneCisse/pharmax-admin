import { Client, Account, Databases } from "appwrite";

export const config = {
  platform: "com.abasco.native",
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!,
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
  pharmaciesCollectionId:
    process.env.NEXT_PUBLIC_APPWRITE_PHARMACIES_COLLECTIONS_ID!,
  userCollectionId: process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTIONS_ID!,
};

const client = new Client();

client.setEndpoint(config.endpoint).setProject(config.projectId);

const account = new Account(client);
const databases = new Databases(client);

export { client, account, databases };
