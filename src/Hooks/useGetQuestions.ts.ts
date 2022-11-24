import { useEffect, useState } from "react";
import { questionsData } from "../Service/QuestionsData";
import { useGetParams } from "./useGetParams";

export interface Question {
  title: string;
  companies: string[];
  positions: string[];
  tags: string[];
}

export const useGetQuestions = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const { searchParamsValues } = useGetParams();
  console.log("useGetQuestions Render");

  useEffect(() => {
    let newQuestions = questionsData.filter((question) => {
      let checkedQuestion: boolean[] = [];
      Object.entries(question).forEach(
        ([key, value]: [string, string[] | string]) => {
          if (
            searchParamsValues.every((param) =>
              value.includes(param.split("+").join(" "))
            )
          ) {
            checkedQuestion.push(true);
          } else {
            checkedQuestion.push(false);
          }
        }
      );

      if (!checkedQuestion.every((el) => el == false)) {
        return true;
      }
    });

    setQuestions(newQuestions);
  }, [searchParamsValues]);
  return { questions };
};
