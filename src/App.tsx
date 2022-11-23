import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import List from "./Components/List";
import QuestionsList from "./Components/QuestionsList";
import { useAppDispatch, useGetFilters } from "./Hooks/ReduxHooks";
import { addQuestions } from "./Redux/QuestionsSlice";
import { questionsData } from "./Service/QuestionsData";
interface AppProps {}

const App: React.FC<AppProps> = () => {
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
            className="bg-green-700 border-green-700 font-bold text-white hover:bg-transparent disabled:hover:text-white hover:text-lime-500 border-2 duration-200 rounded p-2 py-1 cursor-pointer disabled:border-transparent disabled:bg-gray-500 disabled:cursor-not-allowed"
            disabled={isValid}
            onClick={() => {
              navigate("/");
              navigate(0);
            }}
          >
            RESET
          </button>
          <List />
          <QuestionsList />
        </section>
      </div>
    </div>
  );
};

export default App;
