import * as React from "react";
import styles from "../components/Gantt.module.scss";

interface IDaysRowProps {
    dayColumnWidth: number;
    minDate: moment.Moment;
    maxDate: moment.Moment;
    days: number[];
  }


  const DaysRow = (props: IDaysRowProps) => {
    const { days, dayColumnWidth } = props;

    return (
      <div className={styles.daysRow}>
        {days.map(day => {
          let dayStyle: React.CSSProperties = {
            width: dayColumnWidth,
            flexBasis: dayColumnWidth
          };
          return (
            <div className={styles.day} style={dayStyle}>
              <div>{ day }</div>
            </div>
          );
        })}
      </div>
    );
  }
  
  export default DaysRow;