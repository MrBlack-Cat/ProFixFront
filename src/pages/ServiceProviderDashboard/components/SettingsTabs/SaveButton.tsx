interface SaveButtonProps {
  loading?: boolean;
}

const SaveButton: React.FC<SaveButtonProps> = ({ loading = false }) => {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`px-6 py-2 rounded-md font-semibold transition-all
        ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
        text-white
      `}
    >
      {loading ? 'Saving...' : 'Save Changes'}
    </button>
  );
};

export default SaveButton;
