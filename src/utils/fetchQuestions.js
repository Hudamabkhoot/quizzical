import { decode } from 'html-entities';
import { v4 as uuidv4 } from 'uuid';

const randomize = () => 0.5 - Math.random();

const fetchQuestions = async (selectedCategory, selectedAmount ) => {
  try {
    let url = `https://opentdb.com/api.php?amount=${selectedAmount}&category=${selectedCategory}&type=multiple`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch questions: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    console.log(data)
      return data.results.map(que => {
        const randomArr = [...que.incorrect_answers.map(decode), decode(que.correct_answer)].sort(randomize);
        const randomAnswerList = randomArr.map(item => ({
          value: item,
          id: uuidv4(),
          isHeld: false,
        }));
        return {
          question: decode(que.question),
          correctAnswer: decode(que.correct_answer),
          choices: randomAnswerList,
          uuid: uuidv4(),
          selectedAnswer: null
        };
      });
  } catch (error) {
    console.error('Error fetching questions:', error);
    return [];
  }
};

export { fetchQuestions };

