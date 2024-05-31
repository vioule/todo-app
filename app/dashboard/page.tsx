"use client";
import LogOut from "@/components/buttons/Logout";
import { selectUser } from "@/lib/store/features/session/sessionSlice";
import { useAppSelector } from "@/lib/store/hooks";

export default function Dashboard() {
  const user = useAppSelector(selectUser);
  return (
    <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
      <div>Hello</div>
      <div>{user?.username}</div>
      <LogOut />
    </div>
  );
}
