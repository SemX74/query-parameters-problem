interface QuestionProps {
  title: string;
}

const Question: React.FC<QuestionProps> = ({ title }) => {
  return (
    <div className="  text-white text-center rounded m-2 p-4 py-2 hover:scale-[1.05] duration-150 cursor-pointer bg-red-500 hover:bg-red-400">
      {title}
    </div>
  );
};

export default Question;
