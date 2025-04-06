import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { ServiceProvider } from '../../types/category';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  providers: ServiceProvider[];
  onApply: (filtered: ServiceProvider[]) => void;
};

const FilterModal = ({ isOpen, onClose, providers, onApply }: Props) => {
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
//   const [onlyApproved, setOnlyApproved] = useState(false);

  const handleApply = () => {
    let filtered = [...providers];

    // if (onlyApproved) {
    //   filtered = filtered.filter(p => p.isApproved);
    // }

    if (selectedGender) {
      filtered = filtered.filter(p => p.gender === selectedGender);
    }

    onApply(filtered);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <Dialog.Title
                as="h3"
                className="text-lg font-semibold flex items-center gap-2 text-gray-900">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v1H3V4zm0 3h14v2H3V7zm0 4h10v2H3v-2z"/></svg>
                Filter Providers
              </Dialog.Title>
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Gender
                    </label>
                    <select
                      value={selectedGender || ''}
                      onChange={(e) =>
                        setSelectedGender(
                          e.target.value === '' ? null : e.target.value
                        )
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                      <option value="">All</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                  {/* <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={onlyApproved}
                      onChange={() => setOnlyApproved(!onlyApproved)}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label className="text-sm text-gray-700">Only approved</label>
                  </div> */}
                </div>

                <div className="mt-6 flex justify-end gap-2">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={onClose}>
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700"
                    onClick={() => {
                      handleApply();
                      onClose();
                    }}>
                    Apply
                  </button>
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
