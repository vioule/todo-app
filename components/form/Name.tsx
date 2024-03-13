import { TErrorMessage } from "@/types";
import { FaRegUser } from "react-icons/fa";
import ErrorMessage from "./ErrorMessage";

interface IName {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: TErrorMessage;
}

export default function Name({ onChange, error }: IName) {
  return (
    <>
      <div className="relative">
        <input
          type="text"
          className={`p-4 px-14 border-2 rounded-xl focus:drop-shadow-xl outline-none w-full ${
            error ? "border-red-300" : "border-gray-200"
          }`}
          onChange={onChange}
        />
        <FaRegUser className="absolute top-[50%] translate-y-[-50%] left-4 text-[1.5rem] text-gray-300" />
      </div>
      <ErrorMessage error={error} />
    </>
  );
}
