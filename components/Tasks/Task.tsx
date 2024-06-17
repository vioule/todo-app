import { MdEdit, MdDelete } from "react-icons/md";

interface ITask {
  title: string;
  description: string;
}

export default function Task({ title, description }: ITask) {
  return (
    <div className=" max-w-[300px] border-[1px] p-4 rounded-md flex flex-col gap-2 h-[200px]">
      <div className="text-lg font-semibold">{title}</div>
      <div className="text-md">{description}</div>
      <div className="flex gap-2">
        <button className="flex items-center border-[1px] p-2 rounded-md">
          <MdEdit />
        </button>
        <button className="flex items-center border-[1px] p-2 rounded-md">
          <MdDelete />
        </button>
      </div>
    </div>
  );
}
