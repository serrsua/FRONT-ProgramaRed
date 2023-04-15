import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTags } from "../../redux/actions";

const Filters = ({ posts }) => {
  const filterByTag = useSelector((state) => state.filterByTag);
  const [filter, serFilter] = useState(filterByTag);
  // console.log("soy el estado local filter:",filter);

  const allTags = useSelector((state) => state.tags);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTags());
  }, []);

  const [selectedTag, setSelectedTag] = useState();

  const getPostByTag = (e) => {
    if (e.target) {
      const tag = "tag=" + e.target.value;
      // console.log("soy el tag",tag);
      setSelectedTag(tag);
      // console.log("soy selectedTag: ",tag);
      dispatch(getPostByTag(tag));
    }
  };
  return (
    <>
      <div>
        <select name="orden">
          <option value="" hidden>
            Ordenar
          </option>
          <option value="">A-Z</option>
          <option value="">Z-A</option>

          <option value="" hidden>
            Fecha
          </option>
          <option value="">Reciente</option>
          <option value="">Antiguo</option>
        </select>

        <select onChange={getPostByTag} name="tags">
          <option value="" hidden>
            Tags
          </option>
          <option value="All">Todos</option>
          {allTags?.map((tag, i) => {
            return (
              <option key={i} value={tag.name}>
                {tag.name}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
};

export default Filters;
