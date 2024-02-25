import { EMPTY_USER } from "@/shared/constants/user";
import styles from "./searchPanel.module.scss";
const AddNewElement = (props) => {
  const { onAddNewElement, currentSelectedId, children } = props;
  return (
    <div
      className={`${styles.addNew} ${
        !currentSelectedId ? styles.selected : ""
      }`}
      onClick={() => onAddNewElement(EMPTY_USER)}
    >
      {children}
    </div>
  );
};
export default AddNewElement;
