import { useEffect, useState } from "react";
//@ts-ignore
import UserBanner from "../components/UserBanner/UserBanner";
import LastPerfKm from "../components/LastPerf/LastPerfKm";
import LastPerfBpm from "../components/LastPerf/LastPerfBpm";
import WeekPerf from "../components/WeekPerf/WeekPerf";
import DurationCard from "../components/WeekPerf/DurationCard";
import DistanceCard from "../components/WeekPerf/DistanceCard";
import Footer from "../components/Footer/Footer";
import { api } from "../utils/api";
import mockData from "../data/data.json";
import { useDataSource } from "../utils/mockData";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const { dataSource } = useDataSource();

  useEffect(() => {
    if (dataSource === "mock") {
      const user = mockData[0];
      const now = new Date();

      const filteredActivity = user.runningData.filter((session) => {
        const sessionDate = new Date(session.date);
        return sessionDate <= now;
      });
      const totalDistance = filteredActivity
        .reduce((sum, session) => sum + session.distance, 0)
        .toFixed(1);

      const totalSessions = filteredActivity.length;

      const totalDuration = filteredActivity.reduce(
        (sum, session) => sum + session.duration,
        0,
      );

      setData({
        userInfo: {
          profile: {
            firstName: user.userInfos.firstName,
            lastName: user.userInfos.lastName,
            createdAt: user.userInfos.createdAt,
            age: user.userInfos.age,
            weight: user.userInfos.weight,
            height: user.userInfos.height,
            profilePicture: user.userInfos.profilePicture,
          },
          statistics: {
            totalDistance,
            totalSessions,
            totalDuration,
          },
          weeklyGoal: user.weeklyGoal,
        },
        userActivity: filteredActivity,
      });

      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    Promise.all([
      api.getUserActivity("2025-01-01", "2026-12-31"), // Toute l'année
      api.getUserInfo(),
    ])
      .then(([userActivity, userInfo]) => {
        setData({ userActivity, userInfo });
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, [dataSource]);

  // Calculer les dates de la semaine
  const getWeekDates = () => {
    const today = new Date();
    const weekAgo = new Date();
    weekAgo.setDate(today.getDate() - 7);

    const formatDate = (date) => {
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };

    return `Du ${formatDate(weekAgo)} au ${formatDate(today)}`;
  };

  // Loader centralisé pour toute la page
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-[#0B23F4] rounded-full animate-spin"></div>
          <p className="text-gray-500">Chargement du tableau de bord...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <UserBanner userInfo={data.userInfo} />

      <h2 className="text-3xl font-medium mt-40 ml-20 mb-10">
        Vos dernières performances
      </h2>

      <div className="flex m-20 gap-10 justify-between">
        <LastPerfKm userActivity={data.userActivity} />
        <LastPerfBpm userActivity={data.userActivity} />
      </div>

      <h2 className="text-3xl font-medium mt-20 ml-20">Cette semaine</h2>
      <p className="text-lg font-semibold text-[#707070] mt-2 ml-20">
        {getWeekDates()}
      </p>

      <div className="flex">
        <WeekPerf
          userActivity={data.userActivity}
          weeklyGoal={data.userInfo.weeklyGoal}
        />

        <div className="flex mt-10 w-2/5 gap-10 flex-col items-center">
          <DurationCard userActivity={data.userActivity} />
          <DistanceCard userActivity={data.userActivity} />
        </div>
      </div>

      <Footer />
    </div>
  );
}
