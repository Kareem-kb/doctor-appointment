"use client";

import React, { useState, useEffect, useRef } from "react";

const CustomDatePicker = ({ startDate, setStartDate }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(startDate);
  const datePickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target)
      ) {
        setShowDatePicker(false);
        setShowTimePicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowDatePicker(false);
    setShowTimePicker(true);
  };

  const handleTimeClick = (time) => {
    const updatedDate = new Date(selectedDate);
    updatedDate.setHours(time.getHours(), time.getMinutes());
    setStartDate(updatedDate);
    setShowTimePicker(false);
  };

  const generateTimes = () => {
    let times = [];
    for (let hour = 9; hour < 20; hour++) {
      times.push(new Date(0, 0, 0, hour, 0));
      times.push(new Date(0, 0, 0, hour, 30));
    }
    return times;
  };

  const renderDays = (month, year) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startDay = new Date(year, month, 1).getDay();
    const now = new Date();

    let days = [];

    // Previous month empty slots
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isPast = date < new Date(now.setHours(0, 0, 0, 0));
      const isWeekend = date.getDay() === 5 || date.getDay() === 6;

      days.push(
        <div
          key={day}
          className={`p-2 text-center ${
            isPast || isWeekend
              ? "cursor-not-allowed text-gray-400"
              : "duration-400 cursor-pointer rounded transition-all ease-in-out hover:bg-primary"
          }`}
          onClick={
            !isPast && !isWeekend ? () => handleDateClick(date) : undefined
          }
        >
          {day}
        </div>,
      );
    }

    return days;
  };

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  return (
    <div className="relative" ref={datePickerRef}>
      <input
        type="text"
        className="border-gray-300bg-transparent height-5 w-full  resize-none rounded  border-2 px-2 py-1.5 leading-6 outline-none transition-all duration-200 ease-linear focus:border-primary focus:placeholder-opacity-100 focus:ring-2"
        value={startDate ? startDate.toLocaleString() : ""}
        onFocus={() => setShowDatePicker(true)}
        readOnly
      />
      {showDatePicker && (
        <div className="absolute z-10 mt-2 w-full rounded bg-white p-4 shadow-lg">
          <div className="text-center font-bold">
            {new Date(currentYear, currentMonth).toLocaleString("default", {
              month: "long",
            })}
          </div>
          <div className="mt-2 grid grid-cols-7 gap-1">
            {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
              <div key={day} className="p-2 text-center font-bold">
                {day}
              </div>
            ))}
            {renderDays(currentMonth, currentYear)}
          </div>
          <div className="mt-4 text-center font-bold">
            {new Date(currentYear, currentMonth + 1).toLocaleString("default", {
              month: "long",
            })}
          </div>
          <div className="mt-2 grid grid-cols-7 gap-1">
            {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
              <div key={day} className="p-2 text-center font-bold">
                {day}
              </div>
            ))}
            {renderDays(currentMonth + 1, currentYear)}
          </div>
        </div>
      )}
      {showTimePicker && (
        <div className="absolute z-10 mt-2 w-full rounded bg-white p-4 shadow-lg">
          <div className="grid grid-cols-4 gap-2">
            {generateTimes().map((time, index) => (
              <div
                key={index}
                className="duration-400 cursor-pointer rounded  p-2 transition-all ease-in-out hover:bg-primary "
                onClick={() => handleTimeClick(time)}
              >
                {time.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDatePicker;
