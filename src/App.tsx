import React, { useState } from 'react';
import Select from 'react-select';

import { fetchQuizQuestions } from './API';
//Components
import QuestionCard from './components/QuestionCard'
// Types
import {QuestionState,Difficulty} from './API'
// Styles
import { GlobalStyle, Wrapper } from './primstyles';

import Collapsible from 'react-collapsible';




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

const numQuestions = [
    {value: 5, label: "5"},
    {value: 10, label: "10"},
    {value: 15, label: "15"},
    {value: 20, label: "20"},
    {value: 30, label: "30"}
];


function App(){

    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState<QuestionState[]>([]);
    const [number, setNumber] = useState(0);
    const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(true);
    const [gameEnd, setGameEnd] = useState(false);
    
    const [selectedDifficulty, setSelectedDifficulty] = useState(() => difficulty[0]);
    const [selectedNumQuestions, setSelectedNumQuestions] = useState(() => numQuestions[0]);


    const handleChange = (selectedOption: {value:Difficulty,label:string} | null)  =>{
        if (selectedOption != null){
        setSelectedDifficulty(selectedOption);
        console.log(selectedOption.value);}    
    }

    const handleNumChange = (selectedOption: {value:number,label:string} | null)  =>{
        if (selectedOption != null){
        setSelectedNumQuestions(selectedOption);
        console.log(selectedOption.value);}    
    }

    
    

    const startTrivia = async () => {
        setLoading(true);
        setGameOver(false);
        setGameEnd(false);
        //console.log(selectedDifficulty.value);
        const newQuestions = await fetchQuizQuestions(
            selectedNumQuestions.value,
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

        if (nextQuestion === selectedNumQuestions.value){
            /* set game END state */
            setGameEnd(true);

        }
        else{
            setNumber(nextQuestion);
        }
    }

    const showStart = () => {
        if (gameOver){
            return (<button className="start" onClick={startTrivia}>
            Start
        </button>)
        }
        else if (gameEnd){
            return (<button className="next" onClick={reset}>
            Main Menu
        </button>)
        }
    }

    const reset = () => {
        setLoading(false);
        setNumber(0);
        setScore(0);
        setGameOver(true);
        setGameEnd(false);
    }

    const displayAnswers = () => {
        let ansArr = [];
        for (let questionNumber = 0; questionNumber < selectedNumQuestions.value; questionNumber++){
            ansArr.push(<QuestionCard 
                questionNr={questionNumber + 1}
                totalQuestions = {selectedNumQuestions.value}
                question = {questions[questionNumber].question}
                answers = {questions[questionNumber].answers}
                userAnswer = {userAnswers ? userAnswers[questionNumber] : undefined}
                callback = {checkAnswer}
            />)
        }
        return (<Collapsible easing="ease" trigger="Your Answers"><Wrapper>{ansArr}</Wrapper></Collapsible>);
    }

    return (
      <>
      <GlobalStyle />
        <Wrapper>
            <h1>REACT QUIZ</h1>

            {gameOver  ? (
                <Collapsible easing="ease" trigger="Preferences">
                <div className="difficultyBox">
                <h4>Difficulty</h4>
                <Select 
                className="difficultySelect"
                menuPosition="fixed"
                options={difficulty}
                isSearchable={false}
                defaultValue={selectedDifficulty}
                onChange={(e) => handleChange(e)}
                />
                </div>
                <div className="difficultyBox">
                <h4>Number of Questions</h4>
                <Select 
                className="difficultySelect"
                menuPosition="fixed"
                options={numQuestions}
                isSearchable={false}
                defaultValue={selectedNumQuestions}
                onChange={(e) => handleNumChange(e)}
                />
                </div>

                </Collapsible>
            ) : null}

            {/*Use curly braces for inline IF expression - display start button*/}
            {/* to check that all the answers have been made: || userAnswers.length === selectedNumQuestions.value*/}
            

            {/* Conditionals for displaying score and loading */}
            {!gameOver && !gameEnd ? <p className="score">Score: {score}</p> : null}
            {!gameOver && gameEnd ? <p className="score">Final Score: {score}</p> : null}
            {!gameOver ? <p className="difficulty">Difficulty: {selectedDifficulty.label}</p> : null}
            {loading && <p>Loading Questions ...</p>}
            
            {/* If not loading or game over, show questions */}
            {!gameEnd && !loading && !gameOver && (
            <QuestionCard 
                questionNr={number + 1}
                totalQuestions = {selectedNumQuestions.value}
                question = {questions[number].question}
                answers = {questions[number].answers}
                userAnswer = {userAnswers ? userAnswers[number] : undefined}
                callback = {checkAnswer}
            />
            )}

            {/* Display next button after user inputs their answer */}
            {!gameOver && !loading && userAnswers.length === number + 1 && number !== selectedNumQuestions.value - 1 ? (
            <button className="next" onClick={nextQuestion}>
                Next Question
            </button>

            ) : null}

            {!gameEnd && !gameOver && !loading && userAnswers.length === number + 1 && number === selectedNumQuestions.value-1 ? (
            <button className="next" onClick={nextQuestion}>
                Finish Quiz
            </button>

            ) : null}

            {gameEnd ? displayAnswers(): null}

            {showStart()}

        </Wrapper>
        </>
    )
}

export default App;