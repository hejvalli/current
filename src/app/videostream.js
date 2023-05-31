"use client"
import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import QuestionUI from './questionUI';
import DrawingCanvas from './drawingCanvas';
import {getData, postData} from './pages/api/data';



const VideoStream = () => {
  const [data, setData] = useState(null);
  const [isVideoPaused, setIsVideoPaused] = useState(false);
  const [drawing, setDrawing] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      const response = await getData();
      setData(response);
    };
  
    fetchData(); // Initial fetch
  
    const interval = setInterval(fetchData, 5000); // Fetch data every 5 seconds
  
    return () => {
      clearInterval(interval); // Clean up the interval when the component unmounts
    };
  }, []);
  

  
  const handleSaveDrawing = (dataUrl) => {
    setDrawing(dataUrl);
  };

  const handlePlay = () => {
    setIsVideoPaused(false);
  };

  const handlePause = () => {
    setIsVideoPaused(true);
  };
  const handleProgress = (state) => {
    if(state.playedSeconds > data?.stopTime) {
      setIsVideoPaused(true);
    }
  };

  useEffect(() => {
    handlePlay();
  }, [data?.url]);

  useEffect(() => {
    const postDataAndUpdate = async () => {
      const newData = {
       drawing

      };
      await postData(newData);
      // Fetch the updated data
      const response = await getData();
      setData(response);
    }
  
    // Call the function whenever any of these state variables changes
    postDataAndUpdate();
  }, [drawing]);

 return (
    <div>
  <ReactPlayer
        url={data?.url}
        playing={!isVideoPaused}
        controls={true}
        onPlay={handlePlay}
        onPause={handlePause}
        onProgress={handleProgress}
      />
      {isVideoPaused && (<div><QuestionUI />  <div>
      <DrawingCanvas onSave={handleSaveDrawing} />
      {drawing && (
        <div>
          <h2>Saved Drawing:</h2>
          <img src={drawing} alt="Saved Drawing" />
        </div>
      )}
    </div></div>)}
    </div>
  );
};

export default VideoStream;





/* "use client"
import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import QuestionUI from './questionUI';


const VideoStream = () => {
  
  const [showQuestion, setShowQuestion] = useState(true);
  const [userChoices, setUserChoices] = useState([]);

  const handlePlay = () => {
    setShowQuestion(false);
  };

  return (
    <div>
      <ReactPlayer url={url}playing onPlay={handlePlay} />
      {showQuestion && <QuestionUI />}
    </div>
  );
};

export default VideoStream;
 */