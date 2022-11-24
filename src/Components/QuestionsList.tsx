import { useGetQuestions } from "../Hooks/useGetQuestions.ts";
import Question from "./Question";

interface QuestionsListProps {}

const QuestionsList: React.FC<QuestionsListProps> = () => {
  const { questions } = useGetQuestions();
  return (
    <div>
      {questions.map((question, id) => (
        <Question title={question.title} key={id} />
      ))}
    </div>
  );
};

export default QuestionsList;
