/** @format */

import React, {useState, useCallback} from "react";

interface CheckboxProps {
  onReschedule: () => void;
  onTeacherReschedule: () => void;
}

export const RescheduleCheckbox: React.FC<CheckboxProps> = ({
  onReschedule,
  onTeacherReschedule,
}) => {
  const [checkedState, setCheckedState] = useState<{
    reschedule: boolean;
    teacherReschedule: boolean;
  }>({
    reschedule: false,
    teacherReschedule: false,
  });

  const handleCheckboxChange = useCallback(
    (type: "reschedule" | "teacherReschedule") => {
      setCheckedState((prevState) => {
        const newState = {
          reschedule: type === "reschedule" ? !prevState.reschedule : false,
          teacherReschedule:
            type === "teacherReschedule" ? !prevState.teacherReschedule : false,
        };
        return newState;
      });

      if (type === "reschedule") {
        onReschedule();
      } else {
        onTeacherReschedule();
      }
    },
    [onReschedule, onTeacherReschedule]
  );

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={checkedState.reschedule}
          onChange={() => handleCheckboxChange("reschedule")}
        />
        Reschedule
      </label>
      <label style={{marginLeft: "10px"}}>
        <input
          type="checkbox"
          checked={checkedState.teacherReschedule}
          onChange={() => handleCheckboxChange("teacherReschedule")}
        />
        Teacher Reschedule
      </label>
    </div>
  );
};
