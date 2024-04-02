import { TInfoMessage } from "@/types";

interface IErrorMessage {
  error: TInfoMessage;
}
interface ISuccessMessage {
  success: TInfoMessage;
}

export const ErrorMessage = ({ error }: IErrorMessage) => {
  const errorMessage = error ? (
    <span className="font-semibold text-sm text-red-400">{error}</span>
  ) : null;
  return <>{errorMessage}</>;
};

export const SuccessMessage = ({ success }: ISuccessMessage) => {
  const sucessMessage = success ? (
    <span className="font-semibold text-sm text-green-400">{success}</span>
  ) : null;
  return <>{sucessMessage}</>;
};
