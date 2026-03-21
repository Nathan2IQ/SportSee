import { useEffect, useState } from "react";
//@ts-ignore
import UserBanner from "../components/UserBanner/UserBanner";
import { api } from "../utils/api";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    Promise.all([api.getUserInfo()])
      .then(([userInfo]) => {
        setData({ userInfo });
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

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
      {/* Ajoutez vos autres composants ici */}
    </div>
  );
}
