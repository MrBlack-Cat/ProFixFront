import GlassModal from '../../../../components/Glassmorphism/GlassModal';
import UpdateCertificateForm from './UpdateCertificateForm';
import { Certificate } from '../../../../types/Certificate';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  certificate: Certificate;
}

const UpdateCertificateModal: React.FC<Props> = ({ isOpen, onClose, onSuccess, certificate }) => {
  return (
    <GlassModal isOpen={isOpen} onClose={onClose}>
      <UpdateCertificateForm
        certificate={certificate}
        onSuccess={() => {
          onSuccess();
          onClose();
        }}
      />
    </GlassModal>
  );
};

export default UpdateCertificateModal;
