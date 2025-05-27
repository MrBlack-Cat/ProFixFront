import React, { useState } from 'react';
import { Guarantee } from '../../../../types/Guarantee';
import GuaranteesTab from './GuaranteesTab';
import AddGuaranteeModal from './AddGuaranteeModal';
import UpdateGuaranteeModal from './UpdateGuaranteeModal';




const GuaranteePage: React.FC<{ providerId: number }> = ({ providerId }) => {
  const [selected, setSelected] = useState<Guarantee | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [reload, setReload] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false); 

  const handleSuccess = () => setReload((prev) => !prev);

  return (
    <div className="p-6">
      <GuaranteesTab
        providerId={providerId}
        onCreateClick={() => setShowCreateModal(true)}
        onEdit={(g) => {
          setSelected(g);
          setShowEditModal(true);
        }}
        key={reload ? 'reload' : 'initial'}
      />

      <AddGuaranteeModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreated={handleSuccess}
      />

      {selected && (
        <UpdateGuaranteeModal
          isOpen={showEditModal}
          onClose={() => {
            setSelected(null);
            setShowEditModal(false);
          }}
          guarantee={selected}
          onUpdated={handleSuccess}
        />
      )}
    </div>
  );
};

export default GuaranteePage;
