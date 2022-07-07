import React, { useEffect, useState } from 'react';
import Button from './components/Button';

import './App.css';



function App()
{
    const [count, setCount] = useState(0);

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
            return false;
        }
    }

    const reset = () => {
        setCount(0);
    }

    useEffect(() => {
        document.querySelectorAll('button').forEach(btn => {
            btn.disabled = true;
        },[]);
        document.querySelector('#increase').disabled = false;

        const btn_decrease = document.querySelector('#decrease');
        const btn_reset = document.querySelector('#reset');

        if (count > 0)
        {
            btn_decrease.disabled = false;
            btn_reset.disabled = false;
            btn_decrease.classList.remove('disabled');
            btn_reset.classList.remove('disabled');
        }
        else
        {
            btn_decrease.disabled = true;
            btn_reset.disabled = true;
            btn_decrease.classList.add('disabled');
            btn_reset.classList.add('disabled');
        }

    });

    return (
        <React.Fragment>
            <main>
                <header>
                    <h1>Smart Counter</h1>
                </header>
                <section>
                    <h2>{count}</h2>
                </section>
                <section className='btns-wrapper'>
                    <Button
                        id='reset'
                        name='Reset'
                        title='Reset count to 0'
                        class='disabled'
                        handleClick={reset}
                    />
                    <Button
                        id='decrease'
                        name='Decrease'
                        title='Decrease count by 1'
                        class='disabled'
                        handleClick={decrease}
                    />
                    <Button
                        id='increase'
                        name='Increase'
                        title='Add count'
                        handleClick={increase}
                    />
                </section>
            </main>
            <footer><small>Created by <b>Masud</b>. Follow me on Twitter <a href='https://www.twitter.com/____masud'>@____masud</a></small></footer>
        </React.Fragment>
    );
}

export default App;