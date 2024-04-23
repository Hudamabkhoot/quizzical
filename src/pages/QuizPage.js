import React, { useContext } from 'react';
import { QuizContext } from '../components/QuizContext';
import Quiz from '../components/Quiz';
import BarLoader from "react-spinners/BarLoader";
import styles from '../css-modules/QuizPage.module.css';


const QuizPage = () => {
  const {
    allQuestions,
    handleSubmit,
    submitted,
    score,
    startQuiz,
    loading,
    handlePlayAgain 
  } = useContext(QuizContext);

  const allQuestionsAnswered = allQuestions.every(question => question.selectedAnswer !== null);

  
  return (
    <div className='container'>
      {loading ? ( 
        <BarLoader
          color="#4D5B9E"
          height={7}
          width={3000}
        />
      ) : startQuiz && (
        <div className={styles.quizContainer}> 
          <div className={`${styles.blob} blobTopRightCorner`} />
          <div className={`${styles.blob} blobBottomLeftCorner`} />
          <div className={styles.quizQuestionsContainer}> 
            <Quiz />
          </div>
          <div className={styles.quizAnswersContainer}>
          {submitted && (
            <div className={styles.quizResultsContainer}>
              <h2 className={styles.quizResults}>You scored: {score}/{allQuestions.length} correct answers</h2>
            </div>
          )}
          <button 
            onClick={submitted ? handlePlayAgain : handleSubmit} 
            disabled={!startQuiz || (submitted && !allQuestionsAnswered)}
            className={styles.quizPrimaryButton}
          >
          {submitted ? "Play Again" : "Check Answers"}
        </button>
          </div>
        </div>
      )}
    </div> 
  );
}  

export default QuizPage;
