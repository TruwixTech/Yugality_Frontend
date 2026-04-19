"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const times = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
  "05:00 PM", "05:30 PM",
];

function getWeekDates(baseDate) {
  const start = new Date(baseDate);
  const dayOfWeek = start.getDay();
  const monday = new Date(start);
  monday.setDate(start.getDate() - ((dayOfWeek + 6) % 7));

  const dates = [];
  for (let i = 0; i < 5; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    dates.push({
      day: dayNames[d.getDay()],
      date: d.getDate(),
      month: d.getMonth(),
      year: d.getFullYear(),
      full: d,
    });
  }
  return dates;
}

export default function DemoCalendar() {
  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const baseDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + weekOffset * 7);
    return d;
  }, [weekOffset]);

  const dates = useMemo(() => getWeekDates(baseDate), [baseDate]);

  const headerMonth = `${monthNames[dates[0].month]} ${dates[0].year}`;

  return (
    <div className="w-full rounded-2xl border border-colordark/20 overflow-hidden bg-white shadow-lg">
      <div className="p-8 border-b border-colordark/10">
        <h3 className="text-[1.0625rem] font-semibold text-colordark tracking-tight mb-1">Select Date & Time</h3>
        <p className="text-[14px] text-colordark/60">30 min call with our experts</p>
      </div>

      <div className="p-8 flex flex-col gap-6">
        <div>
           <div className="flex justify-between items-center mb-6">
             <h4 className="text-[15px] font-medium text-colordark/80">{headerMonth}</h4>
             <div className="flex gap-2">
               <button
                 onClick={() => { setWeekOffset(w => w - 1); setSelectedDate(null); setSelectedTime(null); }}
                 className="w-8 h-8 rounded-full border border-colordark/15 flex items-center justify-center text-colordark/50 hover:text-colordark hover:border-colordark/30 transition-all duration-200"
               >
                 ‹
               </button>
               <button
                 onClick={() => { setWeekOffset(w => w + 1); setSelectedDate(null); setSelectedTime(null); }}
                 className="w-8 h-8 rounded-full border border-colordark/15 flex items-center justify-center text-colordark/50 hover:text-colordark hover:border-colordark/30 transition-all duration-200"
               >
                 ›
               </button>
             </div>
           </div>
           
           <div className="grid grid-cols-5 gap-3">
             {dates.map((d, i) => (
               <button 
                 key={i}
                 onClick={() => { setSelectedDate(d.date); setSelectedTime(null); }}
                 className={`flex flex-col items-center justify-center py-4 rounded-xl border transition-all duration-300 ${
                   selectedDate === d.date 
                     ? "bg-linear-to-br from-blue-from to-blue-to text-white border-blue-from shadow-sm shadow-blue-from/20" 
                     : "bg-transparent border-colordark/10 text-colordark hover:bg-colordark/5 hover:border-colordark/20"
                 }`}
               >
                 <span className="text-[11px] uppercase mb-1 opacity-60 font-medium">{d.day}</span>
                 <span className="text-[18px] font-medium">{d.date}</span>
               </button>
             ))}
           </div>
        </div>

        {selectedDate && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="pt-6 border-t border-colordark/10"
          >
            <h4 className="text-[15px] font-medium text-colordark/80 mb-4">Available Times</h4>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 max-h-[240px] overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-[3px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-colordark/20 [&::-webkit-scrollbar-thumb]:rounded-full" style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(15,15,12,0.2) transparent" }}>
              {times.map((t, i) => (
                <button 
                  key={i}
                  onClick={() => setSelectedTime(t)}
                  className={`py-3 rounded-xl text-[14px] font-medium border transition-all duration-300 ${
                    selectedTime === t 
                      ? "bg-linear-to-br from-blue-from to-blue-to text-white border-blue-from" 
                      : "bg-transparent border-colordark/15 text-colordark hover:border-colordark/30"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            
            {selectedTime && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8"
              >
                <button className="w-full h-12 rounded-xl bg-linear-to-r from-blue-from to-blue-to text-white text-[15px] font-semibold transition-all duration-300 hover:shadow-[0_4px_15px_-3px_rgba(59,130,246,0.4)] shadow-sm">
                  Confirm Booking
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
