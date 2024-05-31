import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    let response = NextResponse.json({ success: true });
    response.cookies.delete("jwt");
    return response;
  } catch (error: any) {
    return Response.json({ error }, { status: 500 });
  }
}
