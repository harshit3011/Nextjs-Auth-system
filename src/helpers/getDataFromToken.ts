import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
  try {
    const enToken = request.cookies.get("token")?.value;

    if (!enToken) {
      throw new Error("Token not found");
    }

    const deToken: any = jwt.verify(enToken, process.env.TOKEN_SECRET!);
    return deToken.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};