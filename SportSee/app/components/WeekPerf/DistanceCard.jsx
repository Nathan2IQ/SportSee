export default function DistanceCard({ userActivity }) {
  if (!userActivity?.length) return <div>Pas de données</div>;

  // Filtrer les courses de cette semaine
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  const thisWeekRuns = userActivity.filter(
    (run) => new Date(run.date) >= weekAgo,
  );

  // Calculer la distance totale de la semaine
  const totalKm = thisWeekRuns.reduce((sum, run) => sum + run.distance, 0);

  return (
    <div className="p-6 w-full bg-[#FBFBFB] rounded-xl">
      <div className="flex items-center gap-4">
        <div>
          <p className="text-1xl text-[#707070]">Distance</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-semibold text-[#F4320B]">
              {totalKm.toFixed(1)}{" "}
            </p>
            <span className="text-2xl text-[#FCC1B6]">kilomètres</span>
          </div>
        </div>
      </div>
    </div>
  );
}
