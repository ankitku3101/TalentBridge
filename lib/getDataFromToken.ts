import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request : NextRequest)=>{
    try {
        const token = request.cookies.get("token")?.value || "";
        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        return decodedToken
    } catch (error) {
        throw new Error(error.message);
    }
}