import React, { useState, useEffect } from 'react';
import { Certificate, User } from '../types';
import { CertificateCard } from './CertificateCard';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { searchLearners, getCertificates, requestManualVerification } from '../services/mockApi';
import { Search, Users, FileCheck, Eye } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface EmployerDashboardProps {
  employerId: string;
}

export const EmployerDashboard: React.FC<EmployerDashboardProps> = ({ employerId }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [learners, setLearners] = useState<User[]>([]);
  const [selectedLearner, setSelectedLearner] = useState<User | null>(null);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingCertificates, setIsLoadingCertificates] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [nsqfFilter, setNsqfFilter] = useState<string>('all');

  useEffect(() => {
    if (searchQuery.length >= 2) {
      handleSearch();
    } else {
      setLearners([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (selectedLearner) {
      loadLearnerCertificates(selectedLearner.id);
    }
  }, [selectedLearner]);

  const handleSearch = async () => {
    setIsSearching(true);
    try {
      const results = await searchLearners(searchQuery);
      setLearners(results);
    } catch (error) {
      console.error('Search failed:', error);
      toast.error('Failed to search learners');
    } finally {
      setIsSearching(false);
    }
  };

  const loadLearnerCertificates = async (learnerId: string) => {
    setIsLoadingCertificates(true);
    try {
      const data = await getCertificates(learnerId);
      setCertificates(data);
    } catch (error) {
      console.error('Failed to load certificates:', error);
      toast.error('Failed to load certificates');
    } finally {
      setIsLoadingCertificates(false);
    }
  };

  const handleRequestVerification = async (certificateId: string) => {
    try {
      await requestManualVerification(certificateId, employerId);
      toast.success('Manual verification requested successfully');
    } catch (error) {
      console.error('Failed to request verification:', error);
      toast.error('Failed to request verification');
    }
  };

  const getFilteredCertificates = () => {
    let filtered = certificates;

    if (statusFilter !== 'all') {
      filtered = filtered.filter(cert => cert.verificationStatus === statusFilter);
    }

    if (nsqfFilter !== 'all') {
      filtered = filtered.filter(cert => cert.nsqfLevel.toString() === nsqfFilter);
    }

    return filtered;
  };

  const filteredCertificates = getFilteredCertificates();

  const getCertificateStats = () => {
    return {
      total: certificates.length,
      verified: certificates.filter(c => c.verificationStatus === 'verified').length,
      aiScored: certificates.filter(c => c.verificationStatus === 'ai-scored').length,
      needsReview: certificates.filter(c => c.verificationStatus === 'needs-review').length,
    };
  };

  const stats = selectedLearner ? getCertificateStats() : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="flex items-center gap-2">
          <Users className="w-6 h-6" />
          Employer Dashboard
        </h1>
        <p className="text-muted-foreground">Search and verify learner credentials</p>
      </div>

      {/* Search Section */}
      <Card className="p-6">
        <h2 className="flex items-center gap-2 mb-4">
          <Search className="w-5 h-5" />
          Search Learners
        </h2>
        <div className="flex gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        {/* Search Results */}
        {isSearching && (
          <div className="mt-4 text-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-sm text-muted-foreground">Searching...</p>
          </div>
        )}

        {learners.length > 0 && (
          <div className="mt-4 space-y-2">
            <h3>Search Results:</h3>
            {learners.map((learner) => (
              <div
                key={learner.id}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedLearner?.id === learner.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => setSelectedLearner(learner)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{learner.name}</p>
                    <p className="text-sm text-muted-foreground">{learner.email}</p>
                  </div>
                  <Button
                    variant={selectedLearner?.id === learner.id ? "default" : "outline"}
                    size="sm"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Certificates
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {searchQuery.length >= 2 && learners.length === 0 && !isSearching && (
          <div className="mt-4 text-center text-muted-foreground">
            No learners found matching "{searchQuery}"
          </div>
        )}
      </Card>

      {/* Selected Learner Certificates */}
      {selectedLearner && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="flex items-center gap-2">
                <FileCheck className="w-5 h-5" />
                {selectedLearner.name}'s Certificates
              </h2>
              <p className="text-muted-foreground">{selectedLearner.email}</p>
            </div>
          </div>

          {isLoadingCertificates ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p>Loading certificates...</p>
            </div>
          ) : (
            <>
              {/* Stats */}
              {stats && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p className="text-blue-800">Total</p>
                    <p className="text-2xl font-semibold text-blue-900">{stats.total}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <p className="text-green-800">Verified</p>
                    <p className="text-2xl font-semibold text-green-900">{stats.verified}</p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <p className="text-yellow-800">AI-Scored</p>
                    <p className="text-2xl font-semibold text-yellow-900">{stats.aiScored}</p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <p className="text-red-800">Needs Review</p>
                    <p className="text-2xl font-semibold text-red-900">{stats.needsReview}</p>
                  </div>
                </div>
              )}

              {/* Filters */}
              {certificates.length > 0 && (
                <div className="flex gap-4 mb-6 p-4 bg-muted/50 rounded-lg">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="verified">Verified</SelectItem>
                      <SelectItem value="ai-scored">AI-Scored</SelectItem>
                      <SelectItem value="needs-review">Needs Review</SelectItem>
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
              )}

              {/* Certificates */}
              {filteredCertificates.length === 0 ? (
                <div className="text-center py-8">
                  <FileCheck className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3>No certificates found</h3>
                  <p className="text-muted-foreground">
                    {certificates.length === 0 
                      ? "This learner hasn't uploaded any certificates yet"
                      : "No certificates match the current filters"
                    }
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredCertificates.map((certificate) => (
                    <CertificateCard
                      key={certificate.id}
                      certificate={certificate}
                      showActions={true}
                      onRequestVerification={handleRequestVerification}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </Card>
      )}

      {!selectedLearner && searchQuery.length < 2 && (
        <Card className="p-12 text-center">
          <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3>Search for Learners</h3>
          <p className="text-muted-foreground">
            Enter at least 2 characters to search for learners by name or email
          </p>
        </Card>
      )}
    </div>
  );
};