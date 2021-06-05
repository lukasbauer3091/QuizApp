import React, { useState } from 'react';
import Select from 'react-select';

import { fetchQuizQuestions } from './API';
//Components
import QuestionCard from './components/QuestionCard'
// Types
import {QuestionState,Difficulty} from './API'
// Styles
import { GlobalStyle, Wrapper } from './primstyles';




export type AnswerObject = {
    question: string;
    answer: string;
    correct: boolean;
    correctAnswer: string;
}

const difficulty = [
    {value: Difficulty.ANY, label: "Any"},
    {value: Difficulty.EASY, label: "Easy"},
    {value: Difficulty.MEDIUM, label: "Medium"},
    {value: Difficulty.HARD, label: "Hard"}
];

function App(){

    const TOTAL_QUESTIONS = 10;

    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState<QuestionState[]>([]);
    const [number, setNumber] = useState(0);
    const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(true);
    
    const [selectedDifficulty, setSelectedDifficulty] = useState(() => difficulty[0]);


    const handleChange = (selectedOption: {value:Difficulty,label:string} | null)  =>{
        if (selectedOption != null){
        setSelectedDifficulty(selectedOption);
        console.log(selectedOption.value);}    
    }

    console.log(questions);
    

    const startTrivia = async () => {
        setLoading(true);
        setGameOver(false);
        //console.log(selectedDifficulty.value);
        const newQuestions = await fetchQuizQuestions(
            TOTAL_QUESTIONS,
            selectedDifficulty.value
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

            {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
                <div className="difficultyBox">
                <h4>Difficulty</h4>
                <Select 
                className="difficultySelect"
                autoSize={true}
                options={difficulty}
                defaultValue={selectedDifficulty}
                onChange={(e) => handleChange(e)}
                />
                </div>
            ) : null}

            {/*Use curly braces for inline IF expression - display start button*/}
            {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
            <button className="start" onClick={startTrivia}>
                Start
            </button>
            ) : null}

            {/* Conditionals for displaying score and loading */}
            {!gameOver ? <p className="score">Score: {score}</p> : null}
            {!gameOver ? <p className="difficulty">Difficulty: {selectedDifficulty.label}</p> : null}
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