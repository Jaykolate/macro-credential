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
import { toast } from 'sonner@2.0.3';

interface UploadCertificateProps {
  learnerId: string;
  onUploadComplete: (certificate: Certificate) => void;
}

export const UploadCertificate: React.FC<UploadCertificateProps> = ({ 
  learnerId, 
  onUploadComplete 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    issuer: '',
    dateIssued: '',
    nsqfLevel: '',
    file: null as File | null,
    linkUrl: '',
  });

  const handleSubmit = async (uploadType: 'file' | 'link') => {
    if (!formData.title || !formData.issuer || !formData.dateIssued || !formData.nsqfLevel) {
      toast.error('Please fill in all required fields');
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
        nsqfLevel: '',
        file: null,
        linkUrl: '',
      });
      toast.success('Certificate uploaded and verification started!');
    } catch (error) {
      toast.error('Failed to upload certificate');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Upload className="w-4 h-4" />
          Upload Certificate
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload New Certificate</DialogTitle>
          <DialogDescription>
            Add your certificate by uploading a file or providing a verification link. 
            Our AI system will automatically verify and score your credentials.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Certificate Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Full Stack Development"
              />
            </div>
            <div>
              <Label htmlFor="issuer">Issuer *</Label>
              <Input
                id="issuer"
                value={formData.issuer}
                onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                placeholder="e.g., TechEd Institute"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dateIssued">Date Issued *</Label>
              <Input
                id="dateIssued"
                type="date"
                value={formData.dateIssued}
                onChange={(e) => setFormData({ ...formData, dateIssued: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="nsqfLevel">NSQF Level *</Label>
              <Select value={formData.nsqfLevel} onValueChange={(value) => setFormData({ ...formData, nsqfLevel: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                    <SelectItem key={level} value={level.toString()}>
                      Level {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs defaultValue="file" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="file">Upload File</TabsTrigger>
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
                    Uploading & Verifying...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload File
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
                  placeholder="https://coursera.org/verify/cert123"
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
                    Adding & Verifying...
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