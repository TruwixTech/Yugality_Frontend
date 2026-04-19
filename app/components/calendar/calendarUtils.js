export const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
export const timeSlots = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, "0")}:00`);

export const isSameDay = (d1, d2) =>
  d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear();

export const getEventsForDate = (events, date) =>
  events.filter(e => isSameDay(e.date, date)).sort((a, b) => a.time.localeCompare(b.time));

export const getWeekDays = (date) => {
  const sunday = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
  return Array.from({ length: 7 }, (_, i) => { const d = new Date(sunday); d.setDate(sunday.getDate() + i); return d; });
};

export const getEventBorderColor = (type) => {
  switch (type) {
    case "hearing": return "#3b82f6";
    case "deadline": return "#ef4444";
    case "meeting": return "#10b981";
    case "task": return "#f59e0b";
    default: return "#6b7280";
  }
};

export const getEventStyles = (type) => {
  switch (type) {
    case "hearing":
      return { bg: "bg-blue-500/[0.12]", text: "text-blue-700", border: "border-blue-500/20", dot: "bg-blue-500", hoverBg: "hover:bg-blue-500/[0.18]" };
    case "deadline":
      return { bg: "bg-red-500/[0.12]", text: "text-red-700", border: "border-red-500/20", dot: "bg-red-500", hoverBg: "hover:bg-red-500/[0.18]" };
    case "meeting":
      return { bg: "bg-emerald-500/[0.12]", text: "text-emerald-700", border: "border-emerald-500/20", dot: "bg-emerald-500", hoverBg: "hover:bg-emerald-500/[0.18]" };
    case "task":
      return { bg: "bg-amber-500/[0.12]", text: "text-amber-700", border: "border-amber-500/20", dot: "bg-amber-500", hoverBg: "hover:bg-amber-500/[0.18]" };
    default:
      return { bg: "bg-gray-500/[0.12]", text: "text-gray-700", border: "border-gray-500/20", dot: "bg-gray-500", hoverBg: "hover:bg-gray-500/[0.18]" };
  }
};

export const getHeaderText = (view, currentDate) => {
  if (view === "day") return currentDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
  if (view === "week") {
    const days = getWeekDays(currentDate);
    const s = days[0], e = days[6];
    return s.getMonth() === e.getMonth()
      ? `${monthNames[s.getMonth()]} ${s.getDate()} - ${e.getDate()}, ${s.getFullYear()}`
      : `${monthNames[s.getMonth()]} ${s.getDate()} - ${monthNames[e.getMonth()]} ${e.getDate()}, ${s.getFullYear()}`;
  }
  return `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
};
