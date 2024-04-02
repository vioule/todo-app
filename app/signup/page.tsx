"use client";
import Password from "@/components/form/Password";
import Email from "@/components/form/Email";
import Spinner from "@/components/icons/Spinner";
import Link from "next/link";
import { useState } from "react";
import { z } from "zod";
import { SignupSchema } from "@/schemas/Login";
import { TInfoMessage } from "@/types";
import { ErrorMessage, SuccessMessage } from "@/components/form/InfoMessage";
import Slogan from "@/components/login/Slogan";
import Name from "@/components/form/Name";

interface ISignupError {
  name: TInfoMessage;
  email: TInfoMessage;
  verifyEmail: TInfoMessage;
  password: TInfoMessage;
  response: TInfoMessage;
}
interface ISignupSuccess {
  response: TInfoMessage;
}

export default function Signup() {
  const [error, setError] = useState<ISignupError>({
    name: null,
    email: null,
    verifyEmail: null,
    password: null,
    response: null,
  });
  const [success, setSuccess] = useState<ISignupSuccess>({
    response: null,
  });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [verifyEmail, setVerifyEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleOnClick = async () => {
    try {
      SignupSchema.parse({ name, email, verifyEmail, password });
      setIsLoading(true);
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({ email, name, password }),
      });
      const data = await response.json();
      setIsLoading(false);
      if (data.success) {
        setError({
          name: null,
          email: null,
          verifyEmail: null,
          password: null,
          response: null,
        });
        setSuccess({
          response: data.message,
        });
      } else {
        setError({
          name: null,
          email: null,
          verifyEmail: null,
          password: null,
          response: data.error,
        });
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        let ret: ISignupError = {
          name: null,
          email: null,
          verifyEmail: null,
          password: null,
          response: null,
        };
        err.issues.map((e) => {
          const path = e.path[0] as
            | "email"
            | "password"
            | "verifyEmail"
            | "name";
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
        <div className="flex flex-col justify-center p-10 gap-2 h-full max-w-[600px] w-full min-h-[800px] max-sm:min-h-[700px]">
          <div className="w-[4rem] h-[4rem] bg-primary mb-6 hidden max-lg:block"></div>
          <p className="text-5xl font-bold mb-4">Sign up</p>
          <span className="font-bold text-lg mt-4">Name</span>
          <Name onChange={(e) => setName(e.target.value)} error={error.name} />
          <span className="font-bold text-lg mt-4">Email address</span>
          <Email
            onChange={(e) => setEmail(e.target.value)}
            error={error.email}
          />
          <span className="font-bold text-lg mt-4">Verify email address</span>
          <Email
            onChange={(e) => setVerifyEmail(e.target.value)}
            error={error.verifyEmail}
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
            Sign up
          </button>
          <span>
            Already have an account ?{" "}
            <Link
              href={"/login"}
              className="text-primary font-bold hover:text-primary-darken"
            >
              Log in
            </Link>
          </span>
          <ErrorMessage error={error.response} />
          <SuccessMessage success={success.response} />
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
