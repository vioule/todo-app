"use client";
import { selectUser } from "@/lib/store/features/session/sessionSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import Navbar from "@/components/Navbar";
import AddTask from "@/components/AddTask";
import {
  selectOverlay,
  setOverlayValue,
} from "@/lib/store/features/overlay/overlaySlice";
import Tasks from "@/components/Tasks";
import DeleteTask from "@/components/DeleteTask";
import UpdateTask from "@/components/UpdateTask";

export default function Dashboard() {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const overlay = useAppSelector(selectOverlay);

  return (
    <div className="h-screen w-screen flex flex-col max-w-[1920px]">
      <header className="w-full p-4 flex justify-between items-center  border-b-[1px]">
        <div className="w-[2rem] h-[2rem] bg-primary"></div>
        <div>
          <div className="text-md font-semibold">{user?.username}</div>
        </div>
      </header>
      <div className="grow flex flex-row overflow-hidden">
        <Navbar />
        <div className="w-full h-full flex flex-row flex-wrap justify-start">
          <div className="w-full flex justify-end p-4 text-sm">
            <button
              className="p-2 px-4 bg-primary text-white rounded-md hover:bg-primary-darken"
              onClick={() => dispatch(setOverlayValue("create"))}
            >
              Add Task
            </button>
          </div>
          <Tasks />
        </div>
      </div>
      {overlay.value === "create" && <AddTask />}
      {overlay.value === "update" && <UpdateTask />}
      {overlay.value === "delete" && <DeleteTask />}
    </div>
  );
}
