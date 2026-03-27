export default function UserInfo({ userInfo }) {
  return (
    <div>
      <div className="bg-white p-10 rounded-2xl flex ml-20 mt-10 w-100%">
        <div className="flex items-center gap-10 m-4">
          <img
            src={userInfo.profile.profilePicture}
            alt="User Profile"
            className="w-40 h-45 rounded-2xl mb-2"
          />
          <div>
            <h1 className="space-x-1 text-3xl font-semibold">
              <span>{userInfo.profile.firstName}</span>
              <span>{userInfo.profile.lastName}</span>
            </h1>
            <p className="text-[#707070]">
              Membre depuis le{" "}
              {new Date(userInfo.profile.createdAt).toLocaleDateString()}{" "}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white p-10 gap-4 rounded-2xl flex flex-col ml-20 mt-10 mb-20 w-100%">
        <h2 className="text-2xl font-medium">Votre profil</h2>
        <div className="w-2xl h-0.5 m-auto bg-[#E7E7E7]"></div>
        <div className="flex flex-col gap-10 text-[#707070]">
          <p>Âge : {userInfo.profile.age}</p>
          <p>Genre : {userInfo.profile.gender}</p>
          <p>Taille : {userInfo.profile.height} cm</p>
          <p>Poids : {userInfo.profile.weight} kg</p>
        </div>
      </div>
    </div>
  );
}
