import React from 'react';
import QuestionCard from './components/QuestionCard';
import { useState } from 'react';
import { fetchQuizQuestions } from './components/API';
import {QuestionState, Difficulty } from './components/API';
import './app.css'
export type AnswerObject = {
  question : string;
  answer: string;
  correct : boolean;
  correct_Answer :string;
}
function App() {
  const TOTAL_QUESTIONS = 10;
  const [loading, setloading] = useState(false)
  const [questions ,setQuestion] = useState<QuestionState[]>([])
  const [number ,setNumber] = useState(0)
  const [userAnswer ,setUserAnswer] = useState<AnswerObject[]>([])
  const [score ,setScore] = useState(0)
  const [gameOver ,setGameOver] = useState(true)
  
  const startQuiz = async () => {
setloading(true);
setGameOver(false);
const newQuestion = await fetchQuizQuestions(
  TOTAL_QUESTIONS,
  Difficulty.Easy
  );
   setQuestion(newQuestion);
   setUserAnswer([]);
   setScore(0);
   setNumber(0);
   setloading(false);

  };

  const checkAnswer = (e : React.MouseEvent<HTMLButtonElement>)=>{
if (!gameOver){
  const answer = e.currentTarget.value;
  const correct = questions[number].correct_answer === answer;
  if (correct) setScore((prev)=> prev +1)
  const answerObject = {
    question : questions[number].question,
    answer,
    correct,
    correct_Answer : questions[number].correct_answer
  };
  setUserAnswer((prev)=>[...prev , answerObject]);
}
  }
  const nextQuestion = () =>{
const nextQuestion = number +1;
if(nextQuestion == TOTAL_QUESTIONS){
  setGameOver(true);
}else{
  setNumber(nextQuestion);
}

  };
  return (
    <div className="App">
    <h1>React Quiz App</h1>
    {gameOver || userAnswer.length === TOTAL_QUESTIONS ?
    <button className='start' onClick={startQuiz}>
      Start
      </button>
      : null}
      {!gameOver ?<p className='score'>Score: {score}</p> :null}
      {loading &&<p>Loading Question ...</p>}
      {!loading && !gameOver &&
      <QuestionCard 
      questionNr={number +1}
      totalQuestions = {TOTAL_QUESTIONS}
      question = {questions[number].question}
      answers = {questions[number].answer}
      userAnswer = {userAnswer ? userAnswer[number] : undefined}
      callback = {checkAnswer}
      />
}
      {!gameOver && !loading && userAnswer.length === number +1 && number !== TOTAL_QUESTIONS - 1 ?(
      <button className='next' onClick={nextQuestion}> Next Question </button>
      ):null}
    </div>
  );
}

export default App;
