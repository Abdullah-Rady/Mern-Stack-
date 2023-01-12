import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

export default function ExamModal({ open, onClose, questions }) {
  function escHandler({ key }) {
    if (key === "Escape") {
      onClose();
    }
  }
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState()


  useEffect(() => {

    let answers = []
    questions.forEach((q, i) => {

      q.answerOptions.forEach((a) => {
        if(a.isCorrect){
          answers.push((i + 1)+ ". " + a.answerText)
        }
      })

    })

    setAnswers(answers)

  }, [])

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("keydown", escHandler);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("keydown", escHandler);
      }
    };
  }, []);

  if (typeof document !== "undefined") {
    return createPortal(
      <div className={`fixed inset-0 ${open ? "" : "pointer-events-none"}`}>
        {/* backdrop */}
        <div
          className={`fixed inset-0 bg-black ${
            open ? "opacity-50" : "pointer-events-none opacity-0"
          } transition-opacity duration-300 ease-in-out`}
          onClick={onClose}
        />

        {/* content */}
        <div
          className={`relative mx-auto mt-16 h-[30%] bg-s shadow-lgh w-[20%] max-w-screen-sm p-4 ${
            open ? "opacity-100" : "pointer-events-none opacity-0"
          } transition-opacity duration-300 ease-in-out rounded-lg`}
        >
          <div className="absolute right-4 text-white">
            <button onClick={onClose}>
              <span>
                <AiOutlineClose />
              </span>
            </button>
          </div>
          <div className="text-text-primary-dark  mt-8 ">
          {showScore ? (
        <div className="score-section">
          <p>You scored {score} out of {questions.length}</p>
            <br />
            <p>Correct Answers</p>
          {
            answers.map((a) =>  (<p>{a}<br /></p>))
          }
        </div>
      ) : (
        <>
          <div className="question-section">
            <div className="font-bold">
              <span>Question {currentQuestion + 1}</span>/{questions.length}
            </div>
            <div className="">{questions[currentQuestion].questionText}</div>
          </div>
          <div className="flex flex-col ">
            {questions[currentQuestion].answerOptions.map((answerOption, i) => (
              <div
                className="px-auto"
                onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}
              >
                {i + 1}. {answerOption.answerText}
              </div>
            ))}
          </div>
        </>
      )}
        </div>
        </div>

      </div>,
      document.body
    );
  } else {
    return null;
  }
}
