import React, { useContext } from 'react';
import { QuizContext } from '../components/QuizContext';
import styles from '../css-modules/HomePage.module.css';

const HomePage = () => {
  // Destructuring values from QuizContext
  const { 
    startQuiz, 
    handleStartQuiz, 
    getSelectedCategory, 
    categoryOptions, 
    amountOptions, 
    getSelectedAmount, 
    noQuestionsFound 
  } = useContext(QuizContext);

  return (
    <div className="container">
      {!startQuiz && (
        <div className={styles.HomePageContainer}>
          <div className={`${styles.blob} blobTopRightCorner`} />
          <div className={`${styles.blob} blobBottomLeftCorner`} />
          <h1>Quizzical</h1>
          <p>Answer the questions and test your knowledge!</p>
          {noQuestionsFound && (
            <p className={styles.NoQuestionsError}>
              Oops! We couldn't find any questions with these options!
            </p>
          )}
          <section className={styles.QuizSettings}>
            <div>
              <label htmlFor="categories">Category:</label>
              <select 
                id="categories" 
                onChange={(e) => getSelectedCategory(e.target.value)}
                className={styles.selectInput}
              >
                <option value="">Select Category</option>
                {categoryOptions}
              </select>
            </div>
            <div>
              <label htmlFor="amount">Amount:</label>
              <select 
                id="amount" 
                onChange={(e) => getSelectedAmount(e.target.value)}
                className={styles.selectInput}
              >
                <option value="">Select Amount</option>
                {amountOptions}
              </select>
            </div>
          </section>
          <button 
            onClick={handleStartQuiz}
            className={styles.HomePagePrimaryButton}
          >
            Start Quiz
          </button>
        </div>
      )}
    </div>
  );
}

export default HomePage;
