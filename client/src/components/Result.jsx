import React from 'react';
import axios from 'axios';

function Result({ allQuestions }) {
  const [resume, setResume] = React.useState('');
  const [loading, setLoading] = React.useState(true);

  function calculateScore() {
    return 10 - allQuestions.length;
  }
  async function getResume() {
    const wrong_questions_string = allQuestions

      .map(
        (q) =>
          'question: ' +
          q.question +
          '|  wrong user answer: ' +
          q.answer +
          ' |  real answer ' +
          q.explanation
      )
      .join('\n');
    const form = new FormData();

    form.append('questions', wrong_questions_string);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/summary`,
        form
      );

      setResume(data.summary);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }
  React.useEffect(() => {
    getResume();
  }, []);

  return (
    <div className='flex flex-col gap-5'>
      <h3 className='text-2xl'>Your score {calculateScore()}/10</h3>
      <h5 className='font-semibold text-md'>
        Here is a small summary that can help you{' '}
      </h5>
      <div class=''>{!loading && <p className=''>{resume}</p>}</div>
      {loading && (
        <div className='flex flex-col gap-3'>
          <div className='bg-[#888] w-[50%] py-2 animate-pulse	'></div>
          <div className='bg-[#888] w-[100%] py-2 animate-pulse	'></div>
          <div className='bg-[#888] w-[100%] py-2 animate-pulse	'></div>
          <div className='bg-[#888] w-[100%] py-2 animate-pulse	'></div>
          <div className='bg-[#888] w-[100%] py-2 animate-pulse	'></div>
        </div>
      )}
    </div>
  );
}

export default Result;
