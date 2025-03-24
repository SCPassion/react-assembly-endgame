import { languages } from "./languages.js";
import { nanoid } from "nanoid";

export default function () {
  return (
    <>
      <header className="w-[352px] text-center">
        <h1 className="mb-[4px] text-[20px] font-semibold text-[#F9F4DA]">
          Assembly: Endgame
        </h1>
        <p className="text-[14px] text-[#8E8E8E]">
          Guess the word in under 8 attempts to keep the programming world safe
          from Assembly!
        </p>
      </header>

      <main>
        <section className="flex h-[59px] w-[352px] flex-col items-center justify-center rounded-md bg-[#10A95B] text-center text-[#F9F4DA]">
          <h2>You win!</h2>
          <p>Well done! 🎉</p>
        </section>
      </main>
    </>
  );
}
