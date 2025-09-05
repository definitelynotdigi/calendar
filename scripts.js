const calendar = document.getElementById('calendar');
const currentMonthElement = document.getElementById('currentMonth');
let currentDate = new Date();

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Fixed-date holidays (month-day only, no year)
const fixedHolidays = {
    "01-01": "New Year's Day",
    "02-14": "Valentine's Day",
    "04-09": "Araw ng Kagitingan",
    "05-01": "Labor Day",
    "06-12": "Independence Day",
    "08-21": "Ninoy Aquino Day",
    "11-01": "All Saints' Day",
    "11-02": "All Souls' Day",
    "11-30": "Bonifacio Day",
    "12-08": "Feast of the Immaculate Conception",
    "12-24": "Christmas Eve",
    "12-25": "Christmas Day",
    "12-30": "Rizal Day",
    "12-31": "New Year's Eve"
};

// 🕊 Easter Sunday calculation (Anonymous Gregorian algorithm)
function getEasterDate(year) {
    let f = Math.floor,
        G = year % 19,
        C = f(year / 100),
        H = (C - f(C / 4) - f((8 * C + 13) / 25) + 19 * G + 15) % 30,
        I = H - f(H / 28) * (1 - f(29 / (H + 1)) * f((21 - G) / 11)),
        J = (year + f(year / 4) + I + 2 - C + f(C / 4)) % 7,
        L = I - J,
        month = 3 + f((L + 40) / 44),
        day = L + 28 - 31 * f(month / 4);
    return new Date(year, month - 1, day);
}

// Get movable holidays for a given year
function getMovableHolidays(year) {
    let movable = {};

    // Compute Easter Sunday
    let easter = getEasterDate(year);

    // Maundy Thursday (3 days before Easter)
    let maundyThursday = new Date(easter);
    maundyThursday.setDate(easter.getDate() - 3);

    // Good Friday (2 days before Easter)
    let goodFriday = new Date(easter);
    goodFriday.setDate(easter.getDate() - 2);

    movable[formatDateKey(maundyThursday)] = "Maundy Thursday";
    movable[formatDateKey(goodFriday)] = "Good Friday";

    // National Heroes Day = last Monday of August
    let heroesDay = new Date(year, 7, 31); // Aug 31
    while (heroesDay.getDay() !== 1) { // 1 = Monday
        heroesDay.setDate(heroesDay.getDate() - 1);
    }
    movable[formatDateKey(heroesDay)] = "National Heroes Day";

    return movable;
}

// Format YYYY-MM-DD
function formatDateKey(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

// Function to render the calendar days
function renderCalendar() {
    calendar.innerHTML = '';
    currentMonthElement.textContent = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

    // Render Days of Week
    daysOfWeek.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.classList.add('calendar-header');
        dayElement.textContent = day;
        calendar.appendChild(dayElement);
    });

    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

    // Movable holidays for this year
    const movableHolidays = getMovableHolidays(currentDate.getFullYear());

    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.classList.add('calendar-day', 'disabled');
        calendar.appendChild(emptyDay);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('calendar-day');
        dayElement.textContent = day;

        let dateKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        let monthDay = `${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

        // Check if holiday (fixed or movable)
        if (fixedHolidays[monthDay]) {
            dayElement.classList.add('holiday');
            dayElement.setAttribute('title', fixedHolidays[monthDay]);
        }
        if (movableHolidays[dateKey]) {
            dayElement.classList.add('holiday');
            dayElement.setAttribute('title', movableHolidays[dateKey]);
        }

        calendar.appendChild(dayElement);
    }
}

// Event listeners for navigating between months
document.getElementById('prevMonthBtn').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});
document.getElementById('nextMonthBtn').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

// Initial render
renderCalendar();
