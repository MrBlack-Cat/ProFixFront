import React, { useEffect, useState } from 'react';
import { fetchWithAuth, uploadToCloud } from '../../../../utils/api';

interface Client {
  id: number;
  name: string;
  surname: string;
}

interface Props {
  onCreated: () => void;
}

const AddGuaranteeForm: React.FC<Props> = ({ onCreated }) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [query, setQuery] = useState('');
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [issueDate, setIssueDate] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadClients = async () => {
      const res = await fetchWithAuth('/api/ClientProfile/all');
      const json = await res.json();
      setClients(json.data || []);
    };
    loadClients();
  }, []);

  useEffect(() => {
    setFilteredClients(
      clients.filter((c) =>
        `${c.name} ${c.surname}`.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query, clients]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!selectedClientId || !title || !file) {
      setError('Please fill in required fields');
      return;
    }

    setLoading(true);
    try {
      const fileUrl = await uploadToCloud(file);
      const res = await fetchWithAuth('https://localhost:7164/api/GuaranteeDocument', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientProfileId: selectedClientId,
          title,
          description,
          fileUrl,
          issueDate,
          expirationDate,
        }),
      });

      const json = await res.json();
      if (json.isSuccess) {
        onCreated();
      } else {
        setError('Error: ' + JSON.stringify(json.errors));
      }
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold text-indigo-700 text-center">📜 New Guarantee</h2>

      {error && <p className="text-red-600 text-sm text-center">{error}</p>}

      {/* Client selector */}
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setSelectedClientId(null);
        }}
        placeholder="Search client by name"
        className="w-full p-3 border border-gray-300 rounded-lg bg-white/70 backdrop-blur"
      />
      {query && filteredClients.length > 0 && (
        <ul className="bg-white rounded-md shadow max-h-40 overflow-y-auto">
          {filteredClients.map((c) => (
            <li
              key={c.id}
              onClick={() => {
                setQuery(`${c.name} ${c.surname}`);
                setSelectedClientId(c.id);
              }}
              className="px-4 py-2 hover:bg-indigo-100 cursor-pointer"
            >
              {c.name} {c.surname}
            </li>
          ))}
        </ul>
      )}

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full p-3 border border-gray-300 rounded-lg bg-white/70 backdrop-blur"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg bg-white/70 backdrop-blur"
      />

      <div className="flex gap-3">
        <input
          type="date"
          value={issueDate}
          onChange={(e) => setIssueDate(e.target.value)}
          className="w-1/2 p-3 border border-gray-300 rounded-lg bg-white/70 backdrop-blur"
        />
        <input
          type="date"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
          className="w-1/2 p-3 border border-gray-300 rounded-lg bg-white/70 backdrop-blur"
        />
      </div>

      <input
        type="file"
        accept="image/*,application/pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        required
        className="w-full file:bg-indigo-100 file:text-indigo-800 file:px-4 file:py-2 file:rounded-full file:border-0 text-sm text-gray-500"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
      >
        {loading ? 'Creating...' : 'Create Guarantee'}
      </button>
    </form>
  );
};

export default AddGuaranteeForm;
