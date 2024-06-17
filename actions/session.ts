"use server";
import { JWT_SECRET } from "@/lib/constants";
import dbConnect from "@/lib/db";
import {
  ISessionState,
  initialState,
} from "@/lib/store/features/session/sessionSlice";
import Task, { Tasks } from "@/models/Task";
import { TTask } from "@/types";
import * as jose from "jose";
import mongoose, { Mongoose } from "mongoose";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export interface JWTPayload {
  id: string;
  email: string;
  username: string;
}

export async function getSession(jwt: RequestCookie): Promise<ISessionState> {
  try {
    const { payload } = await jose.jwtVerify<JWTPayload>(jwt.value, JWT_SECRET);
    await dbConnect();
    const tasks = (
      await Task.find<Tasks>({ user: payload.id }, "_id title description user")
    ).map((task) => {
      const doc: TTask = task.toJSON();
      return { ...doc, _id: doc._id.toString() };
    });
    return {
      user: {
        id: payload.id,
        email: payload.email,
        username: payload.username,
      },
      tasks,
    };
  } catch (error) {
    return initialState;
  }
}
