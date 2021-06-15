import { Toolbar } from "../components/toolbar";

export default function Home() {
  return (
    <div className=" flex   items-center flex-col">
      <Toolbar />
      <div className="min-h-screen p-2 flex flex-col justify-center align-center text-center ">
        <h1>
          Welcome to <a href="https://nextjs.org">Next.ts!..</a>
        </h1>

        <p>
          Get started by editing <code>pages/index.js</code>
        </p>
      </div>
    </div>
  );
}
