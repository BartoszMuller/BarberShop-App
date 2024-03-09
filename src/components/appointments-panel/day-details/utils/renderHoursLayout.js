import { APPOINTMENTS } from "@/shared/constants/appointments";
import { addMinutes, format } from "date-fns";
import AppointmentDetails from "../modules/AppointmentDetails";
import DuplicateHour from "../modules/DupliacteHour";
import AvailableHour from "../modules/AvailableHour";
import { getProperAppointmentNum } from "./renderHelpers";
import BlankBookedHour from "../modules/BlankBookedHour";
import { isUserAdmin } from "@/app/api/utils/auth/verification";
import AccessibleBookedHour from "../modules/AccessibleBookedHour";
import { isSameMinute } from "date-fns";

const getHoursLayout = (
  aptsOfSelectedDay,
  startWorkDate,
  endWorkDate,
  pickedHours,
  showDetails,
  onShowDetails,
  onHideInfo,
  onCheckDate
) => {
  const workTime = [];

  let appointmentNumber = getProperAppointmentNum(
    aptsOfSelectedDay,
    startWorkDate
  );
  let currentDate = startWorkDate;

  while (currentDate < endWorkDate) {
    const currentDateKey = currentDate.toISOString();
    const isPickedDate = showDetails === currentDateKey;
    const isCollision = pickedHours.includes(currentDateKey);
    const currentAppointment =
      (aptsOfSelectedDay && aptsOfSelectedDay[appointmentNumber]) || false;
    const isUserAppointment = !!currentAppointment?.user;

    if (isSameMinute(currentDate, currentAppointment.date)) {
      if (isUserAppointment) {
        workTime.push(
          <AccessibleBookedHour
            currentAppointment={currentAppointment}
            currentDate={currentDate}
            currentDateKey={currentDateKey}
            isPickedDate={isPickedDate}
            onShowDetails={onShowDetails}
            isCollision={isCollision}
            key={currentDateKey}
          >
            {isPickedDate && (
              <AppointmentDetails
                key={currentDateKey + "AptDetail"}
                showDetails={showDetails}
                onHideInfo={onHideInfo}
                currentAppointment={currentAppointment}
              ></AppointmentDetails>
            )}
          </AccessibleBookedHour>
        );

        const appointmentDuration = Math.floor(
          currentAppointment.duration / APPOINTMENTS.TIME_IN_MINUTES
        );
        for (let i = 1; i < appointmentDuration; i++) {
          currentDate = addMinutes(currentDate, APPOINTMENTS.TIME_IN_MINUTES);
          workTime.push(
            <AccessibleBookedHour
              key={currentDateKey + i}
              currentAppointment={currentAppointment}
              currentDate={currentDate}
              currentDateKey={currentDateKey}
              isPickedDate={isPickedDate}
              onShowDetails={onShowDetails}
              isCollision={isCollision}
            />
          );
        }
      } else {
        workTime.push(
          <BlankBookedHour
            key={currentDateKey}
            isCollision={isCollision}
            currentDate={currentDate}
          />
        );
      }

      appointmentNumber++;
    } else if (currentAppointment.date < currentDate) {
      workTime.push(<DuplicateHour currentDate={currentAppointment.date} />);
      appointmentNumber++;
    } else {
      workTime.push(
        <AvailableHour
          key={currentDateKey}
          isCollision={isCollision}
          isPickedDate={isPickedDate}
          currentDate={currentDate}
          currentDateKey={currentDateKey}
          onCheckDate={onCheckDate}
        />
      );
    }
    currentDate = addMinutes(currentDate, APPOINTMENTS.TIME_IN_MINUTES);
  }

  return workTime;
};

export default getHoursLayout;
