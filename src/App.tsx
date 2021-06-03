import React, { useState } from 'react';

import { fetchQuizQuestions } from './API';
//Components
import QuestionCard from './components/QuestionCard'
// Types
import {QuestionState,Difficulty} from './API'
// Styles
import { GlobalStyle, Wrapper } from './primstyles';

//import BGImage from 'url:./images/back.jpg';


export type AnswerObject = {
    question: string;
    answer: string;
    correct: boolean;
    correctAnswer: string;
}

function App(){

    const TOTAL_QUESTIONS = 10;

    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState<QuestionState[]>([]);
    const [number, setNumber] = useState(0);
    const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(true);

    console.log(questions);
    

    const startTrivia = async () => {
        setLoading(true);
        setGameOver(false);

        const newQuestions = await fetchQuizQuestions(
            TOTAL_QUESTIONS,
            Difficulty.EASY
        );

        setQuestions(newQuestions);
        setScore(0);
        setUserAnswers([]);
        setNumber(0);
        setLoading(false);

    };

    const checkAnswer = (e: MouseEvent) => {
        if (e.currentTarget instanceof HTMLButtonElement){
            if (!gameOver){
                // User answers
                const answer = e.currentTarget.value;
                // Check answer against correct answer
                const correct = questions[number].correct_answer === answer;
                // Add score if answer is correct
                if (correct) setScore(prev => prev + 1)
                // Save answer in the array for user answers
                const answerObject = {
                    question: questions[number].question,
                    answer,
                    correct,
                    correctAnswer: questions[number].correct_answer,
                };
                setUserAnswers((prev) => [...prev, answerObject]);
            }
        }

    }

    const nextQuestion = () => {
        // Move on to the next question if not the last one
        const nextQuestion = number + 1;

        if (nextQuestion === TOTAL_QUESTIONS){
            setGameOver(true);
        }
        else{
            setNumber(nextQuestion);
        }
    }

    return (
      <>
      <GlobalStyle />
        <Wrapper>
            <h1>REACT QUIZ</h1>
            
            {/*Use curly braces for inline IF expression - display start button*/}
            {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
            <button className="start" onClick={startTrivia}>
                Start
            </button>
            ) : null}

            {/* Conditionals for displaying score and loading */}
            {!gameOver ? <p className="score">Score: {score}</p> : null}
            {loading && <p>Loading Questions ...</p>}
            
            {/* If not loading or game over, show questions */}
            {!loading && !gameOver && (
            <QuestionCard 
                questionNr={number + 1}
                totalQuestions = {TOTAL_QUESTIONS}
                question = {questions[number].question}
                answers = {questions[number].answers}
                userAnswer = {userAnswers ? userAnswers[number] : undefined}
                callback = {checkAnswer}
            />
            )}

            {/* Display next button after user inputs their answer */}
            {!gameOver && !loading && userAnswers.length === number+1 &&number !== TOTAL_QUESTIONS - 1 ? (
            <button className="next" onClick={nextQuestion}>
                Next Question
            </button>

            ) : null}


        </Wrapper>
        </>
    )
}

export default App;