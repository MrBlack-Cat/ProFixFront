import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import { ServiceProvider } from '../../types/category';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  providers: ServiceProvider[];
  onApply: (filtered: ServiceProvider[]) => void;
};

const FilterModal = ({ isOpen, onClose, providers, onApply }: Props) => {
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [minExperience, setMinExperience] = useState<number | null>(null);
  const [minAge, setMinAge] = useState<number | null>(null);
  const [availableServiceTypes, setAvailableServiceTypes] = useState<string[]>([]);
  const [selectedServiceTypes, setSelectedServiceTypes] = useState<string[]>([]);

  useEffect(() => {
    const allServiceTypes = new Set<string>();
    providers.forEach((p) => p.serviceTypes.forEach((type) => allServiceTypes.add(type)));
    setAvailableServiceTypes(Array.from(allServiceTypes));
    console.log("💥 All providers:", providers);
  }, [providers]);

  const handleApply = () => {
    let filtered = [...providers];

    if (selectedGender) {
      filtered = filtered.filter(p => p.genderName === selectedGender);
    }

    if (minExperience !== null) {
      filtered = filtered.filter(p => (p.experienceYears ?? 0) >= minExperience);
    }

    if (minAge !== null) {
      filtered = filtered.filter(p => (p.age ?? 0) >= minAge);
    }

    if (selectedServiceTypes.length > 0) {
      filtered = filtered.filter(p =>
        selectedServiceTypes.every(type => p.serviceTypes.includes(type))
      );
    }

    onApply(filtered);
    handleClose();
  };

  const handleServiceTypeToggle = (type: string) => {
    setSelectedServiceTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleClose = () => {
    onClose();
  };

  return (
    
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title className="text-lg font-semibold mb-4 text-gray-900">🔍 Filter Providers</Dialog.Title>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Gender</label>
                    <select value={selectedGender || ''} onChange={(e) => setSelectedGender(e.target.value || null)} className="w-full mt-1 rounded border-gray-300 shadow-sm">
                      <option value="">All</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Min Experience (years)</label>
                    <input type="number" value={minExperience ?? ''} onChange={(e) => setMinExperience(Number(e.target.value) || null)} className="w-full mt-1 rounded border-gray-300 shadow-sm" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Min Age</label>
                    <input type="number" value={minAge ?? ''} onChange={(e) => setMinAge(Number(e.target.value) || null)} className="w-full mt-1 rounded border-gray-300 shadow-sm" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Service Types</label>
                    <div className="flex flex-wrap gap-2">
                      {availableServiceTypes.map((type) => (
                        <button key={type} type="button" onClick={() => handleServiceTypeToggle(type)} className={`px-3 py-1 border rounded-full text-sm ${selectedServiceTypes.includes(type) ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-2">
                  <button onClick={handleClose} className="rounded-md border px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Cancel</button>
                  <button onClick={handleApply} className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">Apply</button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default FilterModal;
