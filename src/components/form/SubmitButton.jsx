import styles from "./sumbitButton.module.scss";

const SubmitButton = (props) => {
  const { isLoading, onSendData } = props;

  return (
    <button className={styles.sendButton} onClick={onSendData}>
      {isLoading ? "Wysyłanie..." : "Wyslij"}
    </button>
  );
};

export default SubmitButton;
