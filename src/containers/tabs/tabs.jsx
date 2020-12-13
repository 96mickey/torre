import React from 'react';
import { TabButtons } from './tab-button';

export class Tabs extends React.Component{
    state ={
      activeTab: this.props.children[0].props.label
    }

    changeTab = (tab) => {
      this.setState({ activeTab: tab });
    };

    render(){
      const {activeTab} = this.state;
      let content;
      let buttons = [];
      return (
        <div>
          {React.Children.map(this.props.children, child =>{
            buttons.push(child.props.label)
            if (child.props.label === activeTab) {
                content = child.props.children;
            }
          })}
           
          <TabButtons 
            activeTab={activeTab} 
            buttons={buttons} 
            changeTab={this.changeTab}
            />
          <div className="tab-content">{content}</div>
          
        </div>
      );
    }
}

export const Tab = props =>{
  return(
    <React.Fragment>
      {props.children}
    </React.Fragment>
  )
}