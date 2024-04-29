const conf={
    appWriteUrl:String(import.meta.env.VITE_APPWRITE_URL),
    appProjectId:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appDatabaseId:String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appCollectionId:String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appBucketId:String(import.meta.env.VITE_APPWRITE_BUCKET_ID)
}
export default conf
//environment variables ki help sai sensitive data ko manage kr skte h security kai liye like api keys vgera code mai direct likhne sai acha h kisi variable mai store krdo