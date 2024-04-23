import React from 'react';
import { QuizProvider } from './components/QuizContext';
import HomePage from './pages/HomePage';
import QuizPage from './pages/QuizPage';


const App = () => {

  return (
      <QuizProvider>
        <HomePage />
        <QuizPage />
      </QuizProvider>
  );
}

export default App;
