"use client";
import { useRouter } from "next/navigation";
import { disconnect } from "@/lib/store/features/session/sessionSlice";
import { useAppDispatch } from "@/lib/store/hooks";

export default function LogOut() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const onLogout = async () => {
    const result = await fetch("/api/auth/logout");
    const res = await result.json();
    if (res.success) {
      dispatch(disconnect());
      router.push("/login");
    } else {
      console.log(res.error);
    }
  };
  return (
    <button
      onClick={onLogout}
      className="bg-blue-500 p-4 rounded-lg text-white"
    >
      Logout
    </button>
  );
}
