import React, { useContext } from 'react';
import { QuizContext } from './QuizContext';
import Question from './Question';


const Quiz = () => {
  const { allQuestions, handleSelectAnswer, submitted } = useContext(QuizContext); 

  return (
    <div> 
      {allQuestions.map((question, index ) => (
      <div className='questionContainer' key={question.uuid}>
        <Question
          question={question}
          handleSelectAnswer={(choiceId) => handleSelectAnswer(choiceId, index)}
          submitted={submitted}
        />
      </div>
      ))}
    </div>
  );
};

export default Quiz;
