import LoginCard from "./components/LoginCard";
// import { Input } from "@nextui-org/react";

function Page() {
  return (
    <div className="h-screen  w-full flex justify-center items-center">
      {/*  @ts-expect-error Server Component */}
      <LoginCard />
    </div>
  );
}

export default Page;
