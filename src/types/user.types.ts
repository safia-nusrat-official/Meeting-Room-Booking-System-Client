export interface TUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  profileImage?:string;
  role: "admin" | "user";
  _id?:string // mongoDB ID
}
export interface TLoginData {
  email: string;
  password: string;
}
