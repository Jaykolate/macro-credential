import React, { useState, useEffect } from 'react';
import { Certificate } from '../types';
import { CertificateCard } from './CertificateCard';
import { UploadCertificate } from './UploadCertificate';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { getCertificates } from '../services/mockApi';
import { Search, Filter, BookOpen } from 'lucide-react';

interface LearnerDashboardProps {
  learnerId: string;
}

export const LearnerDashboard: React.FC<LearnerDashboardProps> = ({ learnerId }) => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [filteredCertificates, setFilteredCertificates] = useState<Certificate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [nsqfFilter, setNsqfFilter] = useState<string>('all');

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

  const getStatusCounts = () => {
    return {
      verified: certificates.filter(c => c.verificationStatus === 'verified').length,
      aiScored: certificates.filter(c => c.verificationStatus === 'ai-scored').length,
      needsReview: certificates.filter(c => c.verificationStatus === 'needs-review').length,
      pending: certificates.filter(c => c.verificationStatus === 'pending').length,
    };
  };

  const statusCounts = getStatusCounts();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading certificates...</p>
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
            My Certificates
          </h1>
          <p className="text-muted-foreground">Manage and track your micro-credentials</p>
        </div>
        <UploadCertificate learnerId={learnerId} onUploadComplete={handleUploadComplete} />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-800">Verified</p>
              <p className="text-2xl font-semibold text-green-900">{statusCounts.verified}</p>
            </div>
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">✅</Badge>
          </div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-800">AI-Scored</p>
              <p className="text-2xl font-semibold text-yellow-900">{statusCounts.aiScored}</p>
            </div>
            <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">⚠</Badge>
          </div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-800">Needs Review</p>
              <p className="text-2xl font-semibold text-red-900">{statusCounts.needsReview}</p>
            </div>
            <Badge className="bg-red-100 text-red-800 hover:bg-red-100">❌</Badge>
          </div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-800">Pending</p>
              <p className="text-2xl font-semibold text-blue-900">{statusCounts.pending}</p>
            </div>
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">🔄</Badge>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center gap-2 flex-1">
          <Search className="w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search certificates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="verified">Verified</SelectItem>
              <SelectItem value="ai-scored">AI-Scored</SelectItem>
              <SelectItem value="needs-review">Needs Review</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
          <Select value={nsqfFilter} onValueChange={setNsqfFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="NSQF" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                <SelectItem key={level} value={level.toString()}>
                  Level {level}
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
          <h3>No certificates found</h3>
          <p className="text-muted-foreground mb-4">
            {certificates.length === 0 
              ? "Upload your first certificate to get started"
              : "Try adjusting your search or filter criteria"
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
      )}
    </div>
  );
};