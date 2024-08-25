import { jwtDecode } from "jwt-decode";

export function verifyToken(token:string){
    const decoded = jwtDecode(token)
    return decoded
}