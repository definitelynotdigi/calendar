const calendar = document.getElementById('calendar');
    const currentMonthElement = document.getElementById('currentMonth');
    let currentDate = new Date();

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Function to render the calendar days
    function renderCalendar() {
        // Clear current calendar
        calendar.innerHTML = '';

        // Set the month and year title
        currentMonthElement.textContent = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

        // Render Days of Week
        daysOfWeek.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.classList.add('calendar-header');
            dayElement.textContent = day;
            calendar.appendChild(dayElement);
        });

        // Get the first day of the current month (0 = Sunday, 6 = Saturday)
        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

        // Get the number of days in the current month
        const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

        // Fill empty cells before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.classList.add('calendar-day', 'disabled');
            calendar.appendChild(emptyDay);
        }

        // Fill the calendar with the correct day numbers
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('calendar-day');
            dayElement.textContent = day;

            // Add click event to each day
            dayElement.addEventListener('click', () => {
                alert(`You selected: ${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`);
            });

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