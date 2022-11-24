import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const useGetParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchParamsValues, setSearchParamsValues] = useState<string[]>([]);
  useEffect(() => {
    let newSearchParamsValues: string[] = Object.entries(
      Object.fromEntries(searchParams)
    )
      .map(([key, value]: [string, string]) => value.split(","))
      .flat(2);
    setSearchParamsValues(newSearchParamsValues);
  }, [searchParams]);
  return { searchParams, searchParamsValues };
};
