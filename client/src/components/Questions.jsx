import React from 'react';
import { FaPepperHot, FaLightbulb } from 'react-icons/fa';
import axios from 'axios';
function Questions({
  setCurrentState,
  questions,
  getQuestions,
  currentState,
  setAllQuestions,
}) {
  const [answer, setAnswer] = React.useState('');
  const [isAnswerChecked, setIsAnswerChecked] = React.useState(null);
  const [isLoadingAnswer, setIsLoadingAnswer] = React.useState(false);
  const [questionNumber, setQuestionNumber] = React.useState(0);

  async function handleCheckAnswer() {
    setIsLoadingAnswer(true);
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URI
        }/answer?question=${questions}&answer=${answer}`
      );

      setIsAnswerChecked(data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoadingAnswer(false);
    }
  }
  async function next() {
    if (questionNumber + 1 < 10) {
      if (isAnswerChecked?.is_correct === false) {
        setAllQuestions((prev) => [
          ...prev,
          {
            question: questions,
            answer: answer,
          },
        ]);
      }
      getQuestions();
      setAnswer('');
      setIsAnswerChecked(null);
      setIsLoadingAnswer(false);

      setQuestionNumber((prev) => prev + 1);

      return;
    }
    setCurrentState(currentState + 1);
  }
  return (
    <>
      <div className='w-full flex items-center justify-between p-3'>
        <h3 className='text-lg font-semibold'>Question {questionNumber + 1}</h3>
        <h3 className='text-xl font-bold text-primary '>Quiz</h3>
      </div>
      <h4 className='w-full text-lg text-left'>{questions}</h4>
      <input
        className={`border ${
          isAnswerChecked === null
            ? 'border-secondary'
            : isAnswerChecked?.is_correct
            ? 'border-[green]'
            : 'border-[red]'
        } w-full py-2 rounded-md  mb-5  p-2 transition-all duration-300 ease-in-out `}
        type='text'
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      {isLoadingAnswer && 'Checking answer...'}
      {isAnswerChecked && (
        <p className=''>
          <FaLightbulb className=' text-secondary size-7' />
          {isAnswerChecked.explanation}
        </p>
      )}
      <div className='flex items-center gap-5 w-full'>
        <button
          disabled={
            answer === '' || isLoadingAnswer || isAnswerChecked !== null
          }
          className='border border-secondary bg-secondary w-full py-2 rounded-md  mb-5  text-main transition-all duration-300 ease-in-out  active:bg-secondary active:text-white active:border-primary'
          onClick={handleCheckAnswer}
        >
          Check answer
        </button>
        <button
          disabled={isAnswerChecked === null}
          className='border border-primary w-full py-2 rounded-md  text-primary mb-5 hover:bg-primary hover:text-main transition-all duration-300 ease-in-out  active:bg-primary active:text-white active:border-primary'
          onClick={next}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default Questions;
