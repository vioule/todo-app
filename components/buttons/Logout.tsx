"use client";
import { useRouter } from "next/navigation";
import { disconnect } from "@/lib/store/features/session/sessionSlice";
import { useAppDispatch } from "@/lib/store/hooks";
import { HiOutlineLogin } from "react-icons/hi";

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
      className="p-2 w-full rounded-lg flex items-center font-semibold justify-center hover:bg-blue-50 hover:text-primary text-slate-600 tracking-wider"
    >
      <HiOutlineLogin className="max-sm:h-[25px] max-sm:w-[25px] h-6 w-6" />
      <span className="ml-2 max-sm:hidden">Logout</span>
    </button>
  );
}
