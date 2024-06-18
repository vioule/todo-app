import { NextRequest, NextResponse } from "next/server";
import { JWT_SECRET } from "@/lib/constants";
import * as jose from "jose";
import dbConnect from "@/lib/db";
import User, { Users } from "@/models/User";
import { JWTPayload } from "@/actions/session";
import Task, { Tasks } from "@/models/Task";

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

export async function DELETE(request: NextRequest) {
  try {
    // check if user is logged
    const jwt = request.cookies.get("jwt");
    await jose.jwtVerify<JWTPayload>(jwt!.value, JWT_SECRET);

    const { taskId } = await request.json();
    await dbConnect();
    const result = await Task.deleteOne({ _id: taskId });
    if (result.deletedCount === 0) {
      return Response.json(
        { error: "Cannot find the task to delete." },
        { status: 401 }
      );
    }
    return NextResponse.json({
      message: "Task deleted successfully.",
      success: true,
    });
  } catch (error: any) {
    return Response.json({ error }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    // check if user is logged
    const jwt = request.cookies.get("jwt");
    await jose.jwtVerify<JWTPayload>(jwt!.value, JWT_SECRET);

    const { taskId, title, description } = await request.json();
    await dbConnect();
    const result = await Task.updateOne(
      { _id: taskId },
      { title, description }
    );

    if (result.modifiedCount === 0) {
      return Response.json(
        { error: "Cannot find the task to update." },
        { status: 401 }
      );
    }

    return NextResponse.json({
      message: "Task updated successfully.",
      success: true,
    });
  } catch (error: any) {
    return Response.json({ error }, { status: 500 });
  }
}
