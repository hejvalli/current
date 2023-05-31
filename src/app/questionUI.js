"use client"
import React, {useState, useEffect} from 'react';
import {getData, postData} from './pages/api/data';

const QuestionUI = () => {
  const [choice, setChoice] = useState("");
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getData();
      setData(response);
    };
  
    fetchData(); // Initial fetch
  
    const interval = setInterval(fetchData, 2000); // Fetch data every 5 seconds
  
    return () => {
      clearInterval(interval); // Clean up the interval when the component unmounts
    };
  }, []);
  

  const handleOnClick = (choice) => {
    setChoice(choice);
   };
   useEffect(() => {
    const postDataAndUpdate = async () => {
      const newData = {
       choice
      };
      await postData(newData);
      // Fetch the updated data
      const response = await getData();
      setData(response);
    }
  
    // Call the function whenever any of these state variables changes
    postDataAndUpdate();
  }, [choice]);


  return (
    <div>
          <button className='text-black' onClick={() => handleOnClick(data?.choice1)}>
            {data?.choice1}
          </button>
          <button className="text-black" onClick={() => handleOnClick(data?.choice2)}>
            {data?.choice2}
          </button>
    </div>
  );
};

export default QuestionUI;
