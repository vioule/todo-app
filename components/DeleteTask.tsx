import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  selectOverlayLoading,
  selectOverlayTaskId,
  setOverlayLoading,
  setOverlayTask,
  setOverlayValue,
} from "@/lib/store/features/overlay/overlaySlice";
import { deleteTask } from "@/lib/store/features/session/sessionSlice";
import CloseButton from "./AddTask/CloseButton";
import Spinner from "./icons/Spinner";

export default function DeleteTask() {
  const dispatch = useAppDispatch();
  const taskId = useAppSelector(selectOverlayTaskId);
  const isLoading = useAppSelector(selectOverlayLoading);

  const handleOnClick = async () => {
    try {
      dispatch(setOverlayLoading(true));
      const response = await fetch("/api/task", {
        method: "DELETE",
        body: JSON.stringify({ taskId }),
      });

      const data = await response.json();
      dispatch(setOverlayLoading(false));
      if (data.success) {
        dispatch(deleteTask(taskId!));
        dispatch(setOverlayValue(null));
        dispatch(setOverlayTask(null));
      }
    } catch (err) {}
  };

  return (
    <div className="w-screen h-screen absolute top-0 left-0 backdrop-blur-md p-10 flex text-slate-600 overflow-y-auto">
      <div className="w-full bg-white rounded-lg max-w-[700px] p-6 flex flex-col gap-4 m-auto">
        <div className="flex justify-between">
          <h2 className="font-bold tracking-wider text-xl">Delete task</h2>
          <CloseButton
            onClick={() => {
              dispatch(setOverlayValue(null));
              dispatch(setOverlayTask(null));
            }}
          />
        </div>
        <div className="grow flex justify-center text-center flex-col gap-3">
          <div className="w-full ">
            <p className=" tracking-wide font-semibold text-red-500">
              Are you sure you want to delete this task ?
            </p>
          </div>
        </div>
        <button
          className="p-2 w-full rounded-lg flex items-center font-semibold justify-center hover:bg-primary-darken text-white bg-primary tracking-wider"
          onClick={handleOnClick}
        >
          Delete
        </button>
      </div>
      {isLoading && (
        <div className="absolute left-0 top-0 h-full w-full flex justify-center items-center text-primary backdrop-blur-[2px] backdrop-saturate-50">
          <Spinner size={4} />
        </div>
      )}
    </div>
  );
}
