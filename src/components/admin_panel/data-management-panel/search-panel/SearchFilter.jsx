import { EMPTY_USER } from "@/shared/constants/user";
import styles from "./searchFilter.module.scss";
const SearchFilter = (props) => {
  const { filterValue, onChangeFilter } = props;
  return (
    <div className={styles.filter}>
      <input
        placeholder="..."
        onChange={(e) => onChangeFilter(e)}
        value={filterValue}
      />
      <img alt="find icon" src="/images/find.svg" />
    </div>
  );
};
export default SearchFilter;
