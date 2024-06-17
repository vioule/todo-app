"use client";
import Password from "@/components/form/Password";
import Email from "@/components/form/Email";
import Spinner from "@/components/icons/Spinner";
import Link from "next/link";
import { useState } from "react";
import { z } from "zod";
import LoginSchema from "@/schemas/Login";
import { TInfoMessage } from "@/types";
import { ErrorMessage } from "@/components/form/InfoMessage";
import Slogan from "@/components/login/Slogan";
import { useAppDispatch } from "@/lib/store/hooks";
import { setTasks, setUser } from "@/lib/store/features/session/sessionSlice";
import { useRouter } from "next/navigation";

interface ILoginError {
  email: TInfoMessage;
  password: TInfoMessage;
  response: TInfoMessage;
}

export default function Login() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [error, setError] = useState<ILoginError>({
    email: null,
    password: null,
    response: null,
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleOnClick = async () => {
    try {
      const res = LoginSchema.parse({ email, password });
      setIsLoading(true);
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      setIsLoading(false);
      if (data.success) {
        //redirect to user dashboard
        dispatch(setUser(data.session.user));
        dispatch(setTasks(data.session.tasks));
        router.push("/dashboard");
      } else {
        setError({
          email: null,
          password: null,
          response: data.message,
        });
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        let ret: ILoginError = {
          email: null,
          password: null,
          response: null,
        };
        err.issues.map((e) => {
          const path = e.path[0] as "email" | "password";
          ret[path] = e.message;
        });
        setError({ ...error, ...ret });
      } else {
        throw err;
      }
    }
  };
  return (
    <div className="h-screen w-screen flex flex-row max-w-[1920px]">
      <Slogan />
      <div className="relative bg-white w-full h-full flex justify-center overflow-x-hidden">
        <div className="flex flex-col justify-center p-10 gap-2 h-full max-w-[600px] w-full min-h-[550px] max-sm:min-h-[500px]">
          <div className="w-[4rem] h-[4rem] bg-primary mb-6 hidden max-lg:block"></div>
          <p className="text-5xl font-bold mb-4">Log in</p>
          <span className="font-bold text-lg mt-4">Email address</span>
          <Email
            onChange={(e) => setEmail(e.target.value)}
            error={error.email}
          />
          <span className="font-bold text-lg mt-4">Password</span>
          <Password
            onChange={(e) => setPassword(e.target.value)}
            error={error.password}
          />
          <button
            className=" bg-primary text-white p-4 rounded-xl mt-6 hover:bg-primary-darken"
            onClick={handleOnClick}
          >
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
          <ErrorMessage error={error.response} />
        </div>
        {isLoading && (
          <div className="absolute left-0 top-0 h-full w-full flex justify-center items-center text-primary backdrop-blur-[2px] backdrop-saturate-50">
            <Spinner size={4} />
          </div>
        )}
      </div>
    </div>
  );
}
