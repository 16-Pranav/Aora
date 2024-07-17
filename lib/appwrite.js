import { Account, Avatars, Client, Databases, ID } from "react-native-appwrite";
import SignIn from "../app/(auth)/sign-in";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.jsm.aora",
  projectId: "669550c2000abf6918be",
  databaseId: "669552a9000dd8e57a1e",
  userCollectionId: "669552d40034c5f65bca",
  videoCollectionId: "6695530b000c6951dce0",
  storageId: "66955477000d50b6001c",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint) // Your Appwrite Endpoint
  .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform); // Your application ID or bundle ID.
  

const account = new Account(client);
const avatars = new Avatars(client)
const databases = new Databases(client)

// Register User
export const createUser = async (email,password,username) => {
try {
  const newAccount = await account.create(
    ID.unique(),
    email,
    password,
    username
  )

  if (!newAccount) throw Error
  
  const avatarUrl = avatars.getInitials(username)

  await SignIn(email, password);

  const newUser = await databases.createDocument(
    config.databaseId,
    config.userCollectionId,
    ID.unique(),
    {
      accountId: newAccount.$id,
      email,
      username,
      avatar: avatarUrl,
    }
  )

  return newUser

} catch (error) {
  console.log(error)
  throw new Error(error)
}
};


export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password)
    return session
  } catch (error) {
    throw new Error(error)
    
  }
}