import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Certificate } from '../types';
import { updateCertificate } from '../services/mockApi';
import { useLanguage } from '../contexts/LanguageContext';
import { Loader as Loader2 } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface EditCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificate: Certificate;
  onUpdate: (updatedCertificate: Certificate) => void;
}

export const EditCertificateModal: React.FC<EditCertificateModalProps> = ({
  isOpen,
  onClose,
  certificate,
  onUpdate
}) => {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: certificate.title,
    issuer: certificate.issuer,
    dateIssued: certificate.dateIssued,
    expiryDate: certificate.expiryDate || '',
    nsqfLevel: certificate.nsqfLevel.toString(),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.issuer || !formData.dateIssued || !formData.nsqfLevel) {
      toast.error(t('message.fillAllFields'));
      return;
    }

    setIsLoading(true);
    
    try {
      const updatedCertificate = await updateCertificate(certificate.id, {
        title: formData.title,
        issuer: formData.issuer,
        dateIssued: formData.dateIssued,
        expiryDate: formData.expiryDate || undefined,
        nsqfLevel: parseInt(formData.nsqfLevel),
      });

      onUpdate(updatedCertificate);
      onClose();
      toast.success(t('message.certificateUpdated'));
    } catch (error) {
      toast.error('Failed to update certificate');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('certificates.editCertificate')}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">{t('certificates.title')} *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder={t('form.enterTitle')}
              required
            />
          </div>

          <div>
            <Label htmlFor="issuer">{t('certificates.issuer')} *</Label>
            <Input
              id="issuer"
              value={formData.issuer}
              onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
              placeholder={t('form.enterIssuer')}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dateIssued">{t('certificates.dateIssued')} *</Label>
              <Input
                id="dateIssued"
                type="date"
                value={formData.dateIssued}
                onChange={(e) => setFormData({ ...formData, dateIssued: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="expiryDate">{t('certificates.expiryDate')}</Label>
              <Input
                id="expiryDate"
                type="date"
                value={formData.expiryDate}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="nsqfLevel">{t('certificates.nsqfLevel')} *</Label>
            <Select value={formData.nsqfLevel} onValueChange={(value) => setFormData({ ...formData, nsqfLevel: value })}>
              <SelectTrigger>
                <SelectValue placeholder={t('form.selectLevel')} />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                  <SelectItem key={level} value={level.toString()}>
                    {t('filter.level')} {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {t('common.loading')}
                </>
              ) : (
                t('form.save')
              )}
            </Button>
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              {t('form.cancel')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};