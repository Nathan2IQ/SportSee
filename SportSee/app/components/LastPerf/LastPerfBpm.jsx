import { useState } from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

export default function LastPerfBpm({ userActivity }) {
  const [weekOffset, setWeekOffset] = useState(0);

  if (!userActivity || userActivity.length === 0) {
    return <div>Pas de données</div>;
  }

  // Grouper les courses par semaine
  const getWeekData = () => {
    // Grouper par semaine
    const weeks = {};

    userActivity.forEach((run) => {
      const date = new Date(run.date);
      // Obtenir le lundi de la semaine
      const dayOfWeek = date.getDay();
      const diff = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
      const monday = new Date(date.setDate(diff));
      const weekKey = monday.toISOString().split("T")[0];

      if (!weeks[weekKey]) {
        weeks[weekKey] = [];
      }
      weeks[weekKey].push(run);
    });

    // Convertir en tableau et trier
    const weekArray = Object.entries(weeks)
      .map(([weekStart, runs]) => ({ weekStart, runs }))
      .sort((a, b) => new Date(b.weekStart) - new Date(a.weekStart));

    return weekArray;
  };

  const weeks = getWeekData();
  const currentWeek = weeks[weekOffset];

  if (!currentWeek) {
    return <div>Pas de données pour cette semaine</div>;
  }

  const getDailyData = () => {
    const days = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
    const weekData = [];

    currentWeek.runs.forEach((run) => {
      const date = new Date(run.date);
      let dayIndex = date.getDay() - 1;
      if (dayIndex === -1) dayIndex = 6;

      weekData.push({
        name: days[dayIndex],
        min: run.heartRate.min,
        max: run.heartRate.max,
      });
    });

    return weekData;
  };
  const data = getDailyData();

  // Calculer BPM moyen de la semaine
  const avgBpm = (
    currentWeek.runs.reduce((sum, run) => sum + run.heartRate.average, 0) /
    currentWeek.runs.length
  ).toFixed(0);

  // Dates de début et fin
  const weekStart = currentWeek.weekStart;
  const weekEnd = new Date(currentWeek.weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);

  return (
    <div className="p-5 w-3/5 bg-[#FBFBFB] rounded-lg">
      {/* Header */}
      <div className="flex justify-between mb-5">
        <div>
          <h3 className="text-2xl font-bold text-[#F4320B]">{avgBpm} BPM</h3>
          <p className="text-[#707070]">Fréquence cardiaque moyenne</p>
        </div>

        {/* Navigation */}
        <div className="flex gap-2.5 items-center">
          <button
            onClick={() => setWeekOffset(weekOffset + 1)}
            disabled={weekOffset >= weeks.length - 1}
            className="px-1 py-1 cursor-pointer border border-black-500 rounded-xl"
          >
            <IoChevronBack />
          </button>
          <span>Semaine {weeks.length - weekOffset}</span>
          <button
            onClick={() => setWeekOffset(weekOffset - 1)}
            disabled={weekOffset <= 0}
            className="px-1 py-1 cursor-pointer border border-black-500 rounded-xl"
          >
            <IoChevronForward />
          </button>
        </div>
      </div>

      {/* Graphique */}
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[100, 200]} />
          <Tooltip />
          <Legend iconType="circle" verticalAlign="bottom" align="left" />
          <Bar
            dataKey="min"
            fill="#FCC1B6"
            barSize={15}
            radius={[8, 8, 0, 0]}
            name="Min"
          />
          <Bar
            dataKey="max"
            fill="#F4320B"
            barSize={15}
            radius={[8, 8, 0, 0]}
            name="Max BPM"
          />
          <Line
            type="monotone"
            dataKey="max"
            stroke="#F2F2F2F2"
            strokeWidth={2}
            name="Max BPM"
            dot={{ fill: "#0B23F4", r: 5 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
