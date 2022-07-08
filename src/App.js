import React, { useEffect, useState } from 'react';
import { Twitter } from 'react-bootstrap-icons';

import Button from './components/Button';

import './App.css';



function enableBtn(btn)
{
    btn.classList.remove('disabled');
    btn.disabled = false;
}

function disableBtn(btn)
{
    btn.classList.add('disabled');
    btn.disabled = true;
}


function App()
{
    const [count, setCount] = useState(0);
    const [lastCount, setLastCount] = useState(count);
    const [highestCount, setHighesttCount] = useState(0);

    // Auto count
    const [isCounting, setCounting] = useState(false);
    const [startOrContinue, setStartOrContinue] = useState('Start auto count');

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
            const btn_increase = document.querySelector('#increase');
            enableBtn(btn_increase);
            return;
        }
    }

    const autoCount = () => {
        const btn_increase = document.querySelector('#increase');
        const btn_decrease = document.querySelector('#decrease');
        const btn_reset = document.querySelector('#reset');

        disableBtn(btn_increase);
        disableBtn(btn_decrease);
        
        if (count >= 1)
        {
            enableBtn(btn_reset);
            setStartOrContinue('Continue');
        }

        if (!isCounting)
        {
            setCounting(true);
        }
        else
        {
            setCounting(false);
            enableBtn(btn_increase);
        }
    }

    const reset = () => {
        setLastCount(count);
        setCounting(false);
        setStartOrContinue('Start auto count');

        localStorage.setItem('lastCount', count);

        if (count > highestCount)
        {
            setHighesttCount(count);
            localStorage.setItem('highestCount', count);
        }
        setCount(0);

        const btn_increase = document.querySelector('#increase');
        enableBtn(btn_increase);
    }

    const clearHistory = () => {
        if (lastCount !== 0 || highestCount !== 0)
        {
            setLastCount(0);
            setHighesttCount(0);
            localStorage.setItem('lastCount', 0);
            localStorage.setItem('highestCount', 0);
        }
    }

    // First render
    useEffect(() => {
        document.querySelectorAll('button').forEach(btn => {
            btn.disabled = true;
        });

        const btn_increase = document.querySelector('#increase');
        const btn_auto = document.querySelector('#auto');

        enableBtn(btn_increase);
        enableBtn(btn_auto);

        const value = localStorage.getItem('value');
        const last_count = localStorage.getItem('lastCount');
        const highest_count = localStorage.getItem('highestCount');

        if (value)
        {
            setCount(Number(value));
        }

        if (last_count)
        {
            setLastCount(Number(last_count));
        }

        if (highest_count)
        {
            setHighesttCount(highest_count);
        }
        
    }, []);

    // Re-render anytime when changes detected
    useEffect(() => {
        const btn_decrease = document.querySelector('#decrease');
        const btn_reset = document.querySelector('#reset');

        if (count > 0)
        {
            enableBtn(btn_decrease);
            enableBtn(btn_reset);
        }
        else
        {
            disableBtn(btn_decrease);
            disableBtn(btn_reset);
        }
    });

    // Re-render only when count changes
    useEffect(() => {
        localStorage.setItem('value', count);
    }, [count]);

    return (
        <React.Fragment>
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
                        title={isCounting ? 'Stop automatic counting' : 'Click to start automatic count'}
                        handleClick={autoCount}
                    />
                </section>
                <section className='history-container'>
                    <History lastCount={lastCount} HighestCount={highestCount} clearHistory={clearHistory} />
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
                title='Add count'
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
                <p>Total last count</p>
                <p>{props.lastCount}</p>
            </div>
            <div className='flex history'>
                <p>Highest count</p>
                <p>{props.HighestCount}</p>
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