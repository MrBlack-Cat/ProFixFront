const InfoTab = ({ profile }: { profile: any }) => {
    return (
      <div className="flex gap-6 items-center">
        <img src={profile.avatarUrl || '/default-avatar.png'} alt="Avatar" className="w-32 h-32 rounded-full object-cover" />
        <div>
          <h2 className="text-3xl font-bold mb-1">{profile.name} {profile.surname}</h2>
          <p className="text-gray-600">{profile.city} • {profile.age} y.o.</p>
          <p className="text-gray-600">Gender: {profile.genderName || '—'}</p>
          <p className="text-gray-600">Experience: {profile.experienceYears} years</p>
          <p className="text-gray-600">Category: {profile.parentCategoryName || '—'}</p>
          <p className="text-gray-600">Registered on: {new Date(profile.createdAt).toLocaleDateString()}</p>
          {profile.isApprovedByAdmin && (
            <p className="text-green-600">✅ Approved on {new Date(profile.approvalDate!).toLocaleDateString()}</p>
          )}
          {!profile.isApprovedByAdmin && <p className="text-yellow-600">⏳ Awaiting admin approval</p>}
          <div className="mt-3">
            <h4 className="font-semibold">Services:</h4>
            <ul className="flex gap-2 flex-wrap mt-1">
              {profile.serviceTypes?.map((s: string, i: number) => (
                <li key={i} className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };
  
  export default InfoTab;
  