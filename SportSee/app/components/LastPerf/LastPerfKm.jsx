import { useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function LastPerf({ userActivity }) {
  const [offset, setOffset] = useState(0);

  if (!userActivity || userActivity.length === 0) {
    return <div>Pas de données</div>;
  }

  // Prendre 4 courses
  const endIndex = userActivity.length - offset * 4;
  const periodRuns = userActivity.slice(Math.max(0, endIndex - 4), endIndex);

  // Calculer la moyenne
  const totalKm = periodRuns.reduce((sum, run) => sum + run.distance, 0);
  const avgKm = (totalKm / 4).toFixed(1);

  // Dates
  const startDate = periodRuns[0]?.date || "";
  const endDate = periodRuns[periodRuns.length - 1]?.date || "";

  // Données graphique
  const data = periodRuns.map((run, i) => ({
    name: `S${i + 1}`,
    km: run.distance,
  }));

  return (
    <div className="p-5 w-2/5 bg-[#FBFBFB] rounded-xl">
      {/* Header */}
      <div className="flex justify-between mb-5">
        <div>
          <h3 className="text-2xl font-bold text-[#0B23F4]">
            {avgKm}km en moyenne
          </h3>
          <p className="text-[#707070]">
            Total des kilomètres 4 dernières semaines
          </p>
        </div>

        {/* Navigation */}
        <div className="flex gap-2.5 items-center">
          <button
            onClick={() => setOffset(offset + 1)}
            disabled={endIndex - 4 <= 0}
            className="px-1 py-1 cursor-pointer border border-black-500 rounded-xl"
          >
            <IoChevronBack />
          </button>
          <span>
            {startDate} - {endDate}
          </span>
          <button
            onClick={() => setOffset(offset - 1)}
            disabled={offset <= 0}
            className="px-1 py-1 cursor-pointer border border-black-500 rounded-xl"
          >
            <IoChevronForward />
          </button>
        </div>
      </div>

      {/* Graphique */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip cursor={false} />
          <Legend iconType="circle" verticalAlign="bottom" align="left" />
          <Bar dataKey="km" barSize={15} radius={[8, 8, 0, 0]} fill="#B6BDFC" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
