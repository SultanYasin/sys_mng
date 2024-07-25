"use server";
import { Query, ID } from "node-appwrite";

import { parseStringify } from "../utils";
import { InputFile } from "node-appwrite/file";
import {
  BUCKET_ID,
  DATABASE_ID,
  ENDPOINT,
  EMPLOYEES_COLLECTION_ID,
  PROJECT_ID,
  databases,
  storage,
  users,
} from "../appwrite.config";
export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );
  } catch (error: any) {
    if (error && error?.code === 409) {
      const documents = await users.list([
        // document = existingUSer
        Query.equal("email", [user.email]), // finding user if exists
      ]);
      return documents?.users[0];
    }
  }
};

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);
    return parseStringify(user);
  } catch (error) {
    console.error(error);
  }
};

export const registerUser = async ({
  identificationDocument,
  ...user
}: RegisterUserParams) => {
  //add info to storage
  try {
    let file;
    if (identificationDocument) {
      const inputFile = InputFile.fromBuffer(
        identificationDocument?.get("blobFile") as Blob,
        identificationDocument?.get("fileName") as string
      );
      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);

      //create user document
      // Create new user document -> https://appwrite.io/docs/references/cloud/server-nodejs/databases#createDocument
      const newUser = await databases.createDocument(
        DATABASE_ID!,
        EMPLOYEES_COLLECTION_ID!,
        ID.unique(),
        {
          identificationDocumentId: file?.$id ? file.$id : null,
          identificationDocumentUrl: file?.$id
            ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view??project=${PROJECT_ID}`
            : null,
          ...user,
        }
      );
      return ( console.log(newUser), parseStringify(newUser));
    }
  } catch (error) {
    console.error(error);
  }
};
 