import React from 'react';

const Input = ({value, width, required, hasLabel, label, onClick, onFocus, labelClasses, containerClasses, icon, iconClasses, inputClasses, placeholder, inputInvalid, validationMessage, changeHandler, blurHandler, type, name, id, multiple}) => {
    return (
        <React.Fragment>
            <div style={{ width: width ? `${width}%` : ''}} className={`input ${containerClasses??''} ${inputInvalid ? 'input__error__container' : ''}`}>
                {hasLabel ? <p className={`input__label ${labelClasses??''}`}>{label ? label : name}{required ? '*' : ''}</p> : null}
            {icon && <img src={icon} alt="input-icon" className={`input__icon ${iconClasses??''}`} />}
                <input 
                required={required}
                multiple={multiple}
                value={value}
                onClick={onClick}
                onFocus={onFocus}
                onChange={changeHandler ? changeHandler : () => {}} 
                onBlur={blurHandler ? blurHandler : () => {}} 
                type={type ? type : 'text'} 
                name={name ? name : ''}
                id={id ? id : Math.random()}
                className={`input__main ${inputClasses ? inputClasses : ''} ${inputInvalid ? 'input__error' : ''}`} 
                placeholder={placeholder??''} />
                {inputInvalid ? 
                <span className="input__error__span">
                    {validationMessage}
                </span> : null}
            </div>
           
        </React.Fragment>
    );
}

export default Input;