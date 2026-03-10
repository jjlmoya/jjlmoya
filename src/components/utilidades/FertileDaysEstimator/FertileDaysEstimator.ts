export function initFertileDaysEstimator() {
    let currentStep = 1;
    let selectedDate: Date | null = null;
    const viewDate = new Date();
    viewDate.setDate(1);

    const container = document.querySelector(".fertile-days-container");
    const step1El = document.getElementById("step-1");
    const step2El = document.getElementById("step-2");
    const indicator1 = document.getElementById("indicator-1");
    const indicator2 = document.getElementById("indicator-2");

    const cycleLengthInput = document.getElementById("cycle-length") as HTMLInputElement;
    const cycleValueDisplay = document.getElementById("cycle-value");
    const ovulationDateEl = document.getElementById("ovulation-date");
    const fertileRangeEl = document.getElementById("fertile-range");
    const nextPeriodEl = document.getElementById("next-period");
    const calendarGrid = document.getElementById("calendar-grid");
    const calendarMonthYear = document.getElementById("calendar-month-year");
    const prevMonthBtn = document.getElementById("prev-month");
    const nextMonthBtn = document.getElementById("next-month");

    const initialCalendarGrid = document.getElementById("initial-calendar-grid");
    const initialMonthYear = document.getElementById("initial-month-year");
    const initialPrevBtn = document.getElementById("initial-prev-month");
    const initialNextBtn = document.getElementById("initial-next-month");

    function updateCalculations() {
        if (!selectedDate || !cycleLengthInput) return;

        const cycleLength = parseInt(cycleLengthInput.value);
        if (cycleValueDisplay) cycleValueDisplay.innerHTML = `${cycleLength} <span>días</span>`;

        const ovulationDate = new Date(selectedDate);
        ovulationDate.setDate(selectedDate.getDate() + (cycleLength - 14));

        const fertileStart = new Date(ovulationDate);
        fertileStart.setDate(ovulationDate.getDate() - 5);

        const nextPeriod = new Date(selectedDate);
        nextPeriod.setDate(selectedDate.getDate() + cycleLength);

        const dtf = new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "long" });

        if (ovulationDateEl) ovulationDateEl.textContent = dtf.format(ovulationDate);
        if (fertileRangeEl) {
            fertileRangeEl.textContent = `${dtf.format(fertileStart)} al ${dtf.format(ovulationDate)}`;
        }
        if (nextPeriodEl) nextPeriodEl.textContent = dtf.format(nextPeriod);

        renderCalendars();
    }

    function renderCalendars() {
        renderGrid(initialCalendarGrid, initialMonthYear);
        renderGrid(calendarGrid, calendarMonthYear);
    }

    function renderGrid(grid: HTMLElement | null, monthYearEl: HTMLElement | null) {
        if (!grid || !monthYearEl) return;

        grid.innerHTML = "";
        const year = viewDate.getFullYear();
        const month = viewDate.getMonth();

        monthYearEl.textContent = new Intl.DateTimeFormat("es-ES", {
            month: "long",
            year: "numeric",
        }).format(viewDate);

        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const startOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

        const dayNames = ["Lun", "Mar", "Mié", "Juv", "Vie", "Sáb", "Dom"];
        dayNames.forEach((day) => {
            const header = document.createElement("div");
            header.className = "calendar-day-header";
            header.textContent = day;
            grid.appendChild(header);
        });

        for (let i = 0; i < startOffset; i++) {
            const emptyDay = document.createElement("div");
            emptyDay.className = "calendar-day empty";
            grid.appendChild(emptyDay);
        }

        const cycleLength = parseInt(cycleLengthInput ? cycleLengthInput.value : "28");
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        for (let d = 1; d <= daysInMonth; d++) {
            const currentDay = new Date(year, month, d);
            currentDay.setHours(0, 0, 0, 0);

            const dayEl = document.createElement("div");
            dayEl.className = "calendar-day";
            dayEl.textContent = d.toString();

            if (currentDay.getTime() === today.getTime()) {
                dayEl.classList.add("today");
            }

            if (selectedDate && currentDay.getTime() === selectedDate.getTime()) {
                dayEl.classList.add("selected-period");
            }

            if (selectedDate) {
                const ovulationDate = new Date(selectedDate);
                ovulationDate.setDate(selectedDate.getDate() + (cycleLength - 14));

                const fertileStart = new Date(ovulationDate);
                fertileStart.setDate(ovulationDate.getDate() - 5);

                const nextPeriod = new Date(selectedDate);
                nextPeriod.setDate(selectedDate.getDate() + cycleLength);

                const nextPeriodEnd = new Date(nextPeriod);
                nextPeriodEnd.setDate(nextPeriod.getDate() + 4);

                if (currentDay.getTime() === ovulationDate.getTime()) {
                    dayEl.classList.add("ovulation");
                } else if (currentDay >= fertileStart && currentDay < ovulationDate) {
                    dayEl.classList.add("fertile");
                } else if (currentDay >= nextPeriod && currentDay <= nextPeriodEnd) {
                    dayEl.classList.add("period");
                }
            }

            dayEl.addEventListener("click", () => {
                selectedDate = new Date(currentDay);
                if (currentStep === 1) {
                    goToStep2();
                } else {
                    updateCalculations();
                }
            });

            grid.appendChild(dayEl);
        }
    }

    function goToStep2() {
        currentStep = 2;
        if (step1El) step1El.classList.add("hidden");
        if (step2El) step2El.classList.add("active");
        if (indicator1) indicator1.classList.remove("active");
        if (indicator2) indicator2.classList.add("active");
        updateCalculations();
    }

    cycleLengthInput?.addEventListener("input", updateCalculations);

    [prevMonthBtn, initialPrevBtn].forEach(btn =>
        btn?.addEventListener("click", () => {
            viewDate.setMonth(viewDate.getMonth() - 1);
            renderCalendars();
        })
    );

    [nextMonthBtn, initialNextBtn].forEach(btn =>
        btn?.addEventListener("click", () => {
            viewDate.setMonth(viewDate.getMonth() + 1);
            renderCalendars();
        })
    );

    renderCalendars();
}
