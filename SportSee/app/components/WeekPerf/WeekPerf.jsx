import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function WeekPerf({ userActivity, weeklyGoal = 6 }) {
  if (!userActivity?.length) return <div>Pas de données</div>;

  // Compter les courses de cette semaine
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  const completed = userActivity.filter(
    (run) => new Date(run.date) >= weekAgo,
  ).length;
  const remaining = Math.max(0, weeklyGoal - completed);

  const data = [
    { name: "réalisées", value: completed },
    { name: "restants", value: remaining },
  ];

  return (
    <div className="p-6 w-2/5 mt-10 mr-20 mb-30 ml-20 bg-[#FBFBFB] rounded-xl">
      <div className="mb-6">
        <h3 className="text-3xl font-bold text-[#0000FF]">
          x{completed}{" "}
          <span className="text-2xl font-normal text-[#B6BDFC]">
            sur objectif de {weeklyGoal}
          </span>
        </h3>
        <p className="text-[#707070]">Courses hebdomadaire réalisées</p>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={90}
            outerRadius={130}
            startAngle={90}
            endAngle={450}
            dataKey="value"
            label={(e) => `${e.value} ${e.name}`}
            labelLine={false}
          >
            <Cell fill="#0000FF" />
            <Cell fill="#B3C6FF" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
