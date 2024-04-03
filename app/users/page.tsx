import dbConnect from "@/lib/db";
import User, { Users } from "@/models/User";

//force no cache to see users
export const dynamic = "force-dynamic";

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
        return (
          <div key={user.name}>
            <div>
              <span>Name : </span>
              {user.name}
            </div>
          </div>
        );
      })}
    </div>
  );
}
