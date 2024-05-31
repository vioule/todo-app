import { NextResponse } from "next/server";
import { JWT_SECRET } from "@/lib/constants";
import bcrypt from "bcryptjs";
import * as jose from "jose";
import dbConnect from "@/lib/db";
import User, { Users } from "@/models/User";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    await dbConnect();
    const user = await User.findOne<Users>({ email });
    if (!user) {
      return Response.json(
        { error: "Incorrect credentials." },
        { status: 401 }
      );
    }
    const isPasswordOk = await bcrypt.compare(password, user.password);
    if (!isPasswordOk) {
      return Response.json(
        { error: "Incorrect credentials." },
        { status: 401 }
      );
    }

    // create jwt
    const jwt = await new jose.SignJWT({
      id: user.id,
      email: user.email,
      username: user.name,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(JWT_SECRET);
    let response = NextResponse.json({
      success: true,
      session: {
        user: {
          id: user.id,
          username: user.name,
          email: user.email,
        },
      },
    });
    response.cookies.set("jwt", jwt, {
      httpOnly: true,
      secure: true,
    });
    return response;
  } catch (error: any) {
    return Response.json({ error }, { status: 500 });
  }
}
