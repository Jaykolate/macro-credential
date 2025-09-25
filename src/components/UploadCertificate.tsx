import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Upload, Link, Loader2 } from 'lucide-react';
import { uploadCertificate } from '../services/mockApi';
import { Certificate } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { toast } from 'sonner@2.0.3';

interface UploadCertificateProps {
  learnerId: string;
  onUploadComplete: (certificate: Certificate) => void;
}

export const UploadCertificate: React.FC<UploadCertificateProps> = ({ 
  learnerId, 
  onUploadComplete 
}) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    issuer: '',
    dateIssued: '',
    expiryDate: '',
    nsqfLevel: '',
    file: null as File | null,
    linkUrl: '',
  });

  const handleSubmit = async (uploadType: 'file' | 'link') => {
    if (!formData.title || !formData.issuer || !formData.dateIssued || !formData.nsqfLevel) {
      toast.error(t('message.fillAllFields'));
      return;
    }

    if (uploadType === 'file' && !formData.file) {
      toast.error('Please select a file to upload');
      return;
    }

    if (uploadType === 'link' && !formData.linkUrl) {
      toast.error('Please provide a certificate link');
      return;
    }

    setIsUploading(true);
    
    try {
      const certificateData = {
        learnerId,
        title: formData.title,
        issuer: formData.issuer,
        dateIssued: formData.dateIssued,
        nsqfLevel: parseInt(formData.nsqfLevel),
        hasQRCode: false,
        ...(uploadType === 'file' 
          ? { fileUrl: `/certificates/${formData.file?.name}` }
          : { linkUrl: formData.linkUrl }
        ),
      };

      const certificate = await uploadCertificate(certificateData);
      onUploadComplete(certificate);
      setIsOpen(false);
      setFormData({
        title: '',
        issuer: '',
        dateIssued: '',
        expiryDate: '',
        nsqfLevel: '',
        file: null,
        linkUrl: '',
      });
      toast.success(t('message.certificateUploaded'));
    } catch (error) {
      toast.error(t('common.error'));
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Upload className="w-4 h-4" />
          {t('certificates.uploadCertificate')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('certificates.uploadCertificate')}</DialogTitle>
          <DialogDescription>
            Add your certificate by uploading a file or providing a verification link. Our AI system will automatically verify and score your credentials.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">{t('certificates.title')} *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder={t('form.enterTitle')}
              />
            </div>
            <div>
              <Label htmlFor="issuer">{t('certificates.issuer')} *</Label>
              <Input
                id="issuer"
                value={formData.issuer}
                onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                placeholder={t('form.enterIssuer')}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dateIssued">{t('certificates.dateIssued')} *</Label>
              <Input
                id="dateIssued"
                type="date"
                value={formData.dateIssued}
                onChange={(e) => setFormData({ ...formData, dateIssued: e.target.value })}
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

          <div className="grid grid-cols-1 gap-4">
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
          </div>

          <Tabs defaultValue="file" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="file">{t('form.upload')} File</TabsTrigger>
              <TabsTrigger value="link">Add Link</TabsTrigger>
            </TabsList>
            
            <TabsContent value="file" className="space-y-4">
              <div>
                <Label htmlFor="file">Certificate File (PDF/Image)</Label>
                <Input
                  id="file"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => setFormData({ ...formData, file: e.target.files?.[0] || null })}
                />
              </div>
              <Button 
                onClick={() => handleSubmit('file')} 
                disabled={isUploading}
                className="w-full"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {t('common.loading')}
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    {t('form.upload')} File
                  </>
                )}
              </Button>
            </TabsContent>
            
            <TabsContent value="link" className="space-y-4">
              <div>
                <Label htmlFor="linkUrl">Certificate URL</Label>
                <Input
                  id="linkUrl"
                  value={formData.linkUrl}
                  onChange={(e) => setFormData({ ...formData, linkUrl: e.target.value })}
                  placeholder={t('form.enterUrl')}
                />
              </div>
              <Button 
                onClick={() => handleSubmit('link')} 
                disabled={isUploading}
                className="w-full"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {t('common.loading')}
                  </>
                ) : (
                  <>
                    <Link className="w-4 h-4 mr-2" />
                    Add Link
                  </>
                )}
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};