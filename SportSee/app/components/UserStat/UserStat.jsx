export default function UserStat({ userInfo }) {
  if (!userInfo?.statistics) {
    return null;
  }

  const {
    totalDuration,
    totalCaloriesBurned,
    totalDistance,
    totalRestDays,
    totalSessions,
  } = userInfo.statistics;

  const stats = [
    {
      label: "Temps total couru",
      value: `${totalDuration} `,
      mesure: "min",
    },
    {
      label: "Calories brûlées",
      value: `${totalCaloriesBurned} `,
      mesure: "cal",
    },
    {
      label: "Distance totale parcourue",
      value: `${totalDistance} `,
      mesure: "km",
    },
    {
      label: "Nombre de jours de repos",
      value: `${totalRestDays} `,
      mesure: "jours",
    },
    {
      label: "Nombre de sessions",
      value: `${totalSessions}`,
      mesure: "sessions",
    },
  ];

  return (
    <section className="m-20 mt-0 rounded-3xl p-10">
      <div className="mb-8 flex items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-medium">Vos statistiques</h2>
          <p className="text-[#707070]">
            Depuis le{" "}
            {new Date(userInfo.profile.createdAt).toLocaleDateString()}{" "}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-6">
        {stats.map((stat) => (
          <article
            key={stat.label}
            className={`bg-[#0B23F4] w-100 text-white rounded-2xl p-7 flex flex-col gap-4`}
          >
            <p className="text-1xl text-white  ">{stat.label}</p>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="text-1xl text-[#B6BDFC]">{stat.mesure}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
