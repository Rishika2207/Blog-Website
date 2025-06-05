//yeh sirf mere functions h

import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";
export class Service {
    client = new Client();
    databases;
    bucket;
    constructor() {
        this.client.setEndpoint(conf.appWriteUrl).setProject(conf.appProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }
    //humne ek Client class ka instance banake ussi kai liye database or storage allocate krdiya ab yeh sarre methods createPost,updatePost etc same database or storage pai kaam karenge
    async createPost({ title, content, featuredImage, status, userId }) {
        try {
            console.log(status, userId)
            const documentId = ID.unique(); // Generate a unique documentId
            return await this.databases.createDocument(
                conf.appDatabaseId,
                conf.appCollectionId,
                documentId, // Use the generated documentId as the slug
                {
                    content, title: title, featuredImage, status, userId
                }
            );
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
            throw error; // Re-throw the error for further handling
        }
    }
    // This block attempts to create a document in the specified database and collection using the createDocument method of the databases instance. It passes the database ID, collection ID, document slug, and an object containing post details as parameters. It returns the result of the operation.
    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appDatabaseId,
                conf.appCollectionId,
                slug,
                {
                    title, content, featuredImage, status
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
        }
    }
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appDatabaseId,
                conf.appCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false;
        }
    }
    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appDatabaseId,
                conf.appCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return null; // Return null instead of false for better consistency
        }
    }
    async getPosts(queries = []) {
        try {
            return await this.databases.listDocuments(
                conf.appDatabaseId,
                conf.appCollectionId,
            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false;
        }
    }
    async deleteFile(fileId) {
        try {
            return await this.bucket.deleteFile(
                conf.appBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false;
        }
    }
    getFilePreview(fileId) {   //In the context of files or documents, a "preview" typically refers to a smaller, simplified, or condensed version of the original content that gives users a glimpse or overview of what the full content entails. 
        return this.bucket.getFileView(
            conf.appBucketId,
            fileId
        )
    }
    //hume url milta h iss sai
}
const service = new Service()
export default service