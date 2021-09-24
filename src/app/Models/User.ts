export interface IUser {
    email?:string;
    given_name?:string;
    password?: string;
    token?: string;
    rememberMe?: boolean;
    JobDepartment?:string;
    role?:string;
}