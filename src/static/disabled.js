export function enableBtn(btn)
{
    btn.classList.remove('disabled');
    btn.disabled = false;
}

export function disableBtn(btn)
{
    btn.classList.add('disabled');
    btn.disabled = true;
}