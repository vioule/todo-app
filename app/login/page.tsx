import Password from "@/components/form/Password";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineMail } from "react-icons/md";

export default async function Login() {
  return (
    <div className="h-screen w-screen flex flex-row max-w-[1920px]">
      <div className="relative bg-primary w-full max-lg:hidden text-white px-20 pt-24">
        <Image
          src={"/auth-background.png"}
          alt="Abstract background"
          width={3900}
          height={3900}
          className="absolute top-0 left-0 w-full h-full opacity-15 object-cover"
        />
        <div className="w-[4rem] h-[4rem] bg-white"></div>
        <h1 className="text-4xl font-bold mt-10">Achieve More, Stress Less</h1>
        <h2 className="text-xl font-light mt-4">
          Unleash the Power of Your To-Do List.
        </h2>
      </div>
      <div className="bg-white w-full h-full flex justify-center overflow-x-hidden">
        <div className="flex flex-col justify-center p-10 gap-4 h-full max-w-[600px] w-full min-h-[550px] max-sm:min-h-[500px]">
          <div className="w-[4rem] h-[4rem] bg-primary mb-6 hidden max-lg:block"></div>
          <p className="text-5xl font-bold mb-4">Log in</p>
          <span className="font-bold text-lg">Email address</span>
          <div className="relative">
            <input
              type="email"
              className="p-4 px-14 border-gray-200 border-2 rounded-xl focus:drop-shadow-xl outline-none w-full"
            />
            <MdOutlineMail className="absolute top-[50%] translate-y-[-50%] left-4 text-[1.5rem] text-gray-300" />
          </div>
          <span className="font-bold text-lg">Password</span>
          <Password />
          <button className=" bg-primary text-white p-4 rounded-xl mt-6 hover:bg-primary-darken">
            Log in
          </button>
          <span>
            Don&apos;t have an account yet ?{" "}
            <Link
              href={"/signup"}
              className="text-primary font-bold hover:text-primary-darken"
            >
              Sign up
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
