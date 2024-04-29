// The first set of functions (async login, async getCurrentUser, async logout) seem to be methods responsible for interacting with an external service, possibly for authentication purposes. Each function performs a specific action such as logging in, getting the current user, or logging out.

import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";
export class AuthService {
    client = new Client();
    account;
    constructor() {
        this.client.setEndpoint(conf.appWriteUrl).setProject(conf.appProjectId);
        this.account = new Account(this.client);
    }

    async login({ email, password }) {
        try {
            console.log("login")
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                return this.login({ email, password });
            } else {
                return userAccount;
            }
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async getCurrentUser() { // login ho nhi rha pahle toh currentuser kaha se milega, av hum request kr rhe toh guest smjh rha h
        try {
            console.log(this.account)
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }
        return null;
    }
    async logout() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }

    }
}
const authService = new AuthService();
export default authService;


// isme ek Client class ka object banega or ek Account class ka instance fhir uss client ko kis endpoint(URL where appwrite is hosted) sai communicate krna h or kiss project sai
//fhir hum ek method banayenge createAccount naam ka jisme email,password,name pass karenge parameters fhir ek account create karenge jisme hum pass karenge id,email,password,name (await mai jb taak account ni baan jata further execution ni hoga) fhir hum dekhenge ki usserAccount baan gya ya nhi agar bangya toh login bhi karadenge nhi bana toh error return krdenge
//fhir hum login karaenge createEmailSession sai joh method h hamara Account class mai or hum jisko call karenge uske instance sai
