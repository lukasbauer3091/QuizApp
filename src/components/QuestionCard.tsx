import React from 'react';
import {AnswerObject} from '../App';

import { Wrapper, ButtonWrapper } from './QuestionCard.styles'


type Props = {
    question: string;
    answers: string[]; //all the answers
    callback: any;
    userAnswer: AnswerObject | undefined;
    questionNr: number;
    totalQuestions: number;
}

const QuestionCard = (Props:Props) => 
(
    <Wrapper>
        <p className ="number">
            Question: {Props.questionNr} / {Props.totalQuestions}
        </p>
        <p dangerouslySetInnerHTML={{ __html: Props.question}}/>
        <div>
            {Props.answers.map(answer => (
                <ButtonWrapper 
                key={answer}
                correct={Props.userAnswer?.correctAnswer === answer}
                userClicked={Props.userAnswer?.answer === answer}
                >
                    <button disabled={Props.userAnswer ? true : false} value={answer} onClick={Props.callback}>
                        <span dangerouslySetInnerHTML={{ __html: answer}} />
                    </button>
                </ButtonWrapper>    
            ))}
        </div>

    </Wrapper>
);

export default QuestionCard;
