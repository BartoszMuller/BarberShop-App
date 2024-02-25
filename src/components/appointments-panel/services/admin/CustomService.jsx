import { useContext, useState } from "react";
import styles from "./customService.module.scss";
import ReservationContext from "@/context/reservation/reservation_context";
import { CUSTOM_SERVICE } from "@/shared/constants/service";

const CustomService = () => {
  const [customService, setCustomService] = useState(CUSTOM_SERVICE);
  const { pickService, pickedService } = useContext(ReservationContext);

  const isCustomServicePicked = pickedService.id === CUSTOM_SERVICE.id;

  const onPickService = () => {
    isCustomServicePicked ? pickService(false) : pickService(customService);
  };
  const onChangeCustomSerivce = (index, value) => {
    setCustomService((prevValue) => {
      return {
        ...prevValue,
        [index]: value,
      };
    });
  };

  return (
    <>
      <div
        className={`${styles.customService} ${
          isCustomServicePicked ? styles.isPicked : ""
        }`}
        onClick={onPickService}
      >
        Własna usługa
      </div>

      {isCustomServicePicked && (
        <div className={styles.customFields}>
          <div className={styles.numberFields}>
            <div>
              <label>Czas:</label>
              <input
                type="number"
                step="30"
                min="30"
                max="780"
                onChange={(e) =>
                  onChangeCustomSerivce("duration", e.target.value)
                }
                value={customService.duration}
              />
            </div>
            <div>
              <label>Cena:</label>
              <input
                type="number"
                min="0"
                onChange={(e) => onChangeCustomSerivce("price", e.target.value)}
                value={`${customService.price}`}
              />
            </div>
          </div>

          <div className={styles.textFields}>
            <div>
              <label>Notatka:</label>
              <textarea
                onChange={(e) => onChangeCustomSerivce("note", e.target.value)}
                value={customService.note}
              />
            </div>
            <div>
              <label>Nazwa usługi:</label>
              <textarea
                onChange={(e) =>
                  onChangeCustomSerivce("name", e.target.value)
                }
                value={customService.name}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default CustomService;
