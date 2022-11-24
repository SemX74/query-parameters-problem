import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import FiltersList from "./components/FiltersList";
import QuestionsList from "./components/QuestionsList";
import { useGetFilters } from "./hooks/useGetFilters";
interface AppProps {}

const App: React.FC<AppProps> = () => {
  const [inputValue, setInputValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const { isValid } = useGetFilters();
  const navigate = useNavigate();
  console.log("App render");

  //мне лень писать тип для евента
  const handleChange = (e: any) => {
    setInputValue(e.target.value);
  };
  useEffect(() => {
    if (inputValue === "") {
      searchParams.delete("title");
    } else {
      searchParams.set("title", inputValue.toLowerCase());
    }
    setSearchParams(searchParams);
  }, [inputValue]);

  useEffect(() => {}, [inputValue]);
  return (
    <div className="bg-slate-600 w-full h-screen flex justify-center items-center">
      <div className="flex flex-col justify-start items-center">
        <h1 className="text-white font-bold text-[25px]">
          Query Parameters Problem
        </h1>
        <section className="flex justify-center items-center flex-col mt-8">
          <div className="flex justify-center items-center h-12">
            <input
              placeholder="Search..."
              className="rounded bg-slate-800 border-slate-800 focus:border-dashed outline-none focus:border-slate-600 border-4 p-2 my-2 text-white "
              value={inputValue}
              onChange={handleChange}
            />
            <button
              className="bg-green-700 border-green-700 h-full font-bold text-white hover:bg-transparent disabled:hover:text-white hover:text-lime-500  mx-4 border-solid border-2 duration-200 rounded p-2 py-1 cursor-pointer disabled:border-transparent disabled:bg-gray-500 disabled:cursor-not-allowed"
              disabled={isValid}
              onClick={() => {
                navigate("/");
                navigate(0);
              }}
            >
              RESET
            </button>
          </div>

          <FiltersList />
          <QuestionsList />
        </section>
      </div>
    </div>
  );
};

export default App;
