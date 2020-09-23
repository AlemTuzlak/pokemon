import React from 'react';
import loader from '../../assets/animations/loader-b.svg';

export default function Button(props) {
    return (
        <button title={props.title??''} disabled={props.disabled ? true : false} 
        name={props.name} onClick={props.onClick} 
        className={`button ${props.disabled ? 'button__disabled' : ''} button--${props.color} ${props.classes ? props.classes : ''}`}>
            {props.loading ? <img src={loader} alt="loader" /> : props.text}
        </button>
    );
}