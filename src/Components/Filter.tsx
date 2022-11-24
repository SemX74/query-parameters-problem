interface FilterProps {
  title: string;
  category: string;
  isActive: boolean;
  onChoose: (title: string) => void;
}

const Filter: React.FC<FilterProps> = ({ title, isActive, onChoose }) => {
  return (
    <div
      onClick={() => onChoose(title)}
      className={`${
        isActive ? "bg-green-800 text-white" : "bg-amber-400 text-black"
      } text-center rounded p-4 py-1 m-1 cursor-pointer hover:bg-gray-800 duration-200 hover:text-white`}
    >
      {title}
    </div>
  );
};

export default Filter;
