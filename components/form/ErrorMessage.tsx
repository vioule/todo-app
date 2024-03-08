import { TErrorMessage } from "@/types";

interface IErrorMessage {
  error: TErrorMessage;
}

export default function ErrorMessage({ error }: IErrorMessage) {
  const errorMessage = error ? (
    <span className="font-semibold text-sm text-red-400">{error}</span>
  ) : null;
  return <>{errorMessage}</>;
}
