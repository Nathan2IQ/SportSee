export default function UserBanner({ userInfo }) {
  // Plus besoin de useState ni useEffect !

  return (
    <div className="bg-linear-to-t from-[#F2F3FF] to-white p-4 rounded-3xl mb-4 flex gap-4 m-20 w-100% justify-between">
      <div className="flex items-center gap-10 m-4">
        <img
          src={userInfo.profile.profilePicture}
          alt="User Profile"
          className="w-40 h-45 rounded-2xl mb-2"
        />
        <div>
          <h1 className="space-x-1 text-3xl">
            <span>{userInfo.profile.firstName}</span>
            <span>{userInfo.profile.lastName}</span>
          </h1>
          <p className="text-[#707070]">
            Membre depuis le{" "}
            {new Date(userInfo.profile.createdAt).toLocaleDateString()}{" "}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 m-4">
        <p className="text-[#707070]">Distance totale parcourue</p>
        <p className="text-4xl font-bold bg-blue-600 text-white px-6 py-7 rounded-lg">
          {userInfo.statistics.totalDistance} km
        </p>
      </div>
    </div>
  );
}
