export interface UserState {
    id: string;
    username: string;
    token: string;
}

export interface User {
    id: string;
    username: string;
    //role: string;
}

export interface CredentialsPayload {
    username: string;
    password: string;
}