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

export interface ScoutData {
    firstname: string;
    lastname: string;
    dob: Date;
    khoump: string;
    street: string;
    city: string;
    state: string;
    zip_code: string;
    contact_number: string;
    contact_email: string;
    parent_name: string;
    parent_email: string;
    parent_number: string;
    allergies: string;
    size: string;
}

export interface ScoutPayload {
    // Scout State

    id: string;
    firstname: string;
    lastname: string;
    dob: Date;
    khoump: string;
    street: string;
    city: string;
    state: string;
    zip_code: string;
    contact_number: string;
    contact_email: string;
    parent_name: string;
    parent_email: string;
    parent_number: string;
    allergies: string;
    size: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

export type ScoutSortValues = "gark" | "bashdon" | "astijan" | "dob";
