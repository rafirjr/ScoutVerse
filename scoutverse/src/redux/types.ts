export interface UserState {
    firstname: string;
    lastname: string;
    id: string;
    username: string;
    token: string;
}

export interface User {
    id: string;
    username: string;
    //role: string;
}

export interface LoginPayload {
    username: string;
    password: string;
}

export interface CredentialsPayload {
    firstname: string;
    lastname: string;
    username: string;
    password: string;
}

export interface NotifPayload {
    message: string;
    type: "success" | "error";
}
