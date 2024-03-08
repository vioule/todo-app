const delayResponseSuccess = async () => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({ user: true });
    }, 3000)
  );
};
const delayResponseReject = async () => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({ user: false, message: "Email or password invalid." });
    }, 3000)
  );
};

export async function GET() {
  const data = await delayResponseReject();
  return Response.json(data);
}
