"use server";
import { JWT_SECRET } from "@/lib/constants";
import {
  ISessionState,
  initialState,
} from "@/lib/store/features/session/sessionSlice";
import * as jose from "jose";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export interface JWTPayload {
  id: string;
  email: string;
  username: string;
}

export async function getSession(jwt: RequestCookie): Promise<ISessionState> {
  try {
    const { payload } = await jose.jwtVerify<JWTPayload>(jwt.value, JWT_SECRET);
    return {
      user: {
        id: payload.id,
        email: payload.email,
        username: payload.username,
      },
    };
  } catch (error) {
    return initialState;
  }
}
