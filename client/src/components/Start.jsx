import React from 'react';
import { MdCloudUpload } from 'react-icons/md';
import Select from 'react-select';
import axios from 'axios';
function Start({
  setQuestion,
  selectedTopic,
  setSelectedTopic,
  setCurrentState,
  getQuestions,
}) {
  const [topics, setTopics] = React.useState(null);

  async function getTopics() {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URI}/topics`
      );
      console.log(data);
      setTopics(data);
    } catch (err) {
      console.log(err);
    }
  }
  async function handleStart() {
    await getQuestions();
    setCurrentState(1);
  }
  React.useEffect(() => {
    getTopics();
  }, []);
  return (
    <>
      <h3 className='text-2xl text-primary font-bold'>Choose topic</h3>

      {!!topics?.length ? (
        <Select
          options={topics?.map((topic) => ({
            value: topic,
            label: topic,
          }))}
          value={selectedTopic}
          onChange={(selectedOption) => setSelectedTopic(selectedOption)}
        />
      ) : (
        <p>Loading...</p>
      )}

      <button
        className='border border-primary px-5 py-2 rounded-md  text-primary mb-5 hover:bg-primary hover:text-main transition-all duration-300 ease-in-out  active:bg-primary active:text-white active:border-primary'
        onClick={handleStart}
        disabled={!selectedTopic}
      >
        Get started
      </button>
    </>
  );
}

export default Start;
