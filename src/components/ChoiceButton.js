import React from 'react';
import styles from '../css-modules/ChoiceButton.module.css';

const Button = ({ choice, handleSelectAnswer, submitted, question }) => {
  let buttonClassName = styles.secondaryButton;
  let isCorrect = choice.value === question.correctAnswer;

  buttonClassName += submitted
  ? choice.isHeld
    ? isCorrect
      ? ` ${styles.correctAnswer}`
      : ` ${styles.incorrectAnswer}`
    : !choice.isHeld && isCorrect
      ? ` ${styles.correctAnswer}`
      : ` ${styles.secondaryButtonAfterSubmit}`
  : choice.isHeld
    ? ` ${styles.selectedChoice}`
    : '';
  

  return (
    <button
      key={choice.id}
      id={choice.id}
      onClick={() => handleSelectAnswer(choice.id)}
      className={buttonClassName}
      disabled={submitted}
    >
      {choice.value}
    </button>
  );
};

export default Button;
