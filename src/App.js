import React, { useEffect, useState } from 'react';
import './App.css';
import data from './question.json';
import correct from './sound/correct.mp3';
import wrong from './sound/wrong.mp3';

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timer, setTimer] = useState(30);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    let interval;
    if (timer > 0 && !showScore) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      if (currentQuestion < data.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedOption(null);
        setTimer(30); // Reset timer for the next question
      } else {
        setShowScore(true); // Show score if no questions are left
      }
    }
    return () => clearInterval(interval); // Cleanup interval
  }, [timer, showScore, currentQuestion]);

  const handleClick = (option) => {
    setSelectedOption(option);
    const isCorrect = data[currentQuestion].answer.find(
      (ans) => ans.text === option && ans.correct
    );

    if (isCorrect) {
      setScore((prev) => prev + 1);
      const audio = new Audio(correct);
      audio.play();
    } else {
      const audio = new Audio(wrong);
      audio.play();
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedOption(null);
    setTimer(30);
    setShowScore(false);
  };

  const handleNext = () => {
    if (currentQuestion < data.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedOption(null);
      setTimer(30);
    }
  };

  return (
    <div className="quiz-app">
      <div>
        Score: {score}
        <button className="restrt" onClick={handleRestart}>
          Restart
        </button>
      </div>

      {!showScore ? (
        <div className="question-section">
          <h2>Question {currentQuestion + 1}</h2>
          <p>{data[currentQuestion].question}</p>
          <div className="options">
            {data[currentQuestion].answer.map((option, index) => (
              <button
                className="button"
                key={index}
                onClick={() => handleClick(option.text)}
                disabled={!!selectedOption}
                style={{
                  backgroundColor:
                    selectedOption === option.text
                      ? option.correct
                        ? 'green'
                        : 'red'
                      : 'blue',
                }}
              >
                {option.text}
              </button>
            ))}
          </div>
          <div className="timer">Time Left: <span>{timer}s</span></div>
          {selectedOption && currentQuestion < data.length - 1 && (
            <button className="restrt" onClick={handleNext}>
              Next
            </button>
          )}
        </div>
      ) : (
        <div className="question-section">
          <h2>Quiz Over!</h2>
          <p>Your final score is: {score}</p>
          <button className="restrt" onClick={handleRestart}>
            Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
