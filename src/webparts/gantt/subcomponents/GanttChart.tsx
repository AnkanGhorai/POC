import { IProjectsPlan } from "../models/IProjectsPlan";
import * as moment from 'moment';
import * as React from "react";
import MonthsRow from "./MonthsRow";
import DaysRow from "./DaysRow";
import styles from "../components/Gantt.module.scss";
import PlansRow from "./PlansRow";

interface IGanttChartProps{
    plans:IProjectsPlan[];
}
const GanttChart= (props:IGanttChartProps) => {
    const {plans} = props;
    const columnWidth = 28;
    const rowHeight = 25;
    const { minStart, maxEnd } = findDateBoundaries(plans);
    const paddedStart = minStart.subtract(1, 'days');
    const paddedEnd = maxEnd.add(1, 'days');

    //Creating and add Days Array for grid column
    let days = [];
    let uniqueKeyArr=["0"];
    plans.map((ele)=>{
      uniqueKeyArr.find((ele1) => ele1.valueOf()==(ele.Key).valueOf())==null ?
      uniqueKeyArr.push(ele.Key)
      :console.log("dummy found");
    });
    let date = moment(paddedStart);
    while (date.isBefore(paddedEnd)) {
        days.push(date.date());
        date = date.add(1, 'day');
    }
    const gridStyle: React.CSSProperties = {
      gridTemplateColumns: `repeat(${days.length}, ${columnWidth + 1}px)`,
      gridTemplateRows: `repeat(${uniqueKeyArr.length}, ${rowHeight}px)`
    }

    return(
      <div className={styles.ganttChart}>
      <MonthsRow 
        minDate={paddedStart}
        maxDate={paddedEnd}
        dayColumnWidth={columnWidth}
      />
      <DaysRow 
        minDate={paddedStart}
        maxDate={paddedEnd}
        dayColumnWidth={columnWidth}
        days={days}
      />
      <div className={styles.chart} >
        <div className={styles.grid} style={gridStyle}>
          {uniqueKeyArr.map(row => {
            return days.map((col, colIndex) => (
              <div className={`${styles.cell} ${colIndex === 0 ? styles.first : ''}`}></div>
            ))
          })}
        </div>
        {plans.map((plan, index) => {
          let numDaysFromStart = numDaysBetween(paddedStart, moment(plan.PlannedStartDate));
          return (
            <PlansRow 
              plan={plan} 
              height={rowHeight}
              dayWidth={columnWidth}
              x={(numDaysFromStart * columnWidth) + numDaysFromStart}
              y={(plan.Key as any as number * rowHeight) + 2}
            />
          );
        })}
      </div>
    </div>
    );

    
}
const findDateBoundaries = (data: IProjectsPlan[]): { minStart: moment.Moment, maxEnd: moment.Moment } => {
    let minStartDate, maxEndDate;
    data.forEach(({ PlannedStartDate, PlannedEndDate }) => {
      if (!minStartDate || moment(PlannedStartDate).isBefore(minStartDate)) minStartDate = moment(PlannedStartDate);
      if (!minStartDate || moment(PlannedEndDate).isBefore(minStartDate)) minStartDate = moment(PlannedEndDate);
      if (!maxEndDate || moment(PlannedEndDate).isAfter(maxEndDate)) maxEndDate = moment(PlannedEndDate);
      if (!maxEndDate || moment(PlannedStartDate).isAfter(maxEndDate)) maxEndDate = moment(PlannedStartDate);
    });
  
    return {
      minStart: minStartDate,
      maxEnd: maxEndDate
    };
  }
  const numDaysBetween = (date1: moment.Moment, date2: moment.Moment): number => {
    return Math.abs(date1.diff(date2, 'days'));
  }
  const onlyUnique=(value, index, self)=> {
    return self.indexOf(value) === index;
  }
export default GanttChart;