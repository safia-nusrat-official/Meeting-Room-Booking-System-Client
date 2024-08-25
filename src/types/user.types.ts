export interface TUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: "admin" | "user";
}
export interface TLoginData {
  email: string;
  password: string;
}
