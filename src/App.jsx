import { languages } from "./languages.js"
import { nanoid } from "nanoid"
import React from "react"
import { getFarewellText, getRandomWord } from "./utils.js"

export default function () {
  const allLetters = "abcdefghijklmnopqrstuvwxyz"

  // State
  const [hiddenWord, setHiddenWord] = React.useState(() => getRandomWord())
  const [guessedLetters, setGuessLetters] = React.useState([])

  // ref
  const ref = React.useRef(null)

  // Derived State variable
  const numberOfIncorrectGuesses = guessedLetters.filter(
    (letter) => !hiddenWord.includes(letter),
  ).length

  // lost game
  const isGameLost = numberOfIncorrectGuesses >= languages.length - 1

  // wong game
  const isGameWon = [...hiddenWord].every((letter) =>
    guessedLetters.includes(letter),
  )

  if (isGameWon || isGameLost) {
    ref.current !== null && ref.current.focus()
  }

  // current guess is incorrect?
  const isCurrentGameIncorrect =
    guessedLetters.length === 0
      ? null
      : !hiddenWord.includes(guessedLetters.at(-1))

  const languageElements = languages.map((language, index) => {
    const style = {
      backgroundColor: language.backgroundColor,
      color: language.color,
    }

    const opacityClass =
      index < numberOfIncorrectGuesses ? "opacity-50" : "opacity-100"
    return (
      <span
        style={style}
        key={nanoid()}
        className={`flex h-[24.75px] items-center rounded-sm px-[8px] text-[12px] font-bold ${opacityClass}`}
      >
        {language.name}
      </span>
    )
  })

  const hiddenWordElements = [...hiddenWord].map((letter) => {
    return (
      <div
        key={nanoid()}
        className={`flex h-[40px] w-[40px] items-center justify-center border-b-2 border-[#F9F4DA] bg-[#323232] text-[#F9F4DA] ${!guessedLetters.includes(letter) && "fold-bold text-red-700"}`}
      >
        {(isGameLost || guessedLetters.includes(letter)) &&
          letter.toUpperCase()}
      </div>
    )
  })

  const allLetterElements = [...allLetters].map((letter) => {
    const decoClass = !guessedLetters.includes(letter)
      ? "bg-[#FCBA29]"
      : hiddenWord.includes(letter)
        ? "bg-[#10A95B]"
        : "bg-[#EC5D49] text-rose-900 font-bold text-xl"

    return (
      <button
        className={`hover:text-1xl ${decoClass} h-[40px] w-[40px] cursor-pointer rounded-[4px] border-[1px] border-[#D7D7D7] transition-all duration-250 hover:scale-110 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:hover:scale-100`}
        key={nanoid()}
        onClick={() => handleKeyboardClick(letter)}
        disabled={isGameLost || isGameWon}
      >
        {letter.toUpperCase()}
      </button>
    )
  })

  function handleKeyboardClick(letter) {
    !guessedLetters.includes(letter) &&
      setGuessLetters([...guessedLetters, letter])
  }

  function handleNewGame() {
    setHiddenWord(getRandomWord())
    setGuessLetters([])
  }

  const messageBGColor = isGameWon
    ? "bg-[#10A95B]"
    : isGameLost
      ? "bg-[#BA2A2A]"
      : isCurrentGameIncorrect
        ? "bg-[#7A5EA7]"
        : null

  const messagelogElement = isGameWon ? (
    <>
      <h2>You win!</h2>
      <p>Well done! 🎉</p>
    </>
  ) : isGameLost ? (
    <>
      <h2>Game over!</h2>
      <p>You lose! Better start learning Assembly 😭</p>
    </>
  ) : isCurrentGameIncorrect ? (
    <h2>{getFarewellText(languages[numberOfIncorrectGuesses - 1].name)}</h2>
  ) : null

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
        <section
          className={`py-auto flex h-[59px] w-[352px] flex-col items-center justify-center rounded-md text-[#F9F4DA] ${messageBGColor}`}
        >
          {messagelogElement}
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

        {(isGameLost || isGameWon) && (
          <button
            className="flex h-[40px] w-[228px] cursor-pointer items-center justify-center rounded-[4px] border-[1px] border-[#D7D7D7] bg-[#11B5E5] focus:border-4 focus:border-rose-400"
            onClick={handleNewGame}
            ref={ref}
          >
            New Game
          </button>
        )}
      </footer>
    </>
  )
}
