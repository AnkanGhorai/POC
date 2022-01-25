import * as React from "react";
import { IProjectsPlan } from "../models/IProjectsPlan";
import {Text } from 'office-ui-fabric-react';
import styles from "../components/Gantt.module.scss";


interface IListItemProps {
    plans: IProjectsPlan;
    Key: number; 
  }
  
  const ProjectPlanItem = (props: IListItemProps) => {
    const { plans,Key} = props;
    return (      
      <div className={styles.planListItem}>
        <Text variant='smallPlus' onClick={(event) => {event.stopPropagation(); }} >
        {plans.ProjectID}</Text>
      </div>
    );
  };
  
  export default ProjectPlanItem;