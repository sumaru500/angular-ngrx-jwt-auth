import { AuthUser } from "./auth";

export interface State {
    user: AuthUser,
    homeContent: string,
    userContent: string,
    adminContent: string,
    modContent: string,
 }
