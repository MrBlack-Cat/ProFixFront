const AvatarUploader = () => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">Avatar Upload</label>
      <input type="file" className="w-full p-2 border rounded" />
      <p className="text-xs text-gray-500 mt-1">Загрузка аватара пока не реализована</p>
    </div>
  );
};

export default AvatarUploader;
