import { INFO_STATEMENT } from "@/shared/constants/statement";
import styles from "./statements.module.scss";

const Loading = () => {
  return <div className={styles.statementInfo}> {INFO_STATEMENT.LOADING} </div>;
};
export default Loading;
