import { selectTasks } from "@/lib/store/features/session/sessionSlice";
import { useAppSelector } from "@/lib/store/hooks";
import Task from "./Task";

export default function Tasks() {
  const tasks = useAppSelector(selectTasks);

  return (
    <div className="w-full h-full overflow-y-auto flex flex-row flex-wrap justify-start gap-10 p-10">
      {tasks.length ? (
        <>
          {tasks.map((task) => (
            <Task key={task._id} task={task} />
          ))}
        </>
      ) : (
        <p>No task yet</p>
      )}
    </div>
  );
}
