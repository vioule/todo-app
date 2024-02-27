import dbConnect from "@/lib/db";
import User, { Users } from "@/models/User";

const getUsers = async (): Promise<Users[]> => {
  await dbConnect();
  const users = await User.find<Users>({});
  return users;
};

export default async function Users() {
  const users = await getUsers();
  return (
    <div>
      {users.map((user) => {
        return <div key={user.name}>{user.name}</div>;
      })}
    </div>
  );
}
