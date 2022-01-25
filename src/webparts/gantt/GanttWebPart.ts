import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'GanttWebPartStrings';
import Gantt from './components/Gantt';
import { IGanttProps } from './components/IGanttProps';

export interface IGanttWebPartProps {
  description: string;
}

export default class GanttWebPart extends BaseClientSideWebPart<IGanttWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IGanttProps> = React.createElement(
      Gantt,
      {
        description: this.properties.description,
        plans:[{
          Title:"Abc",
          ProjectID:"123",
          PlannedStartDate: new Date().toISOString(),
          PlannedEndDate:new Date(new Date().getTime()+(7*24*60*60*1000)).toISOString(),
          ActualStartDate:new Date().toISOString(),
          ActualEndDate:new Date().toISOString(),
          Responsibility: "Ankan",
          Allocation: "20",
          Key:"0"
        },{
          Title:"CDE",
          ProjectID:"123",
          PlannedStartDate: new Date(new Date().getTime()+(8*24*60*60*1000)).toISOString(),
          PlannedEndDate:new Date(new Date().getTime()+(13*24*60*60*1000)).toISOString(),
          ActualStartDate:new Date().toISOString(),
          ActualEndDate:new Date().toISOString(),
          Responsibility: "Jyoti",
          Allocation: "20",
          Key:"0"
        },
        {
          Title:"Abc",
          ProjectID:"123",
          PlannedStartDate: new Date().toISOString(),
          PlannedEndDate:new Date(new Date().getTime()+(2*24*60*60*1000)).toISOString(),
          ActualStartDate:new Date().toISOString(),
          ActualEndDate:new Date().toISOString(),
          Responsibility: "Ankan",
          Allocation: "20",
          Key:"0"
        }]
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
