import React from "react";


export default function Button(props)
{
    return (
        <button
            id={props.id}
            className={props.class}
            style={props.style}
            title={props.title}
            onClick={props.handleClick}
        >
        {props.name}
        </button>
    );
}