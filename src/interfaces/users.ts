export interface userInfo {
  name?: string;
  lname?: string;
  email?: string;
  password?: string;
  oldpassword?:string;
  role?:string
}

export interface userInfoError {
  name?: string;
  lname?: string;
  email?: string;
  password?: string;
  cpassword?: string;
  oldpassword?:string;
}
