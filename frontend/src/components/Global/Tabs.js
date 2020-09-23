import React from 'react';

const Tabs = (props) => {
    return (
        <div className="tabs">
            {props.tabs && props.tabs.length && props.tabs.map(tab => {
                return (
                    <h1 key={tab.name} onClick={() => { props.setActiveTab(tab.name)}} className={`tabs__option ${tab.active ? 'tabs__option--active' : ''}`}>
                        {tab.name}
                    </h1>
                );
            })}
        </div>
    )
}

export default Tabs;