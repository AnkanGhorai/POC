import * as React from 'react';
import styles from './Gantt.module.scss';
import { IGanttProps } from './IGanttProps';
import { escape } from '@microsoft/sp-lodash-subset';
import ProjectList from '../subcomponents/ProjectList';
import { IProjectsPlan } from '../models/IProjectsPlan';
import GanttChart from '../subcomponents/GanttChart';

export default class Gantt extends React.Component<IGanttProps, {}> {
  //plans: IProjectsPlan[];
  plans=this.props.plans;
  public render(): React.ReactElement<IGanttProps> {
    return (
      <div className={ styles.gantt }>
        <div className={ styles.container }>
          <div className={styles.body}>
            <div className={styles.leftCol}>
              <div style={{paddingTop: '76px', paddingBottom: '50px'}}>
                <ProjectList 
                  plans={this.plans}></ProjectList>
              </div>            
          </div>
          <div className={styles.rightCol}>
              <div style={{overflowX: 'scroll', borderLeft: 'solid 2px lightblue'}}>
              <GanttChart
                plans={this.plans}/>
              </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}
