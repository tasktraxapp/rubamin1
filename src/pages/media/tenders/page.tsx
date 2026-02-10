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

/** Shape of a tender object */
interface Tender {
  id: string;
  title: string;
  postingDate: string;
  closingDate: string;
  location: string;
  status: 'Open' | 'Closed';
  category: string;
  description: string;
  documentUrl: string;
  fileSize: string;
  requirements: string[];
}

/* -------------------------------------------------------------------------- */
/*  Component                                                               */
/* -------------------------------------------------------------------------- */
const TendersPage: React.FC = () => {
  /* ---------------------------------------------------------------------- */
  /*  Static data (tenders)                                                 */
  /* ---------------------------------------------------------------------- */
  const tenders: Tender[] = [
    {
      id: 'T-2024-001',
      title: 'Supply and Installation of New Oxygen Compressor',
      postingDate: '2024-03-15',
      closingDate: '2024-04-15',
      location: 'Lubumbashi',
      status: 'Open',
      category: 'Equipment',
      description:
        'Tender for supply and installation of advanced oxygen compressor for industrial gas production facility. The scope includes delivery, installation, commissioning, and training of operational staff.',
      documentUrl:
        'https://www.africau.edu/images/default/sample.pdf',
      fileSize: '2.4 MB',
      requirements: [
        'Valid business registration',
        'Minimum 5 years experience',
        'ISO 9001 certification',
        'Financial capability proof',
      ],
    },
    {
      id: 'T-2024-002',
      title: 'Transportation Services Contract',
      postingDate: '2024-03-10',
      closingDate: '2024-04-10',
      location: 'Lubumbashi',
      status: 'Open',
      category: 'Services',
      description:
        'Three-year contract for transportation of raw materials and finished products. Includes fleet management, logistics coordination, and delivery tracking systems.',
      documentUrl:
        'https://scholar.harvard.edu/files/torman_personal/files/samplepptx.pdf',
      fileSize: '1.8 MB',
      requirements: [
        'Fleet of minimum 10 vehicles',
        'Valid transport license',
        'Insurance coverage',
        'GPS tracking capability',
      ],
    },
    {
      id: 'T-2024-003',
      title: 'IT Infrastructure Upgrade',
      postingDate: '2024-03-05',
      closingDate: '2024-04-05',
      location: 'Lubumbashi',
      status: 'Open',
      category: 'IT',
      description:
        'Comprehensive IT infrastructure upgrade including servers, networking, and security systems. Project includes hardware procurement, installation, and 2-year maintenance support.',
      documentUrl:
        'https://www.orimi.com/pdf-test.pdf',
      fileSize: '3.1 MB',
      requirements: [
        'IT certification (Cisco, Microsoft)',
        'Previous enterprise projects',
        'Local support team',
        '24/7 support capability',
      ],
    },
    {
      id: 'T-2024-004',
      title: 'Safety Equipment Supply',
      postingDate: '2024-02-28',
      closingDate: '2024-03-28',
      location: 'Lubumbashi',
      status: 'Open',
      category: 'Equipment',
      description:
        'Supply of personal protective equipment and safety gear for all production facilities. Includes helmets, gloves, safety boots, protective clothing, and respiratory equipment.',
      documentUrl:
        'https://www.clickdimensions.com/links/TestPDFDocument.pdf',
      fileSize: '1.5 MB',
      requirements: [
        'CE/ISO certified products',
        'Bulk supply capability',
        'Quality assurance documentation',
        'After-sales support',
      ],
    },
    {
      id: 'T-2024-005',
      title: 'Environmental Monitoring Services',
      postingDate: '2024-02-20',
      closingDate: '2024-03-20',
      location: 'Lubumbashi',
      status: 'Open',
      category: 'Services',
      description:
        'Annual contract for environmental monitoring and compliance reporting services. Includes air quality, water quality, soil testing, and regulatory compliance documentation.',
      documentUrl:
        'https://www.africau.edu/images/default/sample.pdf',
      fileSize: '2.2 MB',
      requirements: [
        'Accredited laboratory',
        'Environmental certifications',
        'Experienced environmental scientists',
        'Reporting software',
      ],
    },
    {
      id: 'T-2023-015',
      title: 'Facility Maintenance Services',
      postingDate: '2023-11-15',
      closingDate: '2023-12-31',
      location: 'Lubumbashi',
      status: 'Closed',
      category: 'Services',
      description: 'Annual maintenance contract for production facilities and equipment.',
      documentUrl:
        'https://scholar.harvard.edu/files/torman_personal/files/samplepptx.pdf',
      fileSize: '1.9 MB',
      requirements: ['Technical expertise', 'Maintenance experience', 'Emergency response capability'],
    },
    {
      id: 'T-2023-014',
      title: 'Laboratory Equipment Supply',
      postingDate: '2023-11-01',
      closingDate: '2023-12-15',
      location: 'Lubumbashi',
      status: 'Closed',
      category: 'Equipment',
      description:
        'Supply of advanced laboratory testing equipment for quality control department.',
      documentUrl:
        'https://www.orimi.com/pdf-test.pdf',
      fileSize: '2.7 MB',
      requirements: ['Authorized distributor', 'Installation support', 'Training provision'],
    },
    {
      id: 'T-2023-013',
      title: 'Security Services Contract',
      postingDate: '2023-10-15',
      closingDate: '2023-11-30',
      location: 'Lubumbashi',
      status: 'Closed',
      category: 'Services',
      description:
        'Two-year contract for comprehensive security services at all company facilities.',
      documentUrl:
        'https://www.clickdimensions.com/links/TestPDFDocument.pdf',
      fileSize: '1.6 MB',
      requirements: ['Security license', 'Trained personnel', 'Surveillance equipment'],
    },
  ];

  /* ---------------------------------------------------------------------- */
  /*  Component state                                                       */
  /* ---------------------------------------------------------------------- */
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedTender, setSelectedTender] = useState<Tender | null>(null);
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

  /* Filter state */
  const [statusFilter, setStatusFilter] = useState<'All' | 'Open' | 'Closed'>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  /* Extract unique categories */
  const categories = ['All', ...Array.from(new Set(tenders.map((t) => t.category)))];

  /* Filter tenders based on selected filters */
  const filteredTenders = tenders.filter((tender) => {
    const matchesStatus = statusFilter === 'All' || tender.status === statusFilter;
    const matchesCategory = categoryFilter === 'All' || tender.category === categoryFilter;
    return matchesStatus && matchesCategory;
  });

  /* Pagination state */
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredTenders.length / itemsPerPage);
  const paginatedTenders = filteredTenders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  /* Reset to page 1 when filters change */
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, categoryFilter]);

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

  /* ---------------------------------------------------------------------- */
  /*  Helpers & utilities                                                   */
  /* ---------------------------------------------------------------------- */
  const subMenuItems = [
    { label: 'Notices', path: '/media/notices' },
    { label: 'Tenders', path: '/media/tenders' },
  ];

  const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-');
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

  const handleRequestDownload = (tender: Tender) => {
    setSelectedTender(tender);
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

  const handleViewTender = (tender: Tender) => {
    setSelectedTender(tender);
    setShowViewModal(true);
  };

  const handlePreviewDocument = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
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
      formBody.append('tenderId', selectedTender?.id ?? '');

      await fetch('https://readdy.ai/api/form/d62eup0v3sjav1bavii0', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody.toString(),
      });

      setSubmitSuccess(true);

      // Trigger immediate download
      if (selectedTender) {
        setTimeout(() => {
          triggerDownload(selectedTender.documentUrl, `${selectedTender.id}-Tender-Document.pdf`);
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
              'url(https://readdy.ai/api/search-image?query=professional%20business%20tender%20documents%20and%20contracts%20on%20modern%20desk%20with%20laptop%20and%20official%20papers%20representing%20corporate%20procurement%20and%20bidding%20process%20clean%20organized%20business%20environment&width=1920&height=400&seq=tenders-hero-001&orientation=landscape)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50"></div>
        </div>

        <div className="relative h-full max-w-[1320px] mx-auto px-10 flex flex-col justify-end pb-12">
          <h1 className="text-5xl font-bold text-white mb-4" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
            Active Tenders
          </h1>
          <p className="text-white text-xl font-light" style={{ textShadow: '0 2px 6px rgba(0,0,0,0.3)' }}>
            Current procurement opportunities and bidding information
          </p>
        </div>
      </section>

      {/* Sub Navigation Pills */}
      <section className="py-6 bg-white border-b border-gray-100">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="flex items-center justify-center flex-wrap gap-3">
            {subMenuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                  item.path === '/media/tenders'
                    ? 'bg-[#DC2626] text-white'
                    : 'bg-gray-100 text-[#2C3E50] hover:bg-gray-200'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tenders Content */}
      <section className="py-24 bg-[#F8F9FA]">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-[#2C3E50]" style={{ fontFamily: 'Merriweather, serif' }}>
              Procurement Opportunities
            </h2>
            <p className="text-lg text-[#6C757D] mt-4">
              Explore current tender opportunities and submit your proposals
            </p>
          </div>

          {/* Filter Section */}
          <div className="bg-white rounded-2xl p-6 mb-8 border border-gray-100 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Status Filter */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <span className="text-sm font-medium text-[#2C3E50] whitespace-nowrap">
                  <i className="ri-filter-3-line mr-2 text-[#DC2626]"></i>
                  Status:
                </span>
                <div className="flex items-center gap-2">
                  {(['All', 'Open', 'Closed'] as const).map((status) => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                        statusFilter === status
                          ? status === 'Open'
                            ? 'bg-green-500 text-white'
                            : status === 'Closed'
                            ? 'bg-gray-500 text-white'
                            : 'bg-[#DC2626] text-white'
                          : 'bg-gray-100 text-[#6C757D] hover:bg-gray-200'
                      }`}
                    >
                      {status === 'Open' && <i className="ri-checkbox-circle-line mr-1.5"></i>}
                      {status === 'Closed' && <i className="ri-close-circle-line mr-1.5"></i>}
                      {status === 'All' && <i className="ri-list-check mr-1.5"></i>}
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <span className="text-sm font-medium text-[#2C3E50] whitespace-nowrap">
                  <i className="ri-folder-line mr-2 text-[#DC2626]"></i>
                  Category:
                </span>
                <div className="relative">
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="appearance-none bg-gray-100 border border-gray-200 text-[#2C3E50] text-sm font-medium rounded-lg px-4 py-2 pr-10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:border-transparent min-w-[140px]"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <i className="ri-arrow-down-s-line absolute right-3 top-1/2 -translate-y-1/2 text-[#6C757D] pointer-events-none"></i>
                </div>
              </div>

              {/* Clear Filters */}
              {(statusFilter !== 'All' || categoryFilter !== 'All') && (
                <button
                  onClick={() => {
                    setStatusFilter('All');
                    setCategoryFilter('All');
                  }}
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
                Showing <span className="font-semibold text-[#2C3E50]">{filteredTenders.length}</span> tender{filteredTenders.length !== 1 ? 's' : ''}
                {statusFilter !== 'All' && (
                  <span className="ml-1">
                    with status <span className={`font-semibold ${statusFilter === 'Open' ? 'text-green-600' : 'text-gray-600'}`}>{statusFilter}</span>
                  </span>
                )}
                {categoryFilter !== 'All' && (
                  <span className="ml-1">
                    in <span className="font-semibold text-[#2C3E50]">{categoryFilter}</span> category
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Tenders List */}
          {filteredTenders.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-file-search-line text-3xl text-[#6C757D]"></i>
              </div>
              <h3 className="text-xl font-bold text-[#2C3E50] mb-2">No Tenders Found</h3>
              <p className="text-[#6C757D] mb-4">
                No tenders match your current filter criteria.
              </p>
              <button
                onClick={() => {
                  setStatusFilter('All');
                  setCategoryFilter('All');
                }}
                className="px-6 py-2 bg-[#DC2626] text-white text-sm font-medium rounded-lg hover:bg-[#B91C1C] transition-colors cursor-pointer whitespace-nowrap"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {paginatedTenders.map((tender, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 hover:shadow-lg transition-all border border-gray-100">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <span className="text-sm font-semibold text-[#2C3E50]">{tender.id}</span>
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full ${
                            tender.status === 'Open' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          {tender.status}
                        </span>
                        <span className="px-3 py-1 bg-gray-100 text-[#6C757D] text-xs font-medium rounded-full">
                          {tender.category}
                        </span>
                        <span className="px-3 py-1 bg-red-50 text-[#DC2626] text-xs font-medium rounded-full flex items-center">
                          <i className="ri-file-pdf-line mr-1"></i>
                          {tender.fileSize}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-[#2C3E50] mb-3">{tender.title}</h3>
                      <div className="flex items-center flex-wrap gap-x-6 gap-y-2 text-sm text-[#6C757D]">
                        <div className="flex items-center">
                          <i className="ri-calendar-line mr-2 text-[#DC2626]"></i>
                          <span>Posting Date: {formatDate(tender.postingDate)}</span>
                        </div>
                        <div className="flex items-center">
                          <i className="ri-calendar-check-line mr-2 text-[#DC2626]"></i>
                          <span>Closing: {formatDate(tender.closingDate)}</span>
                        </div>
                        <div className="flex items-center">
                          <i className="ri-map-pin-line mr-2 text-[#DC2626]"></i>
                          <span>Location: {tender.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 ml-6">
                      <button
                        onClick={() => handleViewTender(tender)}
                        className="px-4 py-2 text-sm font-medium text-[#2C3E50] border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
                      >
                        View
                      </button>
                      {tender.status === 'Open' && (
                        <button
                          onClick={() => handleRequestDownload(tender)}
                          className="px-4 py-2 bg-[#DC2626] text-white text-sm font-medium rounded-lg cursor-pointer whitespace-nowrap flex items-center"
                        >
                          <i className="ri-download-line mr-2"></i>
                          Download
                        </button>
                      )}
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
                {Math.min(currentPage * itemsPerPage, filteredTenders.length)} of{' '}
                {filteredTenders.length} tenders
              </p>
            </div>
          )}
        </div>
      </section>

      {/* View Tender Modal */}
      {showViewModal && selectedTender && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-[#2C3E50]">Tender Details</h3>
              <button
                onClick={() => setShowViewModal(false)}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>

            <div className="p-8">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-sm font-semibold text-[#2C3E50]">{selectedTender.id}</span>
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    selectedTender.status === 'Open' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {selectedTender.status}
                </span>
                <span className="px-3 py-1 bg-gray-100 text-[#6C757D] text-xs font-medium rounded-full">
                  {selectedTender.category}
                </span>
              </div>

              <h4 className="text-2xl font-bold text-[#2C3E50] mb-4">{selectedTender.title}</h4>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-[#6C757D] mb-1">Posting Date</p>
                  <p className="text-sm font-semibold text-[#2C3E50]">{formatDate(selectedTender.postingDate)}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-[#6C757D] mb-1">Closing Date</p>
                  <p className="text-sm font-semibold text-[#2C3E50]">{formatDate(selectedTender.closingDate)}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-[#6C757D] mb-1">Location</p>
                  <p className="text-sm font-semibold text-[#2C3E50]">{selectedTender.location}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-[#6C757D] mb-1">Document Size</p>
                  <p className="text-sm font-semibold text-[#2C3E50]">{selectedTender.fileSize}</p>
                </div>
              </div>

              <div className="mb-6">
                <h5 className="text-sm font-semibold text-[#2C3E50] mb-2">Description</h5>
                <p className="text-sm text-[#6C757D] leading-relaxed">{selectedTender.description}</p>
              </div>

              <div className="mb-6">
                <h5 className="text-sm font-semibold text-[#2C3E50] mb-3">Requirements</h5>
                <ul className="space-y-2">
                  {selectedTender.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start text-sm text-[#6C757D]">
                      <i className="ri-checkbox-circle-line text-green-500 mr-2 mt-0.5"></i>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center space-x-3 pt-4 border-t border-gray-100">
                <button
                  onClick={() => handlePreviewDocument(selectedTender.documentUrl)}
                  className="flex-1 py-3 text-[#DC2626] border border-[#DC2626] font-medium rounded-lg hover:bg-red-50 transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center"
                >
                  <i className="ri-eye-line mr-2"></i>
                  Preview Document
                </button>
                {selectedTender.status === 'Open' ? (
                  <button
                    onClick={() => {
                      setShowViewModal(false);
                      handleRequestDownload(selectedTender);
                    }}
                    className="flex-1 py-3 bg-[#DC2626] text-white font-medium rounded-lg cursor-pointer whitespace-nowrap flex items-center justify-center"
                  >
                    <i className="ri-download-line mr-2"></i>
                    Download Document
                  </button>
                ) : (
                  <div className="flex-1 py-3 bg-gray-100 text-gray-500 font-medium rounded-lg text-center">
                    This tender is closed
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Request Download Modal */}
      {showModal && selectedTender && (
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
                <p className="text-[#6C757D] mb-4">Your tender document is being downloaded.</p>
                <div className="flex items-center justify-center text-sm text-[#6C757D] mb-6">
                  <i className="ri-file-pdf-line text-[#DC2626] mr-2"></i>
                  {selectedTender.id}-Tender-Document.pdf
                </div>
                
                {/* Email Notification Confirmation */}
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mt-4">
                  <div className="flex items-center justify-center mb-2">
                    <div className="w-8 h-8 flex items-center justify-center bg-blue-100 rounded-full mr-3">
                      <i className="ri-mail-check-line text-blue-600"></i>
                    </div>
                    <span className="text-sm font-semibold text-blue-800">Email Confirmation Sent</span>
                  </div>
                  <p className="text-xs text-blue-600">
                    A confirmation email has been sent to <span className="font-semibold">{formData.email}</span> with the tender details and download link.
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-8">
                <h3 className="text-2xl font-bold text-[#2C3E50] mb-2">Download Tender Document</h3>
                <p className="text-sm text-[#6C757D] mb-1">
                  Tender ID: <span className="font-semibold">{selectedTender.id}</span>
                </p>
                <p className="text-sm text-[#6C757D] mb-6">
                  Please fill out the form below to download the tender document.
                </p>

                <form
                  id="tender-request-form"
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
                    className="w-full py-3 bg-[#DC2626] text-white font-medium rounded-lg hover:bg-[#B91C1C] transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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

export default TendersPage;
