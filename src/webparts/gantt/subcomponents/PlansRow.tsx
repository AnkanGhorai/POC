import { isEmpty } from "@microsoft/sp-lodash-subset";
import * as moment from "moment";
import * as React from "react";
import styles from "../components/Gantt.module.scss";
import { IProjectsPlan } from "../models/IProjectsPlan";


interface IPlansRowProps {
    plan: IProjectsPlan;
    height: number;
    dayWidth: number;
    x: number;
    y: number;
  }

  const PlansRow = (props: IPlansRowProps) => {
    const { plan,x, y, height, dayWidth } = props;
    let numberOfDays = Math.abs(moment(plan.PlannedStartDate).diff(moment(plan.PlannedEndDate), 'days'));
    let colour;
    if(plan.Title==="Abc")
      colour="#74992e";
    let taskRowStyle: React.CSSProperties = {
      top: y,
      left: x,
      height: (height - 4) as number,
      width: (dayWidth * numberOfDays) + numberOfDays,
      backgroundColor:colour,
    };
  


    return (
      <div className={styles.taskRow} style={taskRowStyle}>
      </div>
    );
    
  }

  export default PlansRow;