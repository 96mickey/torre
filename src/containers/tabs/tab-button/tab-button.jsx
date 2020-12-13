import React from 'react';

export const TabButtons = ({buttons, changeTab, activeTab}) =>{ 
  return(
    <div className="tab-buttons">
    {buttons.map(button => {
       return <button 
                key={button}
                className={button === activeTab? 'active': ''} 
                onClick={()=>changeTab(button)}
                >
                    {button}
            </button>
    })}
    </div>
  )
}
