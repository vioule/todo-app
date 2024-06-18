import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import StoreProvider from "./StoreProvider";
import { cookies } from "next/headers";
import "./globals.css";
import { getSession } from "@/actions/session";
import {
  ISessionState,
  initialState,
} from "@/lib/store/features/session/sessionSlice";
import { overlayInitialState } from "@/lib/store/features/overlay/overlaySlice";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-quicksand",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jwt = cookies().get("jwt");
  let session: ISessionState;
  if (jwt) {
    session = await getSession(jwt);
  } else {
    session = initialState;
  }
  return (
    <StoreProvider preloadedState={{ session, overlay: overlayInitialState }}>
      <html
        lang="en"
        className="max-sm:text-[12px] max-xl:text-[14px] text-[16px]"
      >
        <body className={`${quicksand.variable}`}>
          <main className="flex min-h-screen flex-col items-center justify-between bg-gray-50 font-quicksand text-black">
            {children}
          </main>
        </body>
      </html>
    </StoreProvider>
  );
}
