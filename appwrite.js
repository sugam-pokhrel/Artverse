import { Client, Account, ID,Databases } from 'appwrite';

const client = new Client()//i have not used the process env coz its testing purpose but you rather add it
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('6463ab03680141f26d69');               // Your project ID


export const databases = new Databases(client);