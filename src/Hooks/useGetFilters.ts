import { useEffect, useState } from "react";
import { questionsData } from "../service/questionsData";
export interface IFilter {
  title: string;
  category: string;
  isActive: boolean;
}
export const useGetFilters = () => {
  const [filters, setFilters] = useState<IFilter[]>([]);
  let isValid = filters.every((el) => el.isActive !== false);
  console.log("useGetFilters Render");

  useEffect(() => {
    let hoistedFilterValues: string[] = [];
    let hoistedFilters: IFilter[] = [];
    questionsData.forEach((question) =>
      Object.entries(question).forEach(
        ([key, value]: [string, string | string[]]) =>
          Array.isArray(value)
            ? value.forEach((el: string, id) => {
                if (!hoistedFilterValues.includes(el)) {
                  hoistedFilterValues.push(el);
                  hoistedFilters.push({
                    title: el,
                    category: key,
                    isActive: false,
                  });
                }
              })
            : hoistedFilterValues.includes(value) &&
              hoistedFilters.push({
                title: value,
                category: key,
                isActive: false,
              })
      )
    );
    setFilters(hoistedFilters);
  }, []);

  return { filters, setFilters, isValid };
};
