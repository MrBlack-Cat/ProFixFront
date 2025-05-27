import React, { useState } from 'react';
import { Certificate } from '../../../../types/Certificate';
import CertificatesTab from '../CertificateTabs/CertificatesTab';
import CreateCertificateModal from './CreateCertificateModal';
import UpdateCertificateModal from './UpdateCertificateModal';

const CertificatePage: React.FC<{ providerId: number }> = ({ providerId }) => {
  const [selected, setSelected] = useState<Certificate | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [reload, setReload] = useState(false);

  const handleSuccess = () => {
    setReload(prev => !prev);
  };

  return (
    <div className="p-6">
      <CertificatesTab
        providerId={providerId}
        onCreateClick={() => setShowCreateModal(true)} 
        onEdit={(cert) => {
          setSelected(cert);
          setShowEditModal(true);
        }}
        key={reload ? 'reload' : 'initial'}
      />

      <CreateCertificateModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={handleSuccess}
      />

      {selected && (
        <UpdateCertificateModal
          isOpen={showEditModal}
          onClose={() => {
            setSelected(null);
            setShowEditModal(false);
          }}
          certificate={selected}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
};

export default CertificatePage;
