import { useGetFilteredQuestions } from "../Hooks/ReduxHooks";
import Question from "./Question";

interface QuestionsListProps {}

const QuestionsList: React.FC<QuestionsListProps> = () => {
  const filteredQuestions = useGetFilteredQuestions();
  return (
    <div>
      {filteredQuestions?.map((question, id) => (
        <Question title={question.title} key={id} />
      ))}
    </div>
  );
};

export default QuestionsList;
