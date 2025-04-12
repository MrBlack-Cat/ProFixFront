import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { fetchWithAuth, uploadToCloud } from '../../../../utils/api';

interface Props {
  onCreated: () => void;
}

const AddGuaranteeModal = ({ onCreated }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [clientId, setClientId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [issueDate, setIssueDate] = useState('');
  const [expirationDate, setExpirationDate] = useState('');

  const handleCreate = async () => {
    if (!clientId || !title || !file) return alert("Client, Title and File are required");

    setLoading(true);
    try {
      const uploadedFileUrl = await uploadToCloud(file);
      const res = await fetchWithAuth(`https://localhost:7164/api/GuaranteeDocument`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientProfileId: Number(clientId),
          title,
          description,
          issueDate,
          expirationDate,
          fileUrl: uploadedFileUrl
        })
      });

      const json = await res.json();
      if (json.isSuccess) {
        setClientId('');
        setTitle('');
        setDescription('');
        setFile(null);
        setIssueDate('');
        setExpirationDate('');
        setIsOpen(false);
        onCreated();
      } else {
        alert("Error: " + JSON.stringify(json.errors));
      }
    } catch (error) {
      console.error("Create error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        ➕ Add Guarantee
      </button>

      <Transition show={isOpen} as={Fragment}>
        <Dialog onClose={() => setIsOpen(false)} className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/30" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg w-full p-6">
                <Dialog.Title className="text-lg font-medium text-gray-900">
                  Add New Guarantee
                </Dialog.Title>
                <div className="mt-4 space-y-4">
                  <input
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                    placeholder="Client Profile ID"
                    className="w-full border rounded px-3 py-2"
                  />
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    className="w-full border rounded px-3 py-2"
                  />
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    className="w-full border rounded px-3 py-2"
                  />
                  <div className="flex space-x-4">
                    <input
                      type="date"
                      value={issueDate}
                      onChange={(e) => setIssueDate(e.target.value)}
                      className="w-1/2 border rounded px-3 py-2"
                      placeholder="Issue Date"
                    />
                    <input
                      type="date"
                      value={expirationDate}
                      onChange={(e) => setExpirationDate(e.target.value)}
                      className="w-1/2 border rounded px-3 py-2"
                      placeholder="Expiration Date"
                    />
                  </div>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={loading}
                    onClick={handleCreate}
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                  >
                    {loading ? 'Creating...' : 'Create'}
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default AddGuaranteeModal;
