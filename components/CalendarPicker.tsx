import React, { useState } from "react";

interface CalendarPickerProps {
  selectedDate: string;
  onDateSelect: (date: string) => void;
  unavailableDates: string[];
}

export const CalendarPicker: React.FC<CalendarPickerProps> = ({ selectedDate, onDateSelect, unavailableDates }) => {
  const today = new Date();
  const maxDate = new Date(today.getTime() + 16 * 7 * 24 * 60 * 60 * 1000);

  const [displayMonth, setDisplayMonth] = useState<Date>(selectedDate ? new Date(parseInt(selectedDate.split("-")[0]), parseInt(selectedDate.split("-")[1]) - 1) : today);

  const getDaysInMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (year: number, month: number, day: number): string => {
    return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  };

  const isDateDisabled = (year: number, month: number, day: number): boolean => {
    const dateStr = formatDate(year, month, day);
    const dateObj = new Date(year, month - 1, day);
    const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    // Check if today or before (no same-day booking)
    if (dateObj <= todayMidnight) return true;

    // Check if after max date
    if (dateObj > maxDate) return true;

    // Check if in unavailable dates
    if (unavailableDates.includes(dateStr)) return true;

    return false;
  };

  const handlePrevMonth = () => {
    const prevMonth = new Date(displayMonth);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    setDisplayMonth(prevMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(displayMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setDisplayMonth(nextMonth);
  };

  const daysInMonth = getDaysInMonth(displayMonth);
  const firstDay = getFirstDayOfMonth(displayMonth);
  const days: (number | null)[] = Array(firstDay).fill(null);

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const monthName = displayMonth.toLocaleString("default", { month: "long", year: "numeric" });

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      {/* Month/Year Header */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={handlePrevMonth} className="px-3 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
          ←
        </button>
        <h3 className="text-lg font-bold text-slate-900">{monthName}</h3>
        <button onClick={handleNextMonth} className="px-3 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
          →
        </button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 gap-2 mb-3">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center text-xs font-bold text-slate-500">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar days */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => {
          if (day === null) {
            return <div key={`empty-${index}`} />;
          }

          const year = displayMonth.getFullYear();
          const month = displayMonth.getMonth() + 1;
          const isDisabled = isDateDisabled(year, month, day);
          const dateStr = formatDate(year, month, day);
          const isSelected = selectedDate === dateStr;

          return (
            <button
              key={day}
              onClick={() => !isDisabled && onDateSelect(dateStr)}
              disabled={isDisabled}
              className={`
                aspect-square rounded-lg text-sm font-semibold transition-all
                ${isDisabled ? "bg-slate-100 text-slate-400 cursor-not-allowed" : isSelected ? "bg-emerald-600 text-white shadow-md" : "bg-slate-50 text-slate-900 hover:bg-emerald-100 hover:text-emerald-900 cursor-pointer"}
              `}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Selected date display */}
      {selectedDate && (
        <div className="mt-6 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-xs text-amber-700 font-bold">
            {(() => {
              const [year, month, day] = selectedDate.split("-").map(Number);
              const dateObj = new Date(year, month - 1, day);
              const dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][dateObj.getDay()];
              return `Selected: ${dayName}, ${dateObj.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}`;
            })()}
          </p>
        </div>
      )}
    </div>
  );
};
