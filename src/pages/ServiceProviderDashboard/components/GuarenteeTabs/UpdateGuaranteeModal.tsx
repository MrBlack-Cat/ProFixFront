import React, { useEffect } from 'react';
import GlassModal from '../../../../components/Glassmorphism/GlassModal';
import UpdateGuaranteeForm from './UpdateGuaranteeForm';
import { Guarantee } from '../../../../types/Guarantee';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onUpdated: () => void;
  guarantee: Guarantee;
}

const UpdateGuaranteeModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onUpdated,
  guarantee,
}) => {
  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', isOpen);
    return () => document.body.classList.remove('overflow-hidden');
  }, [isOpen]);

  return (
    <GlassModal isOpen={isOpen} onClose={onClose}>
      <UpdateGuaranteeForm
        guarantee={guarantee}
        onUpdated={() => {
          onUpdated();
          onClose();
        }}
      />
    </GlassModal>
  );
};

export default UpdateGuaranteeModal;
