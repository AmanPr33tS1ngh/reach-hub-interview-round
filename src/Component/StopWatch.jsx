import React, { useRef, useState } from "react";

const StopWatch = () => {
  const elapsedTime = useRef(0);
  const intervalRef = useRef();
  const [timeStops, setTimeStops] = useState([]);

  const startStopwatch = () => {
    const startTime = Date.now() - elapsedTime.current;
    intervalRef.current = setInterval(() => {
      const now = Date.now();
      elapsedTime.current = now - startTime;
      updateTime();
    }, 10);
  };

  const stopStopwatch = () => {
    clearInterval(intervalRef.current);
  };

  const resetStopwatch = () => {
    clearInterval(intervalRef.current);
    elapsedTime.current = 0;
    updateTime();
  };

  const addLap = () => {
    formatTime(elapsedTime.current, true);
  };

  const formatTime = (milliseconds, addToTimeStops) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milli = milliseconds % 100;

    const formattedString = `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}:${milli < 10 ? "0" : ""}${milli}`;

    if (addToTimeStops) {
      setTimeStops([...timeStops, formattedString]);
    }

    return formattedString;
  };

  const updateTime = () => {
    const display = document.getElementById("elapsed-time");
    if (display) {
      display.textContent = formatTime(elapsedTime.current);
    }
  };

  return (
    <div>
      <div>
        <button onClick={startStopwatch}>Start</button>
        <button onClick={stopStopwatch}>Stop</button>
        {console.log("elapsedTime", elapsedTime)}
        <button onClick={resetStopwatch}>Reset</button>
        <button onClick={addLap}>Lap</button>
      </div>
      <div>
        Elapsed Time: <span id="elapsed-time"></span>
      </div>
      <h4>All Timestops</h4>
      {timeStops.map((timestop, index) => (
        <div key={index}>{timestop}</div>
      ))}
    </div>
  );
};

export default StopWatch;
