import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "../Redux/Store";
import { useSearchParams } from "react-router-dom";
import { Question } from "../Redux/QuestionsSlice";
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export interface NewFilter {
  co: string[];
  q: string;
  pos: string[];
  tag: string[];
}
export const useGetFilters = () => {
  const [searchParams] = useSearchParams();
  let filters = Object.fromEntries(searchParams);
  let newFilters: NewFilter = {
    co: [],
    q: "",
    pos: [],
    tag: [],
  };
  newFilters.co = filters.co?.split(",") || [];
  newFilters.q = filters.q || "";
  newFilters.pos = filters.pos?.split(",") || [];
  newFilters.tag = filters.tag?.split(",") || [];

  return newFilters;
};

export const useGetFilteredQuestions = () => {
  const { questions } = useAppSelector((state) => state.questions);
  const filters = useGetFilters();
  let filteredQuestions: Question[] = [];
  filters &&
    questions.forEach((question) => {
      if (
        filters.co?.every((elem) => question.companies.includes(elem)) &&
        filters.pos?.every((elem) => question.positions.includes(elem)) &&
        filters.tag?.every((elem) => question.tags.includes(elem)) &&
        question.title
          .toLowerCase()
          .includes(filters.q?.toLowerCase().split("+").join(" "))
      ) {
        filteredQuestions.push(question);
      }
    });
  return filteredQuestions;
};
