import {
  setOverlayTask,
  setOverlayValue,
} from "@/lib/store/features/overlay/overlaySlice";
import { useAppDispatch } from "@/lib/store/hooks";
import { TTask } from "@/types";
import { MdEdit, MdDelete } from "react-icons/md";

interface ITask {
  task: TTask;
}

export default function Task({ task }: ITask) {
  const dispatch = useAppDispatch();
  return (
    <div className=" max-w-[300px] border-[1px] p-4 rounded-md flex flex-col gap-2 h-[200px]">
      <div className="text-lg font-semibold">{task.title}</div>
      <div className="text-md">{task.description}</div>
      <div className="flex gap-2">
        <button
          className="flex items-center border-[1px] p-2 rounded-md hover:text-blue-600 hover:bg-slate-50"
          onClick={() => {
            dispatch(setOverlayValue("update"));
            dispatch(setOverlayTask(task));
          }}
        >
          <MdEdit />
        </button>
        <button
          className="flex items-center border-[1px] p-2 rounded-md hover:text-red-600 hover:bg-slate-50"
          onClick={() => {
            dispatch(setOverlayValue("delete"));
            dispatch(setOverlayTask(task));
          }}
        >
          <MdDelete />
        </button>
      </div>
    </div>
  );
}
