import React from 'react';
import { Certificate } from '../types';
import { getExpiryStatus } from '../services/mockApi';
import { useLanguage } from '../contexts/LanguageContext';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ExternalLink, FileText, Shield, AlertTriangle, X, Clock, Edit, Trash2, Calendar } from 'lucide-react';

interface CertificateCardProps {
  certificate: Certificate;
  showActions?: boolean;
  onRequestVerification?: (certificateId: string) => void;
  onEdit?: (certificate: Certificate) => void;
  onDelete?: (certificateId: string) => void;
}

export const CertificateCard: React.FC<CertificateCardProps> = ({ 
  certificate, 
  showActions = false, 
  onRequestVerification,
  onEdit,
  onDelete
}) => {
  const { t } = useLanguage();
  const expiryStatus = getExpiryStatus(certificate);

  const getStatusIcon = () => {
    switch (certificate.verificationStatus) {
      case 'verified':
        return <Shield className="w-4 h-4 text-green-600" />;
      case 'ai-scored':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'needs-review':
        return <X className="w-4 h-4 text-red-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-blue-600" />;
      default:
        return null;
    }
  };

  const getStatusBadge = () => {
    switch (certificate.verificationStatus) {
      case 'verified':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">✅ {t('certificates.verified')}</Badge>;
      case 'ai-scored':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">⚠ {t('certificates.aiScored')} ({certificate.aiScore}%)</Badge>;
      case 'needs-review':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">❌ {t('certificates.needsReview')}</Badge>;
      case 'pending':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">🔄 {t('certificates.pending')}</Badge>;
      default:
        return null;
    }
  };

  const getExpiryBadge = () => {
    if (!expiryStatus) return null;

    if (expiryStatus.status === 'expired') {
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-100 flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          {t('certificates.expired')}
        </Badge>
      );
    } else if (expiryStatus.status === 'expiring') {
      return (
        <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100 flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          {t('certificates.expiringIn')} {expiryStatus.daysUntilExpiry} {t('certificates.days')}
        </Badge>
      );
    }

    return null;
  };
  return (
    <Card className={`p-6 hover:shadow-md transition-shadow ${expiryStatus?.status === 'expired' ? 'border-red-200 bg-red-50/30' : expiryStatus?.status === 'expiring' ? 'border-orange-200 bg-orange-50/30' : ''}`}>
      {/* Expiry Warning */}
      {expiryStatus?.status === 'expired' && (
        <div className="mb-4 p-3 bg-red-100 border border-red-200 rounded-md">
          <div className="flex items-center gap-2 text-red-800">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm font-medium">{t('certificates.expiredWarning')}</span>
          </div>
        </div>
      )}
      {expiryStatus?.status === 'expiring' && (
        <div className="mb-4 p-3 bg-orange-100 border border-orange-200 rounded-md">
          <div className="flex items-center gap-2 text-orange-800">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm font-medium">{t('certificates.expiringWarning')}</span>
          </div>
        </div>
      )}

      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          {getStatusIcon()}
          <h3 className="font-medium text-lg">{certificate.title}</h3>
        </div>
        <div className="flex flex-col gap-2 items-end">
          {getStatusBadge()}
          {getExpiryBadge()}
        </div>
      </div>
      
      <div className="space-y-2 mb-4">
        <p className="text-muted-foreground">
          <strong>{t('certificates.issuer')}:</strong> {certificate.issuer}
        </p>
        <p className="text-muted-foreground">
          <strong>{t('certificates.dateIssued')}:</strong> {new Date(certificate.dateIssued).toLocaleDateString()}
        </p>
        {certificate.expiryDate && (
          <p className="text-muted-foreground">
            <strong>{t('certificates.expiryDate')}:</strong> {new Date(certificate.expiryDate).toLocaleDateString()}
          </p>
        )}
        <p className="text-muted-foreground">
          <strong>{t('certificates.nsqfLevel')}:</strong> {certificate.nsqfLevel}
        </p>
        {certificate.aiScore && (
          <p className="text-muted-foreground">
            <strong>{t('certificates.aiScore')}:</strong> {certificate.aiScore}%
          </p>
        )}
      </div>

      <div className="flex items-center gap-2 mb-4 flex-wrap">
        {certificate.fileUrl && (
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            {t('certificates.viewPDF')}
          </Button>
        )}
        {certificate.linkUrl && (
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <ExternalLink className="w-4 h-4" />
            {t('certificates.viewCertificate')}
          </Button>
        )}
        
        {/* Edit/Delete Actions for Learners */}
        {(onEdit || onDelete) && (
          <div className="flex items-center gap-2 ml-auto">
            {onEdit && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onEdit(certificate)}
                className="flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                {t('form.edit')}
              </Button>
            )}
            {onDelete && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onDelete(certificate.id)}
                className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:border-red-300"
              >
                <Trash2 className="w-4 h-4" />
                {t('form.delete')}
              </Button>
            )}
          </div>
        )}
      </div>

      {certificate.metadata.verificationSteps && (
        <div className="border-t pt-4">
          <p className="text-sm font-medium mb-2">{t('certificates.verificationStatus')}:</p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className={`flex items-center gap-2 ${certificate.metadata.verificationSteps.qrCheck ? 'text-green-600' : 'text-gray-400'}`}>
              {certificate.metadata.verificationSteps.qrCheck ? '✓' : '✗'} QR Code Check
            </div>
            <div className={`flex items-center gap-2 ${certificate.metadata.verificationSteps.blockchainVerification ? 'text-green-600' : 'text-gray-400'}`}>
              {certificate.metadata.verificationSteps.blockchainVerification ? '✓' : '✗'} Blockchain Verification
            </div>
            <div className={`flex items-center gap-2 ${certificate.metadata.verificationSteps.apiVerification ? 'text-green-600' : 'text-gray-400'}`}>
              {certificate.metadata.verificationSteps.apiVerification ? '✓' : '✗'} API Verification
            </div>
            <div className={`flex items-center gap-2 ${certificate.metadata.verificationSteps.aiScoring ? 'text-green-600' : 'text-gray-400'}`}>
              {certificate.metadata.verificationSteps.aiScoring ? '✓' : '✗'} AI Scoring
            </div>
          </div>
        </div>
      )}

      {showActions && certificate.verificationStatus !== 'verified' && (
        <div className="border-t pt-4 mt-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onRequestVerification?.(certificate.id)}
          >
            Request Manual Verification
          </Button>
        </div>
      )}
    </Card>
  );
};