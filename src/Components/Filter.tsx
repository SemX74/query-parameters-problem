interface FilterProps {
  title: string;
  onDelete: (title: string) => void;
}

const Filter: React.FC<FilterProps> = ({ title, onDelete }) => {
  return (
    <div
      onClick={() => onDelete(title)}
      className={`bg-amber-400 text-center rounded p-4 py-1 m-1 cursor-pointer hover:bg-gray-800 duration-200 hover:text-white`}
    >
      {title}
    </div>
  );
};

export default Filter;
