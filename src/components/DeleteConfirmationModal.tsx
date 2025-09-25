import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { useLanguage } from '../contexts/LanguageContext';
import { deleteCertificate } from '../services/mockApi';
import { Loader as Loader2, TriangleAlert as AlertTriangle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificateId: string;
  certificateTitle: string;
  onDelete: () => void;
}

export const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  certificateId,
  certificateTitle,
  onDelete
}) => {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    
    try {
      await deleteCertificate(certificateId);
      onDelete();
      onClose();
      toast.success(t('message.certificateDeleted'));
    } catch (error) {
      toast.error('Failed to delete certificate');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            {t('certificates.deleteCertificate')}
          </DialogTitle>
          <DialogDescription>
            {t('message.confirmDelete')}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="font-medium text-red-800">{certificateTitle}</p>
            <p className="text-sm text-red-600 mt-1">{t('message.deleteWarning')}</p>
          </div>

          <div className="flex gap-3">
            <Button 
              variant="destructive" 
              onClick={handleDelete} 
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {t('common.loading')}
                </>
              ) : (
                t('form.delete')
              )}
            </Button>
            <Button variant="outline" onClick={onClose} className="flex-1">
              {t('form.cancel')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};