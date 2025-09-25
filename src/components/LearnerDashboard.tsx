import React, { useState, useEffect } from 'react';
import { Certificate } from '../types';
import { CertificateCard } from './CertificateCard';
import { UploadCertificate } from './UploadCertificate';
import { EditCertificateModal } from './EditCertificateModal';
import { DeleteConfirmationModal } from './DeleteConfirmationModal';
import { useLanguage } from '../contexts/LanguageContext';
import { getExpiryStatus } from '../services/mockApi';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { getCertificates } from '../services/mockApi';
import { Search, Filter, BookOpen, AlertTriangle, Calendar } from 'lucide-react';

interface LearnerDashboardProps {
  learnerId: string;
}

export const LearnerDashboard: React.FC<LearnerDashboardProps> = ({ learnerId }) => {
  const { t } = useLanguage();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [filteredCertificates, setFilteredCertificates] = useState<Certificate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [nsqfFilter, setNsqfFilter] = useState<string>('all');
  const [editingCertificate, setEditingCertificate] = useState<Certificate | null>(null);
  const [deletingCertificate, setDeletingCertificate] = useState<{ id: string; title: string } | null>(null);

  useEffect(() => {
    loadCertificates();
  }, [learnerId]);

  useEffect(() => {
    filterCertificates();
  }, [certificates, searchTerm, statusFilter, nsqfFilter]);

  const loadCertificates = async () => {
    try {
      const data = await getCertificates(learnerId);
      setCertificates(data);
    } catch (error) {
      console.error('Failed to load certificates:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterCertificates = () => {
    let filtered = certificates;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(cert =>
        cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cert.issuer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(cert => cert.verificationStatus === statusFilter);
    }

    // NSQF Level filter
    if (nsqfFilter !== 'all') {
      filtered = filtered.filter(cert => cert.nsqfLevel.toString() === nsqfFilter);
    }

    setFilteredCertificates(filtered);
  };

  const handleUploadComplete = (newCertificate: Certificate) => {
    setCertificates(prev => [newCertificate, ...prev]);
  };

  const handleEditCertificate = (certificate: Certificate) => {
    setEditingCertificate(certificate);
  };

  const handleUpdateCertificate = (updatedCertificate: Certificate) => {
    setCertificates(prev => 
      prev.map(cert => cert.id === updatedCertificate.id ? updatedCertificate : cert)
    );
  };

  const handleDeleteCertificate = (certificateId: string) => {
    const certificate = certificates.find(cert => cert.id === certificateId);
    if (certificate) {
      setDeletingCertificate({ id: certificateId, title: certificate.title });
    }
  };

  const handleConfirmDelete = () => {
    if (deletingCertificate) {
      setCertificates(prev => prev.filter(cert => cert.id !== deletingCertificate.id));
    }
  };
  const getStatusCounts = () => {
    return {
      verified: certificates.filter(c => c.verificationStatus === 'verified').length,
      aiScored: certificates.filter(c => c.verificationStatus === 'ai-scored').length,
      needsReview: certificates.filter(c => c.verificationStatus === 'needs-review').length,
      pending: certificates.filter(c => c.verificationStatus === 'pending').length,
      expiring: certificates.filter(c => {
        const status = getExpiryStatus(c);
        return status?.status === 'expiring';
      }).length,
      expired: certificates.filter(c => {
        const status = getExpiryStatus(c);
        return status?.status === 'expired';
      }).length,
    };
  };

  const statusCounts = getStatusCounts();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            {t('certificates.myCertificates')}
          </h1>
          <p className="text-muted-foreground">{t('certificates.manageCertificates')}</p>
        </div>
        <UploadCertificate learnerId={learnerId} onUploadComplete={handleUploadComplete} />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-800">{t('status.verified')}</p>
              <p className="text-2xl font-semibold text-green-900">{statusCounts.verified}</p>
            </div>
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">✅</Badge>
          </div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-800">{t('status.aiScored')}</p>
              <p className="text-2xl font-semibold text-yellow-900">{statusCounts.aiScored}</p>
            </div>
            <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">⚠</Badge>
          </div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-800">{t('status.needsReview')}</p>
              <p className="text-2xl font-semibold text-red-900">{statusCounts.needsReview}</p>
            </div>
            <Badge className="bg-red-100 text-red-800 hover:bg-red-100">❌</Badge>
          </div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-800">{t('status.pending')}</p>
              <p className="text-2xl font-semibold text-blue-900">{statusCounts.pending}</p>
            </div>
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">🔄</Badge>
          </div>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-800">{t('certificates.expiringIn')} 30d</p>
              <p className="text-2xl font-semibold text-orange-900">{statusCounts.expiring}</p>
            </div>
            <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">
              <Calendar className="w-3 h-3" />
            </Badge>
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-800">{t('certificates.expired')}</p>
              <p className="text-2xl font-semibold text-gray-900">{statusCounts.expired}</p>
            </div>
            <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
              <AlertTriangle className="w-3 h-3" />
            </Badge>
          </div>
        </div>
      </div>

      {/* Expiry Alerts */}
      {(statusCounts.expiring > 0 || statusCounts.expired > 0) && (
        <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-orange-800 mb-1">{t('certificates.expiringWarning')}</h3>
              <div className="text-sm text-orange-700 space-y-1">
                {statusCounts.expiring > 0 && (
                  <p>{statusCounts.expiring} certificate(s) expiring within 30 days</p>
                )}
                {statusCounts.expired > 0 && (
                  <p>{statusCounts.expired} certificate(s) have expired</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center gap-2 flex-1">
          <Search className="w-4 h-4 text-muted-foreground" />
          <Input
            placeholder={t('search.certificates')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder={t('filter.status')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('status.all')} {t('filter.status')}</SelectItem>
              <SelectItem value="verified">{t('status.verified')}</SelectItem>
              <SelectItem value="ai-scored">{t('status.aiScored')}</SelectItem>
              <SelectItem value="needs-review">{t('status.needsReview')}</SelectItem>
              <SelectItem value="pending">{t('status.pending')}</SelectItem>
            </SelectContent>
          </Select>
          <Select value={nsqfFilter} onValueChange={setNsqfFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder={t('filter.nsqfLevel')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('filter.allLevels')}</SelectItem>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                <SelectItem key={level} value={level.toString()}>
                  {t('filter.level')} {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Certificates Grid */}
      {filteredCertificates.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3>{t('message.noCertificates')}</h3>
          <p className="text-muted-foreground mb-4">
            {certificates.length === 0 
              ? t('message.uploadFirst')
              : t('message.adjustFilters')
            }
          </p>
          {certificates.length === 0 && (
            <UploadCertificate learnerId={learnerId} onUploadComplete={handleUploadComplete} />
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCertificates.map((certificate) => (
            <CertificateCard key={certificate.id} certificate={certificate} />
          ))}
        </div>
              onEdit={handleEditCertificate}
              onDelete={handleDeleteCertificate}
      )}

      {/* Edit Certificate Modal */}
      {editingCertificate && (
        <EditCertificateModal
          isOpen={!!editingCertificate}
          onClose={() => setEditingCertificate(null)}
          certificate={editingCertificate}
          onUpdate={handleUpdateCertificate}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deletingCertificate && (
        <DeleteConfirmationModal
          isOpen={!!deletingCertificate}
          onClose={() => setDeletingCertificate(null)}
          certificateId={deletingCertificate.id}
          certificateTitle={deletingCertificate.title}
          onDelete={handleConfirmDelete}
        />
      )}
    </div>
  );
};