import { IoClose } from "react-icons/io5";

interface ICloseButton {
  onClick: () => void;
}

export default function CloseButton({ onClick }: ICloseButton) {
  return (
    <button
      className="bg-slate-100 hover:text-primary hover:bg-blue-50 rounded-full"
      onClick={onClick}
    >
      <IoClose className="w-8 h-8" />
    </button>
  );
}
