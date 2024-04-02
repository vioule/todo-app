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
        return (
          <div key={user.name}>
            <div>
              <span>Name : </span>
              {user.name}
            </div>
            <div>
              <span>Email : </span>
              {user.email}
            </div>
            <div>
              <span>Email Verified : </span>
              {user.emailVerified}
            </div>
            <div>
              <span>Verify Token : </span>
              {user.verifyToken}
            </div>
          </div>
        );
      })}
    </div>
  );
}
