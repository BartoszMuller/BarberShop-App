import { ERROR_STATEMENT } from "@/shared/constants/statement";
import styles from "./statements.module.scss";

const ErrorContent = () => {
  return (
    <div className={styles.statementInfo}> {ERROR_STATEMENT.FETCH_ERROR} </div>
  );
};
export default ErrorContent;
