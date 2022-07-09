import React from "react";
import { XLg } from "react-bootstrap-icons";
import Button from "./Button";


export default function Modal(props)
{
    return (
        <div className="modal flex">
            <div className="modal-content">
                <header className="flex">
                    <h4 className="modal-title">Set auto count</h4>
                    <XLg onClick={() => document.querySelector('.modal').style.display = 'none'} />
                </header>
                <form onSubmit={props.handleSubmit} className='flex'>
                    <label>Speed (in milliseconds)</label>
                    <select value={props.speedValue} onChange={props.handleChange}>
                        <option value='1000'>1000 ms (Default)</option>
                        {speeds.map((speed, index) => (
                            <option value={speed} key={index}>{speed} ms</option>
                        ))}
                    </select>
                    <Button
                        id='btn-start'
                        type='submit'
                        name='Start'
                    />
                </form>
            </div>
        </div>
    );
}

const speeds = [0,50,100,500,1000,1500,2000,3000,5000];