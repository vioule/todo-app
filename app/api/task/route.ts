import { NextRequest, NextResponse } from "next/server";
import { JWT_SECRET } from "@/lib/constants";
import * as jose from "jose";
import dbConnect from "@/lib/db";
import User, { Users } from "@/models/User";
import { JWTPayload } from "@/actions/session";
import Task from "@/models/Task";

export async function POST(request: NextRequest) {
  try {
    // check if user is logged
    const jwt = request.cookies.get("jwt");
    await jose.jwtVerify<JWTPayload>(jwt!.value, JWT_SECRET);

    const { userId, title, description } = await request.json();
    await dbConnect();
    // check is user email exists
    const user = await User.findOne<Users>({ _id: userId });
    if (!user) {
      return Response.json(
        { error: "Can't add task on unknown user." },
        { status: 401 }
      );
    }

    // add new task
    const newTask = new Task({
      title,
      description,
      user: userId,
    });
    const task = await newTask.save();

    return NextResponse.json({
      message: "Task created successfully.",
      task,
      success: true,
    });
  } catch (error: any) {
    return Response.json({ error }, { status: 500 });
  }
}
