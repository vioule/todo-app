import User, { Users } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import * as jose from "jose";
import { SignupAPISchema } from "@/schemas/Login";
import dbConnect from "@/lib/db";
import mailer from "@/lib/mail";
import { JWT_SECRET, NEXT_PUBLIC_PATH } from "@/lib/constants";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Users;

    //data validation
    SignupAPISchema.parse(body);

    const { name, email, password } = body;
    await dbConnect();
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    //create verifyToken
    const verifyToken = await new jose.SignJWT({ email })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1 day")
      .sign(JWT_SECRET);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      verifyToken,
    });
    await newUser.save();

    //send verification email
    try {
      await mailer.sendMail({
        from: "noreply@demomailtrap.com",
        to: email,
        subject: "TodoApp Account email verification",
        html: `<h1>You have created an account on TodoApp</h1>
        <p>Please verify your adress mail by clicking this link : </p>
        </br>
        <a href=${NEXT_PUBLIC_PATH}/api/auth/verify-email?id=${verifyToken}>Verify your email</a>`,
      });
    } catch (error) {
      console.log(error);
    }
    return NextResponse.json({
      message: "User created successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Something went wrong..." },
      { status: 500 }
    );
  }
}
