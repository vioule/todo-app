import {
  setOverlayTaskId,
  setOverlayValue,
} from "@/lib/store/features/overlay/overlaySlice";
import { useAppDispatch } from "@/lib/store/hooks";
import { MdEdit, MdDelete } from "react-icons/md";

interface ITask {
  title: string;
  description: string;
  id: string;
}

export default function Task({ title, description, id }: ITask) {
  const dispatch = useAppDispatch();
  return (
    <div className=" max-w-[300px] border-[1px] p-4 rounded-md flex flex-col gap-2 h-[200px]">
      <div className="text-lg font-semibold">{title}</div>
      <div className="text-md">{description}</div>
      <div className="flex gap-2">
        <button className="flex items-center border-[1px] p-2 rounded-md">
          <MdEdit />
        </button>
        <button
          className="flex items-center border-[1px] p-2 rounded-md hover:text-red-600 hover:bg-slate-50"
          onClick={() => {
            dispatch(setOverlayValue("delete"));
            dispatch(setOverlayTaskId(id));
          }}
        >
          <MdDelete />
        </button>
      </div>
    </div>
  );
}
