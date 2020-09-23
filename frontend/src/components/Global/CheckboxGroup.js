import React from 'react';
import Checkbox from './Checkbox';

const CheckboxGroup = (props) => {
    return (
        <div className={`checkbox-group ${props.containerClasses ? props.containerClasses : ''}`}>
            {props.options && props.options.length && props.options.map((option, i) => {
             const isChecked = props.checked && props.checked.includes(option);
             return <Checkbox activeClasses={props.activeClasses ? props.activeClasses : ''} optionClasses={props.optionClasses ? props.optionClasses : ''} key={i} onClick={props.onClick} checked={isChecked} option={option} name={props.name} id={props.id}  />;
            })   
            }
        </div>
    );
}

export default CheckboxGroup;