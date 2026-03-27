import { useEffect, useState } from "react";
import UserInfo from "../components/UserInfo/UserInfo";
import UserStat from "../components/UserStat/UserStat";
import { api } from "../utils/api";
import mockData from "../data/data.json";
import { useDataSource } from "../utils/mockData";
import Footer from "../components/Footer/Footer";

function getPastSessions(runningData = []) {
  const today = new Date();

  return runningData
    .filter((session) => new Date(session.date) <= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date));
}

function buildStatistics(userActivity) {
  const totalDuration = userActivity.reduce(
    (sum, session) => sum + session.duration,
    0,
  );

  const totalCaloriesBurned = userActivity.reduce(
    (sum, session) => sum + session.caloriesBurned,
    0,
  );

  const totalDistance = userActivity
    .reduce((sum, session) => sum + session.distance, 0)
    .toFixed(1);

  const totalSessions = userActivity.length;

  let totalRestDays = 0;

  if (userActivity.length > 0) {
    const firstDay = new Date(userActivity[0].date);
    firstDay.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const trackedDays = Math.floor((today - firstDay) / 86400000) + 1;
    const sessionDays = new Set(userActivity.map((session) => session.date))
      .size;

    totalRestDays = Math.max(0, trackedDays - sessionDays);
  }

  return {
    totalDuration,
    totalCaloriesBurned,
    totalDistance,
    totalRestDays,
    totalSessions,
  };
}

export default function Profile() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { dataSource } = useDataSource();

  useEffect(() => {
    async function loadProfile() {
      setIsLoading(true);

      try {
        if (dataSource === "mock") {
          const user = mockData[0];
          const userActivity = getPastSessions(user.runningData);

          setData({
            userInfo: {
              profile: {
                firstName: user.userInfos.firstName,
                lastName: user.userInfos.lastName,
                createdAt: user.userInfos.createdAt,
                age: user.userInfos.age,
                gender: user.userInfos.gender,
                weight: user.userInfos.weight,
                height: user.userInfos.height,
                profilePicture: user.userInfos.profilePicture,
              },
              statistics: buildStatistics(userActivity),
            },
          });

          return;
        }

        const [userActivity, userInfo] = await Promise.all([
          api.getUserActivity("2025-01-01", "2026-12-31"),
          api.getUserInfo(),
        ]);

        setData({
          userInfo: {
            profile: {
              firstName: userInfo.profile.firstName,
              lastName: userInfo.profile.lastName,
              createdAt: userInfo.profile.createdAt,
              age: userInfo.profile.age,
              gender: userInfo.profile.gender,
              weight: userInfo.profile.weight,
              height: userInfo.profile.height,
              profilePicture: userInfo.profile.profilePicture,
            },
            statistics: buildStatistics(userActivity),
          },
        });
      } catch (error) {
        console.error(error);
        setData(null);
      } finally {
        setIsLoading(false);
      }
    }

    loadProfile();
  }, [dataSource]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-[#0B23F4] rounded-full animate-spin"></div>
          <p className="text-gray-500">Chargement du profil...</p>
        </div>
      </div>
    );
  }

  if (!data?.userInfo) {
    return (
      <div className="m-20 rounded-3xl bg-white p-8 text-[#707070]">
        Impossible de charger le profil utilisateur.
      </div>
    );
  }

  return (
    <>
      <div className="flex">
        <UserInfo userInfo={data.userInfo} />
        <UserStat userInfo={data.userInfo} />
      </div>
      <Footer />
    </>
  );
}
