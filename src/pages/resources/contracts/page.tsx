import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../../../components/feature/Header';
import { Footer } from '../../../components/feature/Footer';
import { BackToTop } from '../../../components/feature/BackToTop';

/* -------------------------------------------------------------------------- */
/*  Types & Interfaces                                                       */
/* -------------------------------------------------------------------------- */
interface CaptchaData {
  num1: number;
  num2: number;
  operator: string;
  answer: number;
}

interface Resource {
  title: string;
  category: string;
  type: string;
  size: string;
  date: string;
  icon: string;
  status: 'Available' | 'Restricted';
  description: string;
  documentUrl: string;
}

/* -------------------------------------------------------------------------- */
/*  Component                                                               */
/* -------------------------------------------------------------------------- */
const ContractsPage: React.FC = () => {
  /* ---------------------------------------------------------------------- */
  /*  Static data (resources)                                               */
  /* ---------------------------------------------------------------------- */
  const resources: Resource[] = [
    {
      title: 'Supply Agreement Template',
      category: 'Contracts',
      type: 'DOCX',
      size: '450 KB',
      date: '2023-12-20',
      icon: 'ri-file-list-line',
      status: 'Available',
      description:
        'Standard supply agreement template for establishing terms and conditions between suppliers and the company for goods and materials procurement.',
      documentUrl: 'https://www.africau.edu/images/default/sample.pdf',
    },
    {
      title: 'Service Level Agreement',
      category: 'Contracts',
      type: 'PDF',
      size: '520 KB',
      date: '2023-09-25',
      icon: 'ri-file-list-line',
      status: 'Available',
      description:
        'Comprehensive service level agreement template defining service standards, performance metrics, and responsibilities between service providers and clients.',
      documentUrl: 'https://scholar.harvard.edu/files/torman_personal/files/samplepptx.pdf',
    },
    {
      title: 'Partnership Agreement Template',
      category: 'Contracts',
      type: 'DOCX',
      size: '380 KB',
      date: '2023-11-15',
      icon: 'ri-file-list-line',
      status: 'Available',
      description:
        'Legal partnership agreement template outlining terms, profit sharing, responsibilities, and dissolution procedures for business partnerships.',
      documentUrl: 'https://www.orimi.com/pdf-test.pdf',
    },
    {
      title: 'Non-Disclosure Agreement',
      category: 'Contracts',
      type: 'PDF',
      size: '290 KB',
      date: '2023-10-30',
      icon: 'ri-file-list-line',
      status: 'Available',
      description:
        'Standard NDA template for protecting confidential information shared between parties during business discussions and collaborations.',
      documentUrl: 'https://www.clickdimensions.com/links/TestPDFDocument.pdf',
    },
    {
      title: 'Employment Contract Template',
      category: 'Contracts',
      type: 'DOCX',
      size: '410 KB',
      date: '2023-08-20',
      icon: 'ri-file-list-line',
      status: 'Available',
      description:
        'Comprehensive employment contract template covering terms of employment, compensation, benefits, and termination conditions.',
      documentUrl: 'https://www.africau.edu/images/default/sample.pdf',
    },
    {
      title: 'Vendor Agreement Form',
      category: 'Contracts',
      type: 'PDF',
      size: '340 KB',
      date: '2023-07-15',
      icon: 'ri-file-list-line',
      status: 'Available',
      description:
        'Vendor agreement form establishing terms and conditions for vendor relationships, including payment terms and delivery schedules.',
      documentUrl: 'https://scholar.harvard.edu/files/torman_personal/files/samplepptx.pdf',
    },
    {
      title: 'Consulting Agreement',
      category: 'Contracts',
      type: 'DOCX',
      size: '360 KB',
      date: '2023-06-28',
      icon: 'ri-file-list-line',
      status: 'Available',
      description:
        'Professional consulting agreement template defining scope of work, deliverables, compensation, and intellectual property rights.',
      documentUrl: 'https://www.orimi.com/pdf-test.pdf',
    },
    {
      title: 'Lease Agreement Template',
      category: 'Contracts',
      type: 'PDF',
      size: '480 KB',
      date: '2023-05-15',
      icon: 'ri-file-list-line',
      status: 'Available',
      description:
        'Commercial lease agreement template for property rental arrangements, including terms, rent schedules, and maintenance responsibilities.',
      documentUrl: 'https://www.clickdimensions.com/links/TestPDFDocument.pdf',
    },
  ];

  /* ---------------------------------------------------------------------- */
  /*  Component state                                                       */
  /* ---------------------------------------------------------------------- */
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Available' | 'Restricted'>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    captchaAnswer: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [captcha, setCaptcha] = useState<CaptchaData>({
    num1: 0,
    num2: 0,
    operator: '+',
    answer: 0,
  });
  const itemsPerPage = 5;

  const subMenuItems = [
    { label: 'Statistics Report', path: '/resources/statistics-report' },
    { label: 'Financials Report', path: '/resources/financials-report' },
    { label: 'Reports', path: '/resources/reports' },
    { label: 'Policies', path: '/resources/policies' },
    { label: 'Certifications', path: '/resources/certifications' },
    { label: 'Affiliations', path: '/resources/affiliations' },
    { label: 'Awards', path: '/resources/awards' },
  ];

  const years = ['All', '2024', '2023', '2022', '2021', '2020'];

  /* ---------------------------------------------------------------------- */
  /*  Helpers & utilities                                                   */
  /* ---------------------------------------------------------------------- */
  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  };

  const generateCaptcha = useCallback(() => {
    const operators = ['+', '-', '×'];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    let num1: number, num2: number, answer: number;

    if (operator === '+') {
      num1 = Math.floor(Math.random() * 20) + 1;
      num2 = Math.floor(Math.random() * 20) + 1;
      answer = num1 + num2;
    } else if (operator === '-') {
      num1 = Math.floor(Math.random() * 20) + 10;
      num2 = Math.floor(Math.random() * 10) + 1;
      answer = num1 - num2;
    } else {
      num1 = Math.floor(Math.random() * 10) + 1;
      num2 = Math.floor(Math.random() * 10) + 1;
      answer = num1 * num2;
    }

    setCaptcha({ num1, num2, operator, answer });
  }, []);

  useEffect(() => {
    generateCaptcha();
  }, [generateCaptcha]);

  const getYearFromDate = (dateString: string) => dateString.split('-')[0];

  /* Filter resources */
  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.category.toLowerCase().includes(searchQuery.toLowerCase());
    const resourceYear = getYearFromDate(resource.date);
    const matchesYear = selectedYear === 'All' || resourceYear === selectedYear;
    const matchesStatus = statusFilter === 'All' || resource.status === statusFilter;
    return matchesSearch && matchesYear && matchesStatus;
  });

  const totalPages = Math.ceil(filteredResources.length / itemsPerPage);
  const paginatedResources = filteredResources.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  /* Reset to page 1 when filters change */
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedYear, statusFilter]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedYear('All');
    setStatusFilter('All');
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  const handleViewResource = (resource: Resource) => {
    setSelectedResource(resource);
    setShowViewModal(true);
  };

  const handlePreviewDocument = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleRequestDownload = (resource: Resource) => {
    setSelectedResource(resource);
    setShowModal(true);
    setSubmitSuccess(false);
    setFormData({
      companyName: '',
      contactPerson: '',
      email: '',
      phone: '',
      address: '',
      captchaAnswer: '',
    });
    setErrors({});
    generateCaptcha();
  };

  const triggerDownload = (url: string, filename: string) => {
    try {
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Download trigger failed:', err);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
    if (!formData.contactPerson.trim()) newErrors.contactPerson = 'Contact person is required';

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';

    if (!formData.captchaAnswer.trim()) {
      newErrors.captchaAnswer = 'Please solve the captcha';
    } else if (parseInt(formData.captchaAnswer, 10) !== captcha.answer) {
      newErrors.captchaAnswer = 'Incorrect answer. Please try again';
      generateCaptcha();
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const formBody = new URLSearchParams();
      formBody.append('companyName', formData.companyName);
      formBody.append('contactPerson', formData.contactPerson);
      formBody.append('email', formData.email);
      formBody.append('phone', formData.phone);
      formBody.append('address', formData.address);
      formBody.append('resourceTitle', selectedResource?.title ?? '');

      await fetch('https://readdy.ai/api/form/d62gsrg0h9ov63emh7gg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody.toString(),
      });

      setSubmitSuccess(true);

      // Trigger immediate download
      if (selectedResource) {
        setTimeout(() => {
          triggerDownload(
            selectedResource.documentUrl,
            `${selectedResource.title.replace(/\s+/g, '-')}.pdf`,
          );
        }, 500);
      }

      // Close modal after a short feedback period
      setTimeout(() => {
        setShowModal(false);
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  /* ---------------------------------------------------------------------- */
  /*  Render                                                                 */
  /* ---------------------------------------------------------------------- */
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://readdy.ai/api/search-image?query=business%20contracts%20and%20legal%20agreements%20professional%20documents%20with%20signatures%20corporate%20contract%20papers%20on%20desk%20legal%20documentation%20modern%20office%20setting%20with%20contract%20templates&width=1920&height=400&seq=contracts-hero-001&orientation=landscape)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50"></div>
        </div>

        <div className="relative h-full max-w-[1320px] mx-auto px-10 flex flex-col justify-end pb-12">
          <h1
            className="text-5xl font-bold text-white mb-4"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}
          >
            Contracts
          </h1>
          <p
            className="text-white text-xl font-light"
            style={{ textShadow: '0 2px 6px rgba(0,0,0,0.3)' }}
          >
            Standard contract templates and legal agreements
          </p>
        </div>
      </section>

      {/* Sub Navigation Pills */}
      <section className="py-6 bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="flex items-center justify-center flex-wrap gap-3">
            <Link
              to="/resources/contracts"
              className="px-5 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer whitespace-nowrap bg-[#DC2626] text-white border border-[#DC2626]"
            >
              Contracts
            </Link>
            {subMenuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="px-5 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer whitespace-nowrap bg-gray-100 text-[#2C3E50] hover:bg-gray-200 border border-transparent"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Content */}
      <section className="py-24 bg-[#F8F9FA]">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2
              className="text-5xl font-bold text-[#2C3E50]"
              style={{ fontFamily: 'Merriweather, serif' }}
            >
              Contracts
            </h2>
            <p className="text-lg text-[#6C757D] mt-4">
              Access our comprehensive collection of standard contract templates and legal agreements
            </p>
          </div>

          {/* Filter Section */}
          <div className="bg-white rounded-2xl p-6 mb-8 border border-gray-100 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Search Input */}
              <div className="relative flex-1 min-w-[250px]">
                <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-[#6C757D]"></i>
                <input
                  type="text"
                  placeholder="Search contract templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-xl text-sm text-[#2C3E50] placeholder-[#6C757D] focus:outline-none focus:border-[#DC2626] focus:ring-1 focus:ring-[#DC2626] transition-all"
                />
              </div>

              {/* Status Filter */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <span className="text-sm font-medium text-[#2C3E50] whitespace-nowrap">
                  <i className="ri-filter-3-line mr-2 text-[#DC2626]"></i>
                  Status:
                </span>
                <div className="flex items-center gap-2">
                  {(['All', 'Available'] as const).map((status) => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                        statusFilter === status
                          ? status === 'Available'
                            ? 'bg-[#DCFCE7] text-[#16A34A]'
                            : 'bg-[#DC2626] text-white'
                          : 'bg-gray-100 text-[#6C757D] hover:bg-gray-200'
                      }`}
                    >
                      {status === 'Available' && <i className="ri-checkbox-circle-line mr-1.5"></i>}
                      {status === 'All' && <i className="ri-list-check mr-1.5"></i>}
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Year Filter */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <span className="text-sm font-medium text-[#2C3E50] whitespace-nowrap">
                  <i className="ri-calendar-line mr-2 text-[#DC2626]"></i>
                  Year:
                </span>
                <div className="relative">
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="appearance-none bg-gray-100 border border-gray-200 text-[#2C3E50] text-sm font-medium rounded-lg px-4 py-2 pr-10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:border-transparent min-w-[140px]"
                  >
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year === 'All' ? 'All Years' : year}
                      </option>
                    ))}
                  </select>
                  <i className="ri-arrow-down-s-line absolute right-3 top-1/2 -translate-y-1/2 text-[#6C757D] pointer-events-none"></i>
                </div>
              </div>

              {/* Clear Filters */}
              {(searchQuery || selectedYear !== 'All' || statusFilter !== 'All') && (
                <button
                  onClick={clearFilters}
                  className="flex items-center text-sm font-medium text-[#DC2626] hover:text-[#B91C1C] transition-colors cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-close-line mr-1"></i>
                  Clear Filters
                </button>
              )}
            </div>

            {/* Results Count */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-sm text-[#6C757D]">
                Showing{' '}
                <span className="font-semibold text-[#2C3E50]">{filteredResources.length}</span>{' '}
                contract{filteredResources.length !== 1 ? 's' : ''}
                {statusFilter !== 'All' && (
                  <span className="ml-1">
                    with status{' '}
                    <span
                      className={`font-semibold ${
                        statusFilter === 'Available' ? 'text-green-600' : 'text-orange-600'
                      }`}
                    >
                      {statusFilter}
                    </span>
                  </span>
                )}
                {selectedYear !== 'All' && (
                  <span className="ml-1">
                    from <span className="font-semibold text-[#2C3E50]">{selectedYear}</span>
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Resources List */}
          {filteredResources.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-file-search-line text-3xl text-[#6C757D]"></i>
              </div>
              <h3 className="text-xl font-bold text-[#2C3E50] mb-2">No Contracts Found</h3>
              <p className="text-[#6C757D] mb-4">No contracts match your current filter criteria.</p>
              <button
                onClick={clearFilters}
                className="px-6 py-2 bg-[#DC2626] text-white text-sm font-medium rounded-lg cursor-pointer whitespace-nowrap"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {paginatedResources.map((resource, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 hover:shadow-lg transition-all border border-gray-100"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      {/* Icon */}
                      <div className="w-14 h-14 bg-[#FEF2F2] rounded-full flex items-center justify-center flex-shrink-0">
                        <i className={`${resource.icon} text-2xl text-[#DC2626]`}></i>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-[#DCFCE7] text-[#16A34A]">
                            <i className="ri-checkbox-circle-line mr-1"></i>Available
                          </span>
                          <span className="px-3 py-1 bg-gray-100 text-[#6C757D] text-xs font-medium rounded-full">
                            {resource.category}
                          </span>
                          <span className="px-3 py-1 bg-red-50 text-[#DC2626] text-xs font-medium rounded-full flex items-center">
                            <i className="ri-file-line mr-1"></i>
                            {resource.type} • {resource.size}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-[#2C3E50] mb-2">{resource.title}</h3>
                        <div className="flex items-center text-sm text-[#6C757D]">
                          <i className="ri-calendar-line mr-2 text-[#DC2626]"></i>
                          <span>Published: {formatDate(resource.date)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-3 ml-6">
                      <button
                        onClick={() => handleViewResource(resource)}
                        className="px-4 py-2 text-sm font-medium text-[#2C3E50] border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleRequestDownload(resource)}
                        className="px-4 py-2 bg-[#DC2626] text-white text-sm font-medium rounded-lg cursor-pointer whitespace-nowrap flex items-center"
                      >
                        <i className="ri-download-line mr-2"></i>
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-12 flex flex-col items-center gap-4">
              <div className="flex items-center gap-2">
                {/* Previous Button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    currentPage === 1
                      ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                      : 'bg-white text-[#2C3E50] border border-gray-200 hover:bg-gray-50'
                  }`}
                  aria-label="Previous page"
                >
                  <i className="ri-arrow-left-s-line text-lg"></i>
                </button>

                {/* Page Numbers */}
                {getPageNumbers().map((page, idx) =>
                  typeof page === 'string' ? (
                    <span
                      key={`ellipsis-${idx}`}
                      className="w-10 h-10 flex items-center justify-center text-sm text-[#6C757D]"
                    >
                      ...
                    </span>
                  ) : (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                        currentPage === page
                          ? 'bg-[#DC2626] text-white shadow-sm'
                          : 'bg-white text-[#2C3E50] border border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ),
                )}

                {/* Next Button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    currentPage === totalPages
                      ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                      : 'bg-white text-[#2C3E50] border border-gray-200 hover:bg-gray-50'
                  }`}
                  aria-label="Next page"
                >
                  <i className="ri-arrow-right-s-line text-lg"></i>
                </button>
              </div>

              {/* Page Info */}
              <p className="text-sm text-[#6C757D]">
                Showing {(currentPage - 1) * itemsPerPage + 1}–
                {Math.min(currentPage * itemsPerPage, filteredResources.length)} of{' '}
                {filteredResources.length} contracts
              </p>
            </div>
          )}
        </div>
      </section>

      {/* View Resource Modal */}
      {showViewModal && selectedResource && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-[#2C3E50]">Contract Details</h3>
              <button
                onClick={() => setShowViewModal(false)}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>

            <div className="p-8">
              <div className="flex items-center space-x-3 mb-4">
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-[#DCFCE7] text-[#16A34A]">
                  <i className="ri-checkbox-circle-line mr-1"></i>Available
                </span>
                <span className="px-3 py-1 bg-gray-100 text-[#6C757D] text-xs font-medium rounded-full">
                  {selectedResource.category}
                </span>
              </div>

              <h4 className="text-2xl font-bold text-[#2C3E50] mb-4">{selectedResource.title}</h4>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-[#6C757D] mb-1">Published Date</p>
                  <p className="text-sm font-semibold text-[#2C3E50]">
                    {formatDate(selectedResource.date)}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-[#6C757D] mb-1">File Type</p>
                  <p className="text-sm font-semibold text-[#2C3E50]">{selectedResource.type}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-[#6C757D] mb-1">File Size</p>
                  <p className="text-sm font-semibold text-[#2C3E50]">{selectedResource.size}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-[#6C757D] mb-1">Category</p>
                  <p className="text-sm font-semibold text-[#2C3E50]">{selectedResource.category}</p>
                </div>
              </div>

              <div className="mb-6">
                <h5 className="text-sm font-semibold text-[#2C3E50] mb-2">Description</h5>
                <p className="text-sm text-[#6C757D] leading-relaxed">{selectedResource.description}</p>
              </div>

              <div className="flex items-center space-x-3 pt-4 border-t border-gray-100">
                <button
                  onClick={() => handlePreviewDocument(selectedResource.documentUrl)}
                  className="flex-1 py-3 text-[#DC2626] border border-[#DC2626] font-medium rounded-lg hover:bg-red-50 transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center"
                >
                  <i className="ri-eye-line mr-2"></i>
                  Preview Document
                </button>
                <button
                  onClick={() => {
                    setShowViewModal(false);
                    handleRequestDownload(selectedResource);
                  }}
                  className="flex-1 py-3 bg-[#DC2626] text-white font-medium rounded-lg cursor-pointer whitespace-nowrap flex items-center justify-center"
                >
                  <i className="ri-download-line mr-2"></i>
                  Download Document
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Request Download Modal */}
      {showModal && selectedResource && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer z-10"
            >
              <i className="ri-close-line text-2xl"></i>
            </button>

            {submitSuccess ? (
              <div className="text-center py-12 px-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-check-line text-3xl text-green-600"></i>
                </div>
                <h3 className="text-2xl font-bold text-[#2C3E50] mb-2">Download Started!</h3>
                <p className="text-[#6C757D] mb-4">Your contract document is being downloaded.</p>
                <div className="flex items-center justify-center text-sm text-[#6C757D] mb-6">
                  <i className="ri-file-pdf-line text-[#DC2626] mr-2"></i>
                  {selectedResource.title.replace(/\s+/g, '-')}.pdf
                </div>

                {/* Email Notification Confirmation */}
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mt-4">
                  <div className="flex items-center justify-center mb-2">
                    <div className="w-8 h-8 flex items-center justify-center bg-blue-100 rounded-full mr-3">
                      <i className="ri-mail-check-line text-blue-600"></i>
                    </div>
                    <span className="text-sm font-semibold text-blue-800">
                      Email Confirmation Sent
                    </span>
                  </div>
                  <p className="text-xs text-blue-600">
                    A confirmation email has been sent to{' '}
                    <span className="font-semibold">{formData.email}</span> with the contract
                    details and download link.
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-8">
                <h3 className="text-2xl font-bold text-[#2C3E50] mb-2">Download Contract</h3>
                <p className="text-sm text-[#6C757D] mb-1">
                  Contract: <span className="font-semibold">{selectedResource.title}</span>
                </p>
                <p className="text-sm text-[#6C757D] mb-6">
                  Please fill out the form below to download the contract document.
                </p>

                <form
                  id="contracts-request-form"
                  data-readdy-form
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  {/* Company Name */}
                  <div>
                    <label className="block text-sm font-medium text-[#2C3E50] mb-1">
                      Company Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#DC2626] ${
                        errors.companyName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter company name"
                    />
                    {errors.companyName && (
                      <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>
                    )}
                  </div>

                  {/* Contact Person */}
                  <div>
                    <label className="block text-sm font-medium text-[#2C3E50] mb-1">
                      Contact Person <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#DC2626] ${
                        errors.contactPerson ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter contact person name"
                    />
                    {errors.contactPerson && (
                      <p className="text-red-500 text-xs mt-1">{errors.contactPerson}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-[#2C3E50] mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#DC2626] ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter email address"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-[#2C3E50] mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#DC2626] ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter phone number"
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm font-medium text-[#2C3E50] mb-1">
                      Address <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={3}
                      maxLength={500}
                      className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#DC2626] resize-none ${
                        errors.address ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter company address"
                    />
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                  </div>

                  {/* CAPTCHA */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <label className="block text-sm font-medium text-[#2C3E50] mb-3">
                      Security Verification <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center bg-white border border-gray-200 rounded-lg px-4 py-3 select-none">
                        <span className="text-lg font-bold text-[#2C3E50]">
                          {captcha.num1} {captcha.operator} {captcha.num2} = ?
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={generateCaptcha}
                        className="w-10 h-10 flex items-center justify-center text-[#6C757D] hover:text-[#DC2626] transition-colors cursor-pointer"
                        title="Refresh captcha"
                      >
                        <i className="ri-refresh-line text-xl"></i>
                      </button>
                    </div>
                    <input
                      type="text"
                      name="captchaAnswer"
                      value={formData.captchaAnswer}
                      onChange={handleInputChange}
                      className={`w-full mt-3 px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#DC2626] ${
                        errors.captchaAnswer ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your answer"
                    />
                    {errors.captchaAnswer && (
                      <p className="text-red-500 text-xs mt-1">{errors.captchaAnswer}</p>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-[#DC2626] text-white font-medium rounded-lg cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <i className="ri-loader-4-line animate-spin mr-2"></i>
                        Processing...
                      </>
                    ) : (
                      <>
                        <i className="ri-download-line mr-2"></i>
                        Submit &amp; Download
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      <BackToTop />
      <Footer />
    </div>
  );
};

export default ContractsPage;
