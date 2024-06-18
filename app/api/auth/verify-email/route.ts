import { NextResponse } from "next/server";
import * as jose from "jose";
import { JWT_SECRET } from "@/lib/constants";
import dbConnect from "@/lib/db";
import User from "@/models/User";

export interface JWTPayload {
  email: string;
  iat: Date;
  exp: Date;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (id) {
      await dbConnect();
      const { payload } = await jose.jwtVerify<JWTPayload>(id, JWT_SECRET);

      const { emailVerified } = await User.findOneAndUpdate(
        { email: payload.email },
        { emailVerified: true, verifyToken: null },
        { new: true }
      );

      if (emailVerified) {
        return NextResponse.redirect(new URL("/login", request.url));
      }
      return Response.json(
        { error: "Can't verify your email." },
        { status: 401 }
      );
    }
    return NextResponse.json({ error: "Wrong URL" }, { status: 404 });
  } catch (error: any) {
    return Response.json({ error }, { status: 500 });
  }
}
