import React, { createContext, useState, useEffect } from 'react';
import { fetchQuestions } from '../utils/fetchQuestions';
import questionCategories from '../data.json';

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [startQuiz, setStartQuiz] = useState(false);
  const [allQuestions, setAllQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedAmount, setSelectedAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [noQuestionsFound, setNoQuestionsFound] = useState(false);

  // Define categoryOptions based on questionCategories
  const categoryOptions = questionCategories.map(category => (
    <option key={category.id} value={category.id}>
      {category.name}
    </option>
  ));

  const amountOptions = [...Array(16)].map((_, index) => (
    <option key={index + 5} value={index + 5}>{index + 5}</option>
  ));

  // Function to handle selecting a category
  function getSelectedCategory(selectedValue) {
    setSelectedCategory(selectedValue);
    setNoQuestionsFound(false); // Reset noQuestionsFound when category changes
  }

  function getSelectedAmount(selectedValue) {
    const amount = parseInt(selectedValue, 10); // Parse the selected value to an integer
    setSelectedAmount(amount);
  }

  // Function to handle starting the quiz
  const handleStartQuiz = () => {
    if (selectedCategory && selectedAmount && !startQuiz) {
      setLoading(true);
      setStartQuiz(true);
    } else if (selectedCategory && selectedAmount && allQuestions.length === 0) {
      setNoQuestionsFound(true);
    }
  };

  // Function to handle playing again
  const handlePlayAgain = () => {
    setStartQuiz(false);
    setLoading(false);
    setSubmitted(false);
    setScore(0); // Reset score when playing again
    setSelectedCategory('');
    setSelectedAmount('');
  };

  // Function to handle submitting answers
  const handleSubmit = () => {
    let totalScore = 0;
    allQuestions.forEach(question => {
      if (question.selectedAnswer === question.correctAnswer) {
        totalScore++;
      }
    });
    setSubmitted(true);
    setScore(totalScore);
  };

  // Fetch questions when startQuiz or selectedCategory changes
  useEffect(() => {
    if (startQuiz && selectedCategory && selectedAmount) {
      setLoading(true);
      setError(null); // Reset error state
      fetchQuestions(selectedCategory, selectedAmount, setNoQuestionsFound)
        .then(data => {
          if (data.length === 0) {
            setNoQuestionsFound(true);
          } else {
            setAllQuestions(data);
          }
          setLoading(false);
        })
        .catch(error => {
          setLoading(false);
          setError('Failed to fetch questions. Please try again.');
        });
    }
  }, [startQuiz, selectedCategory, selectedAmount]);


// Function to handle selecting an answer choice for a question
const handleSelectAnswer = (choiceId, questionIndex) => {
  setAllQuestions(prevQuestions => {
    return prevQuestions.map((question, index) => {
      if (index === questionIndex) {
        const updatedChoices = question.choices.map(choice => {
          if (choice.id === choiceId) {
            return {
              ...choice,
              isHeld: !choice.isHeld,
            };
          }
          return {
            ...choice,
            isHeld: false,
          };
        });

        const selectedAnswer = updatedChoices.find(choice => choice.isHeld)?.value || null;

        return {
          ...question,
          choices: updatedChoices,
          selectedAnswer: selectedAnswer,
        };
      }
      return question;
    });
  });
};
  
  return (
    <QuizContext.Provider
      value={{
        startQuiz,
        setStartQuiz,
        allQuestions,
        score,
        submitted,
        categoryOptions,
        selectedCategory,
        amountOptions,
        loading,
        error,
        noQuestionsFound,
        setNoQuestionsFound,
        handleSelectAnswer,
        getSelectedCategory,
        getSelectedAmount,
        handleStartQuiz,
        handlePlayAgain,
        handleSubmit,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export default QuizProvider;
