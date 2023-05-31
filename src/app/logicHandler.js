
"use client"
import React, { useState, useEffect} from 'react';
import {getData, postData} from './pages/api/api';


export default function LogicHandlerLevent () {
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
  

    const matrixData = {
    firstSet: {
      question: "Do you want to slay?",
      firstUrl: "https://www.youtube.com/watch?v=itoSgnv6Y9Y",
      firstStopTime:50,
      scenario1: {
        choice: "Yes",
        url: 'https://www.youtube.com/watch?v=3-6iAyHES3c',
        stopTime: 200
      },
      scenario2: {
        choice: "No",
        url: "https://www.youtube.com/watch?v=awZUwBMculE",
        stopTime: 150
      }
    },
    secondSet: {
      question: "What color?",
      scenario1: {
        choice: "Green",
        url: 'https://www.youtube.com/watch?v=OU-ekeecS4Y',
        stopTime: 300
      },
      scenario2: {
        choice: "Blue",
        url: "https://www.youtube.com/watch?v=Ltpxk7L-bVg",
        stopTime: 60
      }
    },
    thirdSet: {
      question: "What Angel?",
      scenario1: {
        choice: "Angelus",
        url: 'https://www.youtube.com/watch?v=N0dyIGkpMmg',
        stopTime: 120
      },
      scenario2: {
        choice: "Banki",
        url: "https://www.youtube.com/watch?v=m2JRghbgeYw",
        stopTime: 190
      }
    },
    provideChoice1:{
      question: "What Color?",
      choice1: "Green",
      choice2: "Blue",
      choice3: "Red",
    },
    provideChoice2:{
      question: "What Color?",
      choice1: "Yellow",
      choice2: "Purple",
      choice3: "Black",
    }
  };

  const [stopTime, setStopTime] = useState(typeof window !== 'undefined' ? localStorage.getItem('stopTime') || matrixData.firstSet.firstStopTime : matrixData.firstSet.firstStopTime);
  const [url, setUrl] = useState(typeof window !== 'undefined' ? localStorage.getItem('url') || matrixData.firstSet.firstUrl : matrixData.firstSet.firstUrl);
  const [question, setQuestion] = useState(typeof window !== 'undefined' ? localStorage.getItem('question') || matrixData.firstSet.question : matrixData.firstSet.question);
  const [choice1, setChoice1] = useState(typeof window !== 'undefined' ? localStorage.getItem('choice1') || matrixData.firstSet.scenario1.choice : matrixData.firstSet.scenario1.choice);
  const [choice2, setChoice2] = useState(typeof window !== 'undefined' ? localStorage.getItem('choice2') || matrixData.firstSet.scenario2.choice : matrixData.firstSet.scenario2.choice);
  const [saveChoice, setSaveChoice] = useState(typeof window !== 'undefined' ? localStorage.getItem('saveChoice') || "" : "");
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('stopTime', stopTime);
      localStorage.setItem('url', url);
      localStorage.setItem('question', question);
      localStorage.setItem('choice1', choice1);
      localStorage.setItem('choice2', choice2);
      localStorage.setItem('saveChoice', saveChoice);
    }
  }, [stopTime, url, question, choice1, choice2, saveChoice]);
  

  
  useEffect(() => {
      switch (data?.choice) {
        case matrixData.firstSet.scenario1.choice:
          setStopTime(matrixData.firstSet.scenario1.stopTime);
          setUrl(matrixData.firstSet.scenario1.url);
          setQuestion(matrixData.secondSet.question);
          setChoice1(matrixData.secondSet.scenario1.choice);
          setChoice2(matrixData.secondSet.scenario2.choice);
          break;
        case matrixData.firstSet.scenario2.choice:
          setStopTime(matrixData.firstSet.scenario2.stopTime);
          setUrl(matrixData.firstSet.scenario2.url);
          setQuestion(matrixData.secondSet.question);
          setChoice1(matrixData.secondSet.scenario1.choice);
          setChoice2(matrixData.secondSet.scenario2.choice);
          break;
        case matrixData.secondSet.scenario1.choice:
          setStopTime(matrixData.secondSet.scenario1.stopTime);
          setUrl(matrixData.secondSet.scenario1.url);
          setQuestion(matrixData.thirdSet.question);
          setChoice1(matrixData.thirdSet.scenario1.choice);
          setChoice2(matrixData.thirdSet.scenario2.choice);
          break;
        case matrixData.secondSet.scenario2.choice:
          setStopTime(matrixData.secondSet.scenario2.stopTime);
          setUrl(matrixData.secondSet.scenario2.url);
          setQuestion(matrixData.thirdSet.question);
          setChoice1(matrixData.thirdSet.scenario1.choice);
          setChoice2(matrixData.thirdSet.scenario2.choice);
          break;
        case matrixData.provideChoice1.choice1:
          setSaveChoice(matrixData.provideChoice1.choice1);
          break;
        case matrixData.provideChoice1.choice2:
          setSaveChoice(matrixData.provideChoice1.choice2);
          break;
        case matrixData.provideChoice1.choice3:
          setSaveChoice(matrixData.provideChoice1.choice3);
          break;
        case matrixData.provideChoice2.choice1:
          setSaveChoice(matrixData.provideChoice2.choice1);
          break;
        case matrixData.provideChoice2.choice2:
          setSaveChoice(matrixData.provideChoice2.choice2);
          break;
        case matrixData.provideChoice2.choice3:
          setSaveChoice(matrixData.provideChoice2.choice3);
          break;
        default:
          break;
      }

  }, [data?.choice, stopTime, url, question, choice1, choice2, saveChoice]);

  useEffect(() => {
    const postDataAndUpdate = async () => {
      const newData = {
        choice1,
        choice2,
        question,
        url,
        stopTime,
        saveChoice
      };
      await postData(newData);
      // Fetch the updated data
      const response = await getData();
      setData(response);
    }
  
    // Call the function whenever any of these state variables changes
    postDataAndUpdate();
  }, [stopTime, url, question, choice1, choice2, saveChoice]);
  


  return (
 null
  );  
};
