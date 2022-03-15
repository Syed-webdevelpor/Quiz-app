import React from 'react';
import { AnswerObject} from '../App';
import './questionCard.styles.css'
import { ButtonWraper } from './button'
type props = {
    question: string;
    answers: string[];
    callback: (e : React.MouseEvent<HTMLButtonElement>)=> void;
    userAnswer: AnswerObject | undefined;
    questionNr: number;
    totalQuestions: number;
}

const QuestionCard: React.FC<props> = ({ question, answers, callback, userAnswer, questionNr, totalQuestions }) =>
(<div className='questioncard'>
    <p className='number'>
        Question: {questionNr} / {totalQuestions}</p>
    <p dangerouslySetInnerHTML={{ __html: question }} />
    <div>
    
        {answers.map(answer => (
         
            <ButtonWraper key = {answer}
            correct = {userAnswer?.correct_Answer === answer}
            userclicked = {userAnswer?.answer === answer}
            > 
                <button className='choice' disabled={!!userAnswer} value = {answer} onClick={callback}>
                    <span dangerouslySetInnerHTML={{ __html: answer }}></span>
                </button>
            </ButtonWraper>
            
        ))}
        
    </div>
</div>)

export default QuestionCard;