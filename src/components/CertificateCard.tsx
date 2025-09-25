import React from 'react';
import { Certificate } from '../types';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ExternalLink, FileText, Shield, AlertTriangle, X, Clock } from 'lucide-react';

interface CertificateCardProps {
  certificate: Certificate;
  showActions?: boolean;
  onRequestVerification?: (certificateId: string) => void;
}

export const CertificateCard: React.FC<CertificateCardProps> = ({ 
  certificate, 
  showActions = false, 
  onRequestVerification 
}) => {
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
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">✅ Verified</Badge>;
      case 'ai-scored':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">⚠ AI-scored ({certificate.aiScore}%)</Badge>;
      case 'needs-review':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">❌ Needs Review</Badge>;
      case 'pending':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">🔄 Pending</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          {getStatusIcon()}
          <h3 className="font-medium text-lg">{certificate.title}</h3>
        </div>
        {getStatusBadge()}
      </div>
      
      <div className="space-y-2 mb-4">
        <p className="text-muted-foreground">
          <strong>Issuer:</strong> {certificate.issuer}
        </p>
        <p className="text-muted-foreground">
          <strong>Date Issued:</strong> {new Date(certificate.dateIssued).toLocaleDateString()}
        </p>
        <p className="text-muted-foreground">
          <strong>NSQF Level:</strong> {certificate.nsqfLevel}
        </p>
        {certificate.aiScore && (
          <p className="text-muted-foreground">
            <strong>AI Credibility Score:</strong> {certificate.aiScore}%
          </p>
        )}
      </div>

      <div className="flex items-center gap-2 mb-4">
        {certificate.fileUrl && (
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            View PDF
          </Button>
        )}
        {certificate.linkUrl && (
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <ExternalLink className="w-4 h-4" />
            View Certificate
          </Button>
        )}
      </div>

      {certificate.metadata.verificationSteps && (
        <div className="border-t pt-4">
          <p className="text-sm font-medium mb-2">Verification Steps:</p>
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