import { useSearchParams } from "react-router-dom";
import { useGetFilters } from "../Hooks/ReduxHooks";
import Filter from "./Filter";

interface ListProps {}

const List: React.FC<ListProps> = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filters = useGetFilters();
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
  );
};

export default List;
