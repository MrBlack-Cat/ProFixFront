import CreateServiceProfileForm from './CreateServiceProviderProfileForm';

const CreateServiceProfilePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">
          Create Service Provider Profile
        </h1>
        <CreateServiceProfileForm />
      </div>
    </div>
  );
};

export default CreateServiceProfilePage;
