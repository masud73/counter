import React, { useEffect, useState } from 'react';
import { Twitter } from 'react-bootstrap-icons';

import Button from './components/Button';
import Modal from './components/Modal';
import { enableBtn, disableBtn } from './static/disabled';
import './App.css';



function App()
{
    const [count, setCount] = useState(0);
    const [lastCount, setLastCount] = useState(count);
    const [highestCount, setHighestCount] = useState(0);
    const [allCount, setAllCount] = useState(0);
    const [speedValue, setSpeedValue] = useState(1000);

    const [isCounting, setCounting] = useState(false);
    const [startOrContinue, setStartOrContinue] = useState('Start auto count');

    const [btnIncrease, setBtnIncrease] = useState(null);
    const [btnDecrease, setBtnDecrease] = useState(null);


    const increase = () => {
        setCount((prevcount) => prevcount + 1);
    }

    const decrease = () => {
        if (count !== 0)
        {
            setCount((prevcount) => prevcount -1);
        }
        else
        {
            return;
        }
    }

    const reset = () => {
        setLastCount(count);
        setAllCount((prevcount) => prevcount + count);
        setCounting(false);
        setSpeedValue(1000);
        setStartOrContinue('Start auto count');

        localStorage.setItem('lastCount', count);
        localStorage.setItem('allCount', allCount + count);

        if (count > highestCount)
        {
            setHighestCount(count);
            localStorage.setItem('highestCount', count);
        }

        setCount(0);
        enableBtn(btnIncrease);
    }

    const autoCount = () => {
        if (!isCounting && count <= 0)
        {
            document.querySelector('.modal').style.display = 'flex';
        }

        if (isCounting)
        {
            setStartOrContinue('Continue');
            setCounting(false);
            enableBtn(btnIncrease);
        }

        if (!isCounting && count >= 1)
        {
            setCounting(true);
            disableBtn(btnDecrease);
            disableBtn(btnIncrease);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        document.querySelector('.modal').style.display = 'none';
        
        disableBtn(btnIncrease);
        disableBtn(btnDecrease);
        

        if (!isCounting)
        {
            setCounting(true);
            disableBtn(btnDecrease);
        }
        else
        {
            setCounting(false);
            enableBtn(btnIncrease);
        }
    }

    const handleChange = (event) => {
        setSpeedValue(event.target.value);
    }

    const clearHistory = () => {
        if (lastCount !== 0 || highestCount !== 0 || allCount !== 0)
        {
            setLastCount(0);
            setAllCount(0);
            setHighestCount(0);
            localStorage.setItem('lastCount', 0);
            localStorage.setItem('highestCount', 0);
            localStorage.setItem('allCount', 0);
        }
    }

    // First render
    useEffect(() => {
        document.querySelectorAll('button').forEach(btn => {
            btn.disabled = true;
        });

        const btn_increase = document.querySelector('#increase');
        const btn_decrease = document.querySelector('#decrease');
        const btn_auto = document.querySelector('#auto');
        const btn_start = document.querySelector('#btn-start');

        setBtnIncrease(btn_increase);
        setBtnDecrease(btn_decrease);

        enableBtn(btn_increase);
        enableBtn(btn_auto);
        enableBtn(btn_start);

        const value = localStorage.getItem('value');
        const last_count = localStorage.getItem('lastCount');
        const highest_count = localStorage.getItem('highestCount');
        const all_count = localStorage.getItem('allCount');

        if (value) setCount(Number(value));
        if (last_count) setLastCount(Number(last_count));
        if (highest_count) setHighestCount(highest_count);
        if (all_count) setAllCount(Number(all_count));

    }, []);

    // Re-render whenever change detected
    useEffect(() => {
        const btn_decrease = document.querySelector('#decrease');
        const btn_reset = document.querySelector('#reset');

        if (count > 0)
        {
            if (!isCounting) enableBtn(btn_decrease);
            enableBtn(btn_reset);
        }
        else
        {
            disableBtn(btn_decrease);
            disableBtn(btn_reset);
        }
    });

    // Re-render only when count change
    useEffect(() => {
        localStorage.setItem('value', count);
    }, [count]);

    // Re-render only when isCounting change
    useEffect(() => {
        if (isCounting)
        {
            var timer = setInterval(() => {
                setCount((prevcount) => prevcount + 1);
            }, speedValue);
        }
        return () => {
            clearInterval(timer);
        }
    }, [isCounting]);

    return (
        <React.Fragment>
            <Modal handleChange={handleChange} handleSubmit={handleSubmit} speedValue={speedValue} />
            <main>
                <header>
                    <h1>Smart Counter</h1>
                </header>
                <section>
                    <h2>{count}</h2>
                </section>
                <section  className='btns-wrapper'>
                    <Buttons reset={reset} increase={increase} decrease={decrease} />
                </section>
                <section className='flex btn-auto-con'>
                    <Button
                        id='auto'
                        name={isCounting ? 'Stop' : startOrContinue}
                        title={isCounting ? 'Stop auto count' : startOrContinue}
                        handleClick={autoCount}
                    />
                </section>
                <section className='history-container'>
                    <History lastCount={lastCount} HighestCount={highestCount} clearHistory={clearHistory} allCount={allCount} />
                </section>
            </main>
            <Footer />
        </React.Fragment>
    );
}

function Buttons(props)
{
    return (
        <React.Fragment>
            <Button
                id='reset'
                name='Reset'
                title='Reset count to 0'
                class='disabled'
                handleClick={props.reset}
            />
            <Button
                id='decrease'
                name='Decrease'
                title='Decrease count by 1'
                class='disabled'
                handleClick={props.decrease}
            />
            <Button
                id='increase'
                name='Increase'
                title='Add count manually'
                handleClick={props.increase}
            />
        </React.Fragment>
    );
}

function History(props)
{
    return (
        <React.Fragment>
            <div className='flex'>
                <h3>History</h3>
                <span role='button' title='Clear all history (This cannot be reversed)' onClick={props.clearHistory}>Clear history</span>
            </div>
            <div className='flex history'>
                <p>Last count</p>
                <p>{props.lastCount}</p>
            </div>
            <div className='flex history'>
                <p>Highest count</p>
                <p>{props.HighestCount}</p>
            </div>
            <div className='flex history'>
                <p>Total all count</p>
                <p>{props.allCount}</p>
            </div>
        </React.Fragment>
    );
}

function Footer()
{
    return (
        <footer><small>Created by <b>Masud</b>. Follow me on Twitter
        <a href='https://www.twitter.com/____masud' target='_blank' rel='noopener noreferrer'> <Twitter style={{verticalAlign: 'middle'}} /> @____masud</a></small></footer>
    );
}

export default App;