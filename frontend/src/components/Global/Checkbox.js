import React from 'react';

const Checkbox = ({ option, checked, name, id, onClick, optionClasses, activeClasses }) => {

    return (
        <label className={`checkbox__container ${optionClasses ? optionClasses : ''} ${checked && activeClasses ? activeClasses : ''}`}>
            {option}
            <input
                onClick={() => { onClick(option, checked) }}
                onChange={() => {}}
                checked={checked}
                name={name}
                id={id}
                className="checkbox__input"
                type="checkbox" />
            <span className="checkbox__checkmark"></span>
        </label>
    );
}

export default Checkbox;