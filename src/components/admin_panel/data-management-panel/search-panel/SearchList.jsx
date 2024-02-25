import EmptyContent from "@/components/static-statements/EmptyContent";
import Loading from "@/components/static-statements/Loading";
import styles from "./searchPanel.module.scss";

const SearchList = (props) => {
  const {
    listToRender,
    isLoading,
    currentSelectedId,
    onSelectElement,
    dataToRender,
  } = props;

  if (isLoading) {
    return <Loading />;
  } else if (listToRender?.length > 0) {
    return (
      <div className={styles.searchList}>
        {listToRender?.map((element) => {
          return (
            <div
              className={`${styles.elementData} ${
                element.id === currentSelectedId ? styles.selected : ""
              }`}
              key={element.id}
              onClick={() => onSelectElement(element)}
            >
              {dataToRender.map((key) => (
                <div key={element.id + key}>{element[key] ?? ""}</div>
              ))}
            </div>
          );
        })}
      </div>
    );
  } else {
    return <EmptyContent />;
  }
};
export default SearchList;
