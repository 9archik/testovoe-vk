import { setFilter } from "../../../../redux/slices/newsList/slice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../shared/hooks/reduxHooks";
import styles from "./styles.module.css";
const Filter = () => {
  const filterValue = useAppSelector((state) => state.newsList.filter);
  const dispatch = useAppDispatch();
  return (
    <div className={styles.container}>
      <span>Filter by</span>
      <select
        onChange={(e) => {
          if (
            e.target.value === "top" ||
            e.target.value === "new" ||
            e.target.value === "best"
          )
            dispatch(setFilter(e.target.value));
        }}
        value={filterValue}
      >
        <option value={"top"}>top</option>
        <option value={"new"}>new</option>
        <option value={"best"}>best</option>
      </select>
    </div>
  );
};

export default Filter;
