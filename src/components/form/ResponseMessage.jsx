import styles from "./responseMessage.module.scss";

const ResponseMessage = (props) => {
  const { response, error, children } = props;

  return (
    <div className={styles.feedbackInfo}>
      {response && (
        <div className={styles.response}>{children || response}</div>
      )}

      {error && <div className={styles.error}>{error.response.data}</div>}
    </div>
  );
};

export default ResponseMessage;
