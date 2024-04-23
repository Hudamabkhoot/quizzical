import React from 'react';
import Button from './ChoiceButton'; 

const Question = ({ question, handleSelectAnswer, submitted }) => {
  return (
    <div>
      <h2 className='Question'>{question.question}</h2>
      <div>
        {question.choices.map(choice => (
          <Button
            key={choice.id}
            choice={choice}
            handleSelectAnswer={handleSelectAnswer}
            submitted={submitted}
            question={question}
          />
        ))}
      </div>
    </div>
  );
};

export default Question;
