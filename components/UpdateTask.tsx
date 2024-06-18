import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  selectOverlayLoading,
  selectOverlayTask,
  setOverlayLoading,
  setOverlayTask,
  setOverlayValue,
} from "@/lib/store/features/overlay/overlaySlice";
import { useState } from "react";
import { updateTask } from "@/lib/store/features/session/sessionSlice";
import { CreateTaskSchema } from "@/schemas/Task";
import { z } from "zod";
import { ICreateTaskError } from "./AddTask";
import { ErrorMessage } from "./form/InfoMessage";
import Spinner from "./icons/Spinner";
import CloseButton from "./AddTask/CloseButton";

export default function UpdateTask() {
  const dispatch = useAppDispatch();
  const task = useAppSelector(selectOverlayTask);
  const isLoading = useAppSelector(selectOverlayLoading);
  const [title, setTitle] = useState(task!.title);
  const [description, setDescription] = useState(task!.description);
  const [error, setError] = useState<ICreateTaskError>({
    title: null,
    description: null,
  });

  const handleOnClick = async () => {
    try {
      CreateTaskSchema.parse({ title, description });
      dispatch(setOverlayLoading(true));
      const response = await fetch("/api/task", {
        method: "PUT",
        body: JSON.stringify({ taskId: task!._id, title, description }),
      });

      const data = await response.json();
      dispatch(setOverlayLoading(false));
      if (data.success) {
        dispatch(updateTask({ ...task!, title, description }));
        dispatch(setOverlayValue(null));
        dispatch(setOverlayTask(null));
      } else {
        setError({
          title: null,
          description: null,
        });
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        let ret: ICreateTaskError = {
          title: null,
          description: null,
        };
        err.issues.map((e) => {
          const path = e.path[0] as "title" | "description";
          ret[path] = e.message;
        });
        setError({ ...error, ...ret });
      } else {
        throw err;
      }
    }
  };

  return (
    <div className="w-screen h-screen absolute top-0 left-0 backdrop-blur-md p-10 flex text-slate-600 overflow-y-auto">
      <div className="w-full bg-white rounded-lg max-w-[700px] p-6 flex flex-col gap-4 m-auto">
        <div className="flex justify-between">
          <h2 className="font-bold tracking-wider text-xl">Update task</h2>
          <CloseButton
            onClick={() => {
              dispatch(setOverlayValue(null));
              dispatch(setOverlayTask(null));
            }}
          />
        </div>
        <div className="grow flex justify-center flex-col gap-3">
          <div className="w-full">
            <p className=" tracking-wide font-semibold">Title</p>
            <input
              className={` border-2 bg-slate-50 w-full outline-none mt-2 p-2 px-4  rounded-xl ${
                error.title ? "border-red-300" : "border-gray-200"
              }`}
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            ></input>
            <ErrorMessage error={error.title} />
          </div>
          <div className="w-full">
            <p className=" tracking-wide font-semibold">Description</p>
            <textarea
              className={`bg-slate-50 max-h-[300px] w-full outline-none mt-2 p-4 min-h-[150px] border-2 rounded-xl ${
                error.description ? "border-red-300" : "border-gray-200"
              }`}
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            ></textarea>
            <ErrorMessage error={error.description} />
          </div>
        </div>
        <button
          className="p-2 w-full rounded-lg flex items-center font-semibold justify-center hover:bg-primary-darken text-white bg-primary tracking-wider"
          onClick={handleOnClick}
        >
          Update
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
