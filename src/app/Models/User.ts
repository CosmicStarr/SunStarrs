export interface IUser {
    email:string;
    password?: string;
    token?: string;
    rememberMe?: boolean;
    JobDepartment?:string;
    role?:string[];
}