"use client";
import Password from "@/components/form/Password";
import Email from "@/components/form/Email";
import Spinner from "@/components/icons/Spinner";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { z } from "zod";
import LoginSchema from "@/schemas/Login";
import { TErrorMessage } from "@/types";
import ErrorMessage from "@/components/form/ErrorMessage";

interface ILoginError {
  email: TErrorMessage;
  password: TErrorMessage;
  response: TErrorMessage;
}

export default function Login() {
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
      const response = await fetch("/api/test-loading");
      const data = await response.json();
      setIsLoading(false);
      if (data.user) {
        //redirect to user dashboard
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
      <div className="relative bg-primary w-full max-lg:hidden text-white px-20 pt-24">
        <Image
          src={"/auth-background.png"}
          alt="Abstract background"
          width={3900}
          height={3900}
          className="absolute top-0 left-0 w-full h-full opacity-15 object-cover"
        />
        <div className="relative w-[4rem] h-[4rem] bg-white"></div>
        <h1 className="text-4xl font-bold mt-10">Achieve More, Stress Less</h1>
        <h2 className="text-xl font-light mt-4">
          Unleash the Power of Your To-Do List.
        </h2>
      </div>
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
