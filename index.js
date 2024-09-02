let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');
let header = document.querySelector('.header-2');
menu.addEventListener('click',() =>{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
});

window.onscroll = () =>{
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');

    if(window.scrollY > 150){
        header.classList.add('active');
    }
    else{
        header.classList.remove('active');
    }
}
// Function to initialize or get the end time from local storage
function initializeEndTime() {
    const endTimeKey = 'dealEndTime';
    let endTime = localStorage.getItem(endTimeKey);

    // If no end time is stored, or the countdown is over, set a new end time
    if (!endTime || new Date().getTime() >= parseInt(endTime, 10)) {
        endTime = new Date().getTime() + (2 * 24 * 60 * 60 * 1000); // 2 days in milliseconds
        localStorage.setItem(endTimeKey, endTime);
    }

    return parseInt(endTime, 10);
}

function CountDown() {
    const endTime = initializeEndTime();
    const now = new Date().getTime();
    let gap = endTime - now;

    // If the countdown is over, reset the end time for the next period
    if (gap < 0) {
        // Set new end time for the next 2-day period
        const newEndTime = new Date().getTime() + (2 * 24 * 60 * 60 * 1000);
        localStorage.setItem('dealEndTime', newEndTime);

        // Update the gap for the new end time
        gap = newEndTime - now;
    }

    // Time units in milliseconds
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Calculations
    const d = Math.floor(gap / day);
    const h = Math.floor((gap % day) / hour);
    const m = Math.floor((gap % hour) / minute);
    const s = Math.floor((gap % minute) / second);

    // Display the result with leading zeros if necessary
    document.getElementById('day').innerText = String(d).padStart(2, '0');
    document.getElementById('hour').innerText = String(h).padStart(2, '0');
    document.getElementById('minute').innerText = String(m).padStart(2, '0');
    document.getElementById('second').innerText = String(s).padStart(2, '0');
}

// Update the countdown every second
setInterval(CountDown, 1000);

// Run CountDown once immediately to display the initial time
CountDown();
