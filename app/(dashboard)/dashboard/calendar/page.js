"use client"
import { useState, useEffect, useCallback } from "react";
import CalendarHeader from "@/app/components/calendar/CalendarHeader";
import DayView from "@/app/components/calendar/DayView";
import WeekView from "@/app/components/calendar/WeekView";
import MonthView from "@/app/components/calendar/MonthView";
import EventDetailsPanel from "@/app/components/calendar/EventDetailsPanel";
import DayEventsPanel from "@/app/components/calendar/DayEventsPanel";
import AddEventModal from "@/app/components/calendar/AddEventModal";
import { getEventsForDate, getWeekDays, getHeaderText, isSameDay } from "@/app/components/calendar/calendarUtils";
import { Loader2 } from "lucide-react";

const emptyEvent = { title: "", description: "", date: "", time: "", endTime: "", location: "", type: "meeting" };

export default function CalendarPage() {
  const [view, setView] = useState("day");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newEvent, setNewEvent] = useState(emptyEvent);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isClosingEventDetails, setIsClosingEventDetails] = useState(false);
  const [showDayEvents, setShowDayEvents] = useState(false);
  const [selectedDayDate, setSelectedDayDate] = useState(null);
  const [isClosingDayEvents, setIsClosingDayEvents] = useState(false);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/calendar');
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        const mappedEvents = data.map(ev => {
          const start = new Date(ev.startTime);
          const end = new Date(ev.endTime);
          return {
            id: ev._id,
            title: ev.title,
            description: ev.description,
            date: new Date(start.getFullYear(), start.getMonth(), start.getDate()),
            time: `${start.getHours().toString().padStart(2, '0')}:${start.getMinutes().toString().padStart(2, '0')}`,
            endTime: `${end.getHours().toString().padStart(2, '0')}:${end.getMinutes().toString().padStart(2, '0')}`,
            location: ev.location,
            type: ev.EventType || 'meeting'
          };
        });
        console.log(mappedEvents)
        setEvents(mappedEvents);
      }
    } catch (err) {
      console.error("Failed to fetch events", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const dateParam = params.get("date");
      if (dateParam) {
        const [y, m, d] = dateParam.split("-").map(Number);
        if (y && m && d) {
          setCurrentDate(new Date(y, m - 1, d));
          setView("day");
        }
      }
    }
  }, []);

  const navigate = (dir) => {
    const d = currentDate;
    if (view === "day") setCurrentDate(new Date(d.getFullYear(), d.getMonth(), d.getDate() + dir));
    else if (view === "week") setCurrentDate(new Date(d.getFullYear(), d.getMonth(), d.getDate() + dir * 7));
    else setCurrentDate(new Date(d.getFullYear(), d.getMonth() + dir));
  };

  const handleAddEvent = async () => {
    if (!newEvent.title || !newEvent.date || !newEvent.time) return;

    // Convert to UTC ISO Strings
    const start = new Date(newEvent.date);
    const [h1, m1] = newEvent.time.split(":").map(Number);
    start.setHours(h1, m1, 0, 0);

    const end = new Date(newEvent.date);
    const [h2, m2] = (newEvent.endTime || newEvent.time).split(":").map(Number);
    end.setHours(h2, m2, 0, 0);

    try {
      const response = await fetch('/api/calendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newEvent.title,
          description: newEvent.description,
          startTime: start.toISOString(),
          endTime: end.toISOString(),
          location: newEvent.location,
          EventType: newEvent.type
        })
      });

      if (response.ok) {
        await fetchEvents();
        setNewEvent(emptyEvent);
        setShowAddEvent(false);
      } else {
        alert("Failed to create event");
      }
    } catch (err) {
      console.error("Create event error:", err);
    }
  };

  const handleDeleteEvent = async (id) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    try {
      const response = await fetch(`/api/calendar/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setEvents(events.filter(e => e.id !== id));
      } else {
        alert("Failed to delete event");
      }
    } catch (err) {
      console.error("Delete event error:", err);
    }
  };

  const closeEventDetails = () => {
    setIsClosingEventDetails(true);
    setTimeout(() => { setShowEventDetails(false); setIsClosingEventDetails(false); setSelectedEvent(null); }, 300);
  };

  const closeDayEvents = () => {
    setIsClosingDayEvents(true);
    setTimeout(() => { setShowDayEvents(false); setIsClosingDayEvents(false); setSelectedDayDate(null); }, 300);
  };

  const openEventDetails = (event) => { setSelectedEvent(event); setShowEventDetails(true); };

  const eventsForDate = (date) => getEventsForDate(events, date);

  return (
    <div className="h-screen flex flex-col overflow-hidden px-3 py-4 sm:px-5 sm:py-6 lg:px-8 lg:py-8">
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Header - matches dashboard style */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6 shrink-0">
          <div className="shrink-0">
            <h1 className="text-[1.5rem] sm:text-[1.75rem] lg:text-[2rem] font-semibold tracking-[-0.02em] text-colordark mb-0.5 sm:mb-1.5 leading-tight">
              Calendar
            </h1>
            <p className="text-[0.8125rem] sm:text-[0.9375rem] text-colordark/50 font-bold hidden sm:block">{getHeaderText(view, currentDate)}</p>
          </div>
          <CalendarHeader
            view={view}
            currentDate={currentDate}
            headerText={getHeaderText(view, currentDate)}
            onViewChange={setView}
            onPrev={() => navigate(-1)}
            onNext={() => navigate(1)}
            onToday={() => setCurrentDate(new Date())}
            onDateSelect={setCurrentDate}
            onCreateEvent={() => setShowAddEvent(true)}
          />
        </div>

        <div className="flex-1 overflow-hidden">
          {loading ? (
            <div className="h-full flex flex-col items-center justify-center">
              <Loader2 className="w-12 h-12 text-blue-from animate-spin mb-4" />
              <p className="text-colordark/50 font-medium">Loading calendar...</p>
            </div>
          ) : view === "day" && (
            <DayView
              currentDate={currentDate}
              dayEvents={eventsForDate(currentDate)}
              onEventClick={openEventDetails}
              onDeleteEvent={handleDeleteEvent}
            />
          )}
          {!loading && view === "week" && (
            <WeekView
              weekDays={getWeekDays(currentDate)}
              getEventsForDate={eventsForDate}
              onEventClick={openEventDetails}
            />
          )}
          {!loading && view === "month" && (
            <MonthView
              currentDate={currentDate}
              getEventsForDate={eventsForDate}
              onDayClick={(date) => { setSelectedDayDate(date); setShowDayEvents(true); }}
            />
          )}
        </div>
    </div>


      {showEventDetails && selectedEvent && (
        <EventDetailsPanel
          event={selectedEvent}
          isClosing={isClosingEventDetails}
          onClose={closeEventDetails}
          onDelete={() => { handleDeleteEvent(selectedEvent.id); closeEventDetails(); }}
        />
      )}

      {showDayEvents && selectedDayDate && (
        <DayEventsPanel
          date={selectedDayDate}
          events={eventsForDate(selectedDayDate)}
          isClosing={isClosingDayEvents}
          onClose={closeDayEvents}
          onEventClick={(event) => { setSelectedEvent(event); closeDayEvents(); setTimeout(() => setShowEventDetails(true), 300); }}
          onDeleteEvent={handleDeleteEvent}
          onAddEvent={() => { closeDayEvents(); setTimeout(() => setShowAddEvent(true), 300); }}
        />
      )}

      {showAddEvent && (
        <AddEventModal
          newEvent={newEvent}
          onChange={setNewEvent}
          onAdd={handleAddEvent}
          onClose={() => setShowAddEvent(false)}
        />
      )}
    </div>
  );
}
