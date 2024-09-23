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
    first_name: string;
    last_name: string;
    date_of_birth: Date;
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
    status: "ACTIVE" | "INACTIVE" | "PENDING";
}

export interface ScoutPayload {
    // Scout State

    id: string;
    first_name: string;
    last_name: string;
    date_of_birth: Date;
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

export interface AttendanceData {
    present_date: string;
    daraz: boolean;
    paid: boolean;
}

export interface AttendancePayload {
    attendance_id: string;
    scout_id: string;
    present_date: string;
    daraz: boolean;
    paid: boolean;
}
