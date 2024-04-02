import Image from "next/image";

export default function Slogan() {
  return (
    <div className="relative bg-primary w-full max-lg:hidden text-white px-20 pt-24">
      <Image
        src={"/auth-background.png"}
        alt="Abstract background"
        width={3900}
        height={3900}
        className="absolute top-0 left-0 w-full h-full opacity-15 object-cover"
      />
      <div className="relative w-[4rem] h-[4rem] bg-white"></div>
      <h1 className="text-4xl font-bold mt-10">Achieve More, Stress Less</h1>
      <h2 className="text-xl font-light mt-4">
        Unleash the Power of Your To-Do List.
      </h2>
    </div>
  );
}
