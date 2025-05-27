import React from 'react';
import GlassModal from '../../../../components/Glassmorphism/GlassModal';
import AddGuaranteeForm from './AddGuaranteeForm';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => void;
}

const AddGuaranteeModal: React.FC<Props> = ({ isOpen, onClose, onCreated }) => {
  return (
    <GlassModal isOpen={isOpen} onClose={onClose}>
      <AddGuaranteeForm
        onCreated={() => {
          onCreated();
          onClose();
        }}
      />
    </GlassModal>
  );
};

export default AddGuaranteeModal;
