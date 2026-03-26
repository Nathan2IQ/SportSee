export default function DurationCard({ userActivity }) {
  if (!userActivity?.length) return <div>Pas de données</div>;

  // Filtrer les courses de cette semaine
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  const thisWeekRuns = userActivity.filter(
    (run) => new Date(run.date) >= weekAgo,
  );

  // Calculer la durée totale de la semaine en minutes
  const totalMinutes = thisWeekRuns.reduce((sum, run) => sum + run.duration, 0);

  return (
    <div className="p-6 w-full bg-[#FBFBFB] rounded-xl">
      <div className="flex items-center gap-4">
        <div>
          <p className="text-1xl text-[#707070]">Durée d'activité</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-semibold text-[#0B23F4]">
              {totalMinutes}{" "}
            </p>
            <span className="text-2xl text-[#B6BDFC]">minutes</span>
          </div>
        </div>
      </div>
    </div>
  );
}
