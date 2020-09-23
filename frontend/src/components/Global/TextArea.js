import React from 'react';

const TextArea = (props) => {
    return (
        <div className={`full-width ${props.containerClasses??''}`}>
            {props.label ? 
            <p className="input__label">
                {props.label}
            </p>: null}
            <textarea value={props.value??''} name={props.name} onChange={props.onChange} onBlur={props.onBlur} autoFocus={props.autofocus} placeholder={props.placeholder ? props.placeholder : 'Enter text..'} 
            className={`textarea ${ props.classes??''} ${props.errorLabel ? 'textarea__error' : ''} ${props.settings?.theme === 'dark' ? 'textarea--dark' : ''}`} rows={props.rows ? props.rows : null} />
            {props.errorLabel ?
            <span className="input__error__span">
                {props.errorLabel}
            </span> : null}
        </div>  
       
    );
}

export default TextArea;