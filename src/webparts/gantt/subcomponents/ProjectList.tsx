import { Stack, StackItem } from "office-ui-fabric-react";
import * as React from "react";
import styles from "../components/Gantt.module.scss";
import { IProjectsPlan } from "../models/IProjectsPlan";
import ProjectPlanItem from "./ProjectPlanItem";

interface ITasksListProps {
    plans: IProjectsPlan[];
  }

const TasksList = (props: ITasksListProps) => {
    const { plans} = props;
    let visited=["-1"];
    return (
      <div className={styles.planList}>
        <Stack>
          {plans.map((plan, index) => (
            <StackItem>
              { (visited.find((ele) => ele.valueOf()==(plan.Key).valueOf())) != null?'':
                visited.push(plan.Key)&&
                <ProjectPlanItem 
                plans={plan}
                Key={plan.Key as any as number}/>
              }
            </StackItem>
          ))}
        </Stack>
      </div>
    );
  }
export default TasksList;

