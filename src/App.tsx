import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Filter from "./Components/Filter";
import Question from "./Components/Question";
import {
  useAppDispatch,
  useGetFilteredQuestions,
  useGetFilters,
} from "./Hooks/ReduxHooks";
import { addQuestions } from "./Redux/QuestionsSlice";
import { questionsData } from "./Service/QuestionsData";
interface AppProps {}

const App: React.FC<AppProps> = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filteredQuestions = useGetFilteredQuestions();
  const filters = useGetFilters();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isValid =
    !filters.co.length &&
    !filters.pos.length &&
    !filters.tag.length &&
    !filters.q;

  useEffect(() => {
    dispatch(addQuestions(questionsData));
  }, []);

  const onDelete = (title: string) => {
    if (filters.q.toLowerCase() === title.toLowerCase()) {
      searchParams.delete("q");
    }
    searchParams.set("pos", filters.pos.filter((el) => el !== title).join(","));
    if (!searchParams.get("pos")) {
      searchParams.delete("pos");
    }
    searchParams.set("tag", filters.tag.filter((el) => el !== title).join(","));
    if (!searchParams.get("tag")) {
      searchParams.delete("tag");
    }
    searchParams.set("co", filters.co.filter((el) => el !== title).join(","));
    if (!searchParams.get("co")) {
      searchParams.delete("co");
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="bg-slate-600 w-full h-screen flex justify-center items-center">
      <div className="flex flex-col justify-start items-center">
        <h1 className="text-white font-bold text-[25px]">
          Query Parameters Problem
        </h1>
        <p className="text-slate-400 ">
          hint: <br />
          <span className="opacity-100 text-white">
            ?q=easy&co=amazon&pos=ML+Engineer&tag=statistics
          </span>
        </p>
        <section className="flex justify-center items-center flex-col mt-8">
          <button
            className="bg-green-700 font-bold border-green-700 text-white hover:bg-transparent disabled:hover:text-white hover:text-lime-500 border-lime-500 border-2 duration-200 rounded p-2 py-1 cursor-pointer disabled:border-transparent disabled:bg-gray-500 disabled:cursor-not-allowed"
            disabled={isValid}
            onClick={() => {
              navigate("/");
              navigate(0);
            }}
          >
            RESET
          </button>
          <div className="flex justify-start my-5">
            {filters.q && <Filter title={filters.q} onDelete={onDelete} />}
            {filters.co?.map((company, id) => (
              <Filter title={company} key={id} onDelete={onDelete} />
            ))}
            {filters.pos?.map((position, id) => (
              <Filter title={position} key={id} onDelete={onDelete} />
            ))}
            {filters.tag?.map((tag, id) => (
              <Filter title={tag} key={id} onDelete={onDelete} />
            ))}
          </div>
          <div>
            {filteredQuestions?.map((question, id) => (
              <Question title={question.title} key={id} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default App;
