import { useEffect, useRef, useState } from "react";
import styles from "./sectionCard.module.scss";

const SectionCard = (props) => {
  const { name, text, changeHandler } = props;
  const [isChanged, setIsChanged] = useState(null);
  const textRef = useRef();

  const changeChecker = (event) => {
    if (isChanged) {
      event.target.value === event.target.defaultValue && setIsChanged(false);
    } else {
      event.target.value !== event.target.defaultValue && setIsChanged(true);
    }
  };

  useEffect(() => {
    isChanged !== null && changeHandler(isChanged);
  }, [isChanged, changeHandler]);

  return (
    <div className={styles.field}>
      <div className={styles.title}>{name}</div>
      <textarea
        ref={textRef}
        onChange={(event) => changeChecker(event)}
        defaultValue={text}
      />
    </div>
  );
};

export default SectionCard;
