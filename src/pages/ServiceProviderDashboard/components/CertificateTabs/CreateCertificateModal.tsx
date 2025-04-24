import CreateCertificateForm from './CreateCertificateForm';
import GlassModal from '../../../../components/Glassmorphism/GlassModal';


interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CreateCertificateModal: React.FC<Props> = ({ isOpen, onClose, onSuccess }) => {
    return (
      <GlassModal isOpen={isOpen} onClose={onClose}>
        <CreateCertificateForm
          onSuccess={() => {
            onSuccess();
            onClose();
          }}
        />
      </GlassModal>
    );
  };
  
  export default CreateCertificateModal;