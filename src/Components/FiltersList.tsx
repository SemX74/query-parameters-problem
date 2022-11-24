import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IFilter, useGetFilters } from "../hooks/useGetFilters";
import { useGetParams } from "../hooks/useGetParams";
import Filter from "./Filter";

interface FilterListProps {}

const FilterList: React.FC<FilterListProps> = () => {
  const { filters } = useGetFilters();
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchParamsValues } = useGetParams();
  const [stateFilters, setStateFilters] = useState<IFilter[]>();

  console.log("FilterList Render");

  useEffect(() => {
    setStateFilters(filters);
    let newFilters = filters?.map((filter) => {
      if (searchParamsValues.includes(filter.title)) {
        return { ...filter, isActive: true };
      } else {
        return { ...filter, isActive: false };
      }
    });
    setStateFilters(newFilters);
  }, [searchParamsValues, filters]);
  const onChoose = (title: string) => {
    stateFilters?.forEach((filter) => {
      if (filter.title.toLowerCase() === title.toLowerCase()) {
        let currentParams = searchParams.get(filter.category);
        if (!currentParams) {
          searchParams.set(filter.category, filter.title);
        } else if (currentParams === filter.title) {
          searchParams.delete(filter.category);
        } else {
          if (!currentParams.split(",").includes(title)) {
            searchParams.set(
              filter.category,
              currentParams.split(",").concat(title).join(",")
            );
          } else {
            searchParams.set(
              filter.category,
              currentParams
                .split(",")
                .filter((el) => el !== title)
                .join(",")
            );
          }
        }
      }
    });
    setSearchParams(searchParams);
  };

  return (
    <div className="flex flex-col justify-center items-start">
      <div className="flex justify-center mx-auto w-2/4 flex-wrap my-5">
        {stateFilters &&
          stateFilters.map((filter, id) => (
            <Filter
              key={id}
              title={filter.title}
              category={filter.category}
              isActive={filter.isActive}
              onChoose={onChoose}
            />
          ))}
      </div>
    </div>
  );
};

export default FilterList;
