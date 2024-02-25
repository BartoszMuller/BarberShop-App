import { INFO_STATEMENT } from "@/shared/constants/statement";
import styles from "./statements.module.scss";

const EmptyContent = () => {
  return (
    <div className={styles.statementInfo}> {INFO_STATEMENT.EMPTY_CONTENT}</div>
  );
};
export default EmptyContent;
