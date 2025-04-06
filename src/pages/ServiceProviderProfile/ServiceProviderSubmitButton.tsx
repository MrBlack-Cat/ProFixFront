const ServiceSubmitButton = ({ loading }: { loading: boolean }) => (
    <button
      type="submit"
      disabled={loading}
      className="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    >
      {loading ? 'Saving...' : 'Create Profile'}
    </button>
  );
  
  export default ServiceSubmitButton;
  