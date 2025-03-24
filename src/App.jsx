import { languages } from "./languages.js"
import { nanoid } from "nanoid"
import React from "react"

export default function () {
  const [hiddenWord, setHiddenWord] = React.useState("react")
  const [guessedLetters, setGuessLetters] = React.useState([])
  console.log(guessedLetters)
  const allLetters = "abcdefghijklmnopqrstuvwxyz"
  const languageElements = languages.map((language) => {
    const style = {
      backgroundColor: language.backgroundColor,
      color: language.color,
    }

    return (
      <span
        key={nanoid()}
        style={style}
        className="flex h-[24.75px] items-center rounded-sm px-[8px] text-[12px] font-bold"
      >
        {language.name}
      </span>
    )
  })

  const hiddenWordElements = [...hiddenWord].map((letter) => (
    <div
      key={nanoid()}
      className="border[#F9F4DA] flex h-[40px] w-[40px] items-center justify-center border-b-2 bg-[#323232] text-[#F9F4DA]"
    >
      {letter.toUpperCase()}
    </div>
  ))

  const allLetterElements = [...allLetters].map((letter) => {
    const style = { backgroundColor: "#FCBA29" }

    return (
      <button
        style={style}
        className="hover:text-1xl h-[40px] w-[40px] cursor-pointer rounded-[4px] border-[1px] border-[#D7D7D7] transition-all duration-250 hover:scale-110"
        key={nanoid()}
        onClick={() => handleKeyboardClick(letter)}
      >
        {letter.toUpperCase()}
      </button>
    )
  })

  function handleKeyboardClick(letter) {
    !guessedLetters.includes(letter) &&
      setGuessLetters([...guessedLetters, letter])
  }

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

      <main className="flex flex-col items-center gap-[16px]">
        <section className="py-auto flex h-[59px] w-[352px] flex-col items-center justify-center rounded-md bg-[#10A95B] text-[#F9F4DA]">
          <h2>You win!</h2>
          <p>Well done! 🎉</p>
        </section>

        <section className="flex w-[300px] flex-wrap justify-center gap-[4px]">
          {languageElements}
        </section>

        <section className="flex gap-1">{hiddenWordElements}</section>
      </main>

      <footer className="flex w-[460px] flex-col items-center gap-[16px]">
        <section className="flex flex-wrap justify-center gap-[6px]">
          {allLetterElements}
        </section>

        <button className="flex h-[40px] w-[228px] cursor-pointer items-center justify-center rounded-[4px] border-[1px] border-[#D7D7D7] bg-[#11B5E5]">
          New Game
        </button>
      </footer>
    </>
  )
}
