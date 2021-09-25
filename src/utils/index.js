export function toggleTheme(checked) {
    let r = document.querySelector(':root');

    if (checked) {
        r.style.setProperty('--background', '#f0f7f4');
        r.style.setProperty('--elements', '#b0bfb6');
        r.style.setProperty('--nestedElements', '#4d5651');
        r.style.setProperty('--text', '#090b0a');
    } else if (!checked) {
        r.style.setProperty('--background', '#090b0a');
        r.style.setProperty('--elements', '#4d5651');
        r.style.setProperty('--nestedElements', '#b0bfb6');
        r.style.setProperty('--text', '#f0f7f4');
    }
}