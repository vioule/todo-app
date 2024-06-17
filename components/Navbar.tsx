import Link from "next/link";
import { IoClipboardOutline } from "react-icons/io5";
import { LiaBookOpenSolid } from "react-icons/lia";
import { TbStack2 } from "react-icons/tb";
import LogOut from "./buttons/Logout";

export default function Navbar() {
  return (
    <div className="h-full w-[250px] max-sm:w-[80px] flex flex-col border-r-[1px]">
      <nav className="grow p-4 items-center justify-between">
        <ul className="w-full font-semibold text-slate-600 tracking-wider">
          <li className="flex items-center p-2 rounded-md hover:text-blue-400 max-sm:justify-center">
            <Link href={"/dashboard"} className="flex items-center">
              <IoClipboardOutline className="max-sm:h-[25px] max-sm:w-[25px] h-6 w-6" />
              <span className="ml-2 max-sm:hidden">Dashboard</span>
            </Link>
          </li>
          <li className="flex items-center p-2 rounded-md bg-blue-50 text-primary hover:text-primary max-sm:justify-center">
            <Link href={"/dashboard"} className="flex items-center">
              <LiaBookOpenSolid className="max-sm:h-[25px] max-sm:w-[25px] h-6 w-6" />
              <span className="ml-2 max-sm:hidden">Tasks</span>
            </Link>
          </li>
          <li className="flex items-center p-2 rounded-md hover:text-blue-400 max-sm:justify-center">
            <Link href={"/dashboard"} className="flex items-center">
              <TbStack2 className="max-sm:h-[25px] max-sm:w-[25px] h-6 w-6" />
              <span className="ml-2 max-sm:hidden">Projects</span>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="border-t-[1px] w-full p-4">
        <LogOut />
      </div>
    </div>
  );
}
