import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../../components/feature/Header';
import { Footer } from '../../components/feature/Footer';

const CSRPage: React.FC = () => {
  const subMenuItems = [
    { label: 'Social Initiatives', path: '/csr/social-initiatives' },
    { label: 'CSR', path: '/csr' },
    { label: 'DOT', path: '/csr/dot' },
  ];

  const csrPillars = [
    {
      icon: 'ri-heart-3-line',
      title: 'Social Initiatives',
      description: 'Comprehensive programs in education, healthcare, housing, and women empowerment that transform lives and build stronger communities.',
      link: '/csr/social-initiatives',
      image: 'https://readdy.ai/api/search-image?query=community%20volunteers%20helping%20African%20villagers%20with%20social%20development%20programs%20people%20working%20together%20building%20infrastructure%20education%20healthcare%20support%20bright%20sunny%20day%20positive%20atmosphere&width=600&height=400&seq=csr-pillar-001&orientation=landscape',
      stats: [
        { value: '15+', label: 'Communities' },
        { value: '3,500+', label: 'Beneficiaries' },
      ],
    },
    {
      icon: 'ri-funds-line',
      title: 'DOT - Dotation to Community',
      description: '0.3% of our annual turnover dedicated directly to community development projects, ensuring sustainable and meaningful impact.',
      link: '/csr/dot',
      image: 'https://readdy.ai/api/search-image?query=corporate%20executives%20presenting%20large%20donation%20check%20to%20African%20community%20leaders%20official%20ceremony%20community%20development%20fund%20handover%20professional%20setting%20with%20company%20banners%20and%20community%20members%20celebrating&width=600&height=400&seq=csr-pillar-002&orientation=landscape',
      stats: [
        { value: '$1.5M+', label: 'Total Contributions' },
        { value: '50+', label: 'Projects Funded' },
      ],
    },
  ];

  const impactAreas = [
    {
      icon: 'ri-graduation-cap-line',
      title: 'Education',
      description: 'Schools, scholarships, and educational materials',
      color: 'bg-amber-50',
      iconColor: 'text-amber-600',
    },
    {
      icon: 'ri-hospital-line',
      title: 'Healthcare',
      description: 'Medical facilities and health programs',
      color: 'bg-teal-50',
      iconColor: 'text-teal-600',
    },
    {
      icon: 'ri-building-line',
      title: 'Infrastructure',
      description: 'Roads, bridges, and public facilities',
      color: 'bg-indigo-50',
      iconColor: 'text-indigo-600',
    },
    {
      icon: 'ri-women-line',
      title: 'Empowerment',
      description: 'Skills training and microfinance support',
      color: 'bg-rose-50',
      iconColor: 'text-rose-600',
    },
    {
      icon: 'ri-water-flash-line',
      title: 'Utilities',
      description: 'Water supply and electrification projects',
      color: 'bg-cyan-50',
      iconColor: 'text-cyan-600',
    },
    {
      icon: 'ri-plant-line',
      title: 'Agriculture',
      description: 'Farming equipment and training programs',
      color: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
    },
  ];

  const recentHighlights = [
    {
      title: 'Primary School Construction',
      date: 'April 2024',
      location: 'Lubumbashi Education Zone',
      image: 'https://readdy.ai/api/search-image?query=newly%20constructed%20primary%20school%20building%20in%20African%20village%20with%20children%20playing%20outside%20modern%20architecture%20community%20development%20project%20bright%20sunny%20day&width=400&height=300&seq=csr-highlight-001&orientation=landscape',
    },
    {
      title: 'Free Medical Camp',
      date: 'March 2024',
      location: 'Kipushi Community Center',
      image: 'https://readdy.ai/api/search-image?query=medical%20team%20providing%20free%20health%20checkup%20to%20African%20community%20members%20mobile%20clinic%20setting%20professional%20healthcare%20workers%20examining%20patients&width=400&height=300&seq=csr-highlight-002&orientation=landscape',
    },
    {
      title: 'Clean Water Project',
      date: 'February 2024',
      location: 'Kasumbalesa Village',
      image: 'https://readdy.ai/api/search-image?query=community%20water%20project%20inauguration%20clean%20water%20facility%20African%20village%20celebration%20happy%20community%20members%20gathering%20around%20new%20water%20pump&width=400&height=300&seq=csr-highlight-003&orientation=landscape',
    },
    {
      title: 'Women Vocational Training',
      date: 'March 2024',
      location: 'Lubumbashi Training Center',
      image: 'https://readdy.ai/api/search-image?query=African%20women%20in%20vocational%20training%20workshop%20learning%20sewing%20and%20tailoring%20skills%20empowerment%20program%20bright%20indoor%20setting%20with%20equipment&width=400&height=300&seq=csr-highlight-004&orientation=landscape',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://readdy.ai/api/search-image?query=corporate%20social%20responsibility%20community%20development%20African%20village%20with%20happy%20people%20receiving%20support%20from%20company%20representatives%20education%20healthcare%20infrastructure%20projects%20modern%20professional%20setting%20with%20warm%20atmosphere&width=1920&height=400&seq=csr-hero-001&orientation=landscape)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50"></div>
        </div>

        <div className="relative h-full max-w-[1320px] mx-auto px-10 flex flex-col justify-end pb-16">
          <p className="text-sm uppercase tracking-[3px] text-white/80 font-semibold mb-4">Corporate Social Responsibility</p>
          <h1 className="text-5xl font-bold text-white mb-4" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
            Building Communities, Transforming Lives
          </h1>
          <p className="text-white text-xl font-light max-w-2xl" style={{ textShadow: '0 2px 6px rgba(0,0,0,0.3)' }}>
            Our commitment to sustainable development and social responsibility drives meaningful change in the communities where we operate.
          </p>
        </div>
      </section>

      {/* Sub Navigation Pills */}
      <section className="py-6 bg-white border-b border-gray-100">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="flex items-center flex-wrap gap-3">
            {subMenuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                  item.path === '/csr'
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

      {/* Introduction */}
      <section className="py-24 bg-white">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm uppercase tracking-[2px] text-[#DC2626] font-semibold mb-5">Our Philosophy</p>
            <h2 className="text-5xl font-bold text-[#2C3E50] mb-8" style={{ fontFamily: 'Merriweather, serif' }}>
              Responsible Business, Lasting Impact
            </h2>
            <p className="text-lg text-[#6C757D] leading-relaxed mb-6">
              At RUBAMIN SARL, we believe that true success is measured not just by financial performance, but by the positive impact we create in the communities around us. Our Corporate Social Responsibility initiatives are designed to address real needs and create sustainable, long-term benefits.
            </p>
            <p className="text-lg text-[#6C757D] leading-relaxed">
              Through strategic partnerships, transparent governance, and community-driven project selection, we ensure that every initiative delivers meaningful results that transform lives and build stronger communities.
            </p>
          </div>
        </div>
      </section>

      {/* CSR Pillars */}
      <section className="py-24 bg-[#F8F9FA]">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[2px] text-[#DC2626] font-semibold mb-5">Our Programs</p>
            <h2 className="text-5xl font-bold text-[#2C3E50]" style={{ fontFamily: 'Merriweather, serif' }}>
              CSR Pillars
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-10">
            {csrPillars.map((pillar, index) => (
              <Link
                key={index}
                to={pillar.link}
                className="group bg-white rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-[#FEF2F2] rounded-full flex items-center justify-center">
                      <i className={`${pillar.icon} text-3xl text-[#DC2626]`}></i>
                    </div>
                    <h3 className="text-2xl font-bold text-[#2C3E50] group-hover:text-[#DC2626] transition-colors">{pillar.title}</h3>
                  </div>
                  <p className="text-[#6C757D] leading-relaxed mb-8">{pillar.description}</p>
                  <div className="flex items-center gap-8 pt-6 border-t border-gray-100">
                    {pillar.stats.map((stat, sIndex) => (
                      <div key={sIndex}>
                        <div className="text-2xl font-bold text-[#DC2626]">{stat.value}</div>
                        <p className="text-sm text-[#6C757D]">{stat.label}</p>
                      </div>
                    ))}
                    <div className="ml-auto">
                      <span className="inline-flex items-center gap-2 text-[#DC2626] font-medium group-hover:gap-3 transition-all">
                        Learn More
                        <i className="ri-arrow-right-line"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Areas */}
      <section className="py-24 bg-white">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[2px] text-[#DC2626] font-semibold mb-5">Focus Areas</p>
            <h2 className="text-5xl font-bold text-[#2C3E50]" style={{ fontFamily: 'Merriweather, serif' }}>
              Where We Make a Difference
            </h2>
          </div>

          <div className="grid grid-cols-6 gap-6">
            {impactAreas.map((area, index) => (
              <div key={index} className={`${area.color} rounded-2xl p-6 text-center hover:shadow-lg transition-all`}>
                <div className={`w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <i className={`${area.icon} text-2xl ${area.iconColor}`}></i>
                </div>
                <h3 className="text-base font-bold text-[#2C3E50] mb-2">{area.title}</h3>
                <p className="text-xs text-[#6C757D] leading-relaxed">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Statistics */}
      <section className="py-24 bg-[#2C3E50]">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[2px] text-[#DC2626] font-semibold mb-5">Our Impact</p>
            <h2 className="text-5xl font-bold text-white" style={{ fontFamily: 'Merriweather, serif' }}>
              CSR by the Numbers
            </h2>
          </div>

          <div className="grid grid-cols-5 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-[#DC2626] mb-3">$1.5M+</div>
              <p className="text-white/80">Total Investment</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-[#DC2626] mb-3">15+</div>
              <p className="text-white/80">Communities Served</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-[#DC2626] mb-3">3,500+</div>
              <p className="text-white/80">Direct Beneficiaries</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-[#DC2626] mb-3">50+</div>
              <p className="text-white/80">Active Programs</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-[#DC2626] mb-3">8</div>
              <p className="text-white/80">Years of Service</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Highlights */}
      <section className="py-24 bg-[#F8F9FA]">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[2px] text-[#DC2626] font-semibold mb-5">Recent Activities</p>
            <h2 className="text-5xl font-bold text-[#2C3E50]" style={{ fontFamily: 'Merriweather, serif' }}>
              Latest Highlights
            </h2>
          </div>

          <div className="grid grid-cols-4 gap-6">
            {recentHighlights.map((highlight, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all group">
                <div className="h-48 overflow-hidden">
                  <img
                    src={highlight.image}
                    alt={highlight.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-[#6C757D] mb-2">
                    <i className="ri-calendar-line"></i>
                    <span>{highlight.date}</span>
                  </div>
                  <h3 className="text-base font-bold text-[#2C3E50] mb-2 group-hover:text-[#DC2626] transition-colors">{highlight.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-[#6C757D]">
                    <i className="ri-map-pin-line"></i>
                    <span>{highlight.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-12 gap-4">
            <Link
              to="/csr/social-initiatives"
              className="px-8 py-3 bg-[#DC2626] text-white rounded-full font-medium hover:bg-[#B91C1C] transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2"
            >
              <span>View Social Initiatives</span>
              <i className="ri-arrow-right-line"></i>
            </Link>
            <Link
              to="/csr/dot"
              className="px-8 py-3 bg-white text-[#2C3E50] border border-gray-200 rounded-full font-medium hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2"
            >
              <span>Explore DOT Program</span>
              <i className="ri-arrow-right-line"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[2px] text-[#DC2626] font-semibold mb-5">Photo Gallery</p>
            <h2 className="text-5xl font-bold text-[#2C3E50]" style={{ fontFamily: 'Merriweather, serif' }}>
              CSR in Action
            </h2>
            <p className="text-lg text-[#6C757D] mt-4 max-w-2xl mx-auto">
              Capturing moments of impact and transformation across our community initiatives
            </p>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {/* Large featured image */}
            <div className="col-span-2 row-span-2 relative group overflow-hidden rounded-2xl cursor-pointer">
              <img
                src="https://readdy.ai/api/search-image?query=corporate%20social%20responsibility%20event%20African%20community%20celebration%20with%20company%20representatives%20handing%20over%20educational%20supplies%20to%20school%20children%20bright%20outdoor%20setting%20with%20banners%20and%20happy%20faces%20professional%20photography&width=800&height=600&seq=csr-gallery-001&orientation=landscape"
                alt="School Supplies Donation"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h4 className="font-bold text-lg">School Supplies Donation</h4>
                <p className="text-sm text-white/80">Lubumbashi Education Zone</p>
              </div>
            </div>

            {/* Regular images */}
            <div className="relative group overflow-hidden rounded-2xl cursor-pointer h-[200px]">
              <img
                src="https://readdy.ai/api/search-image?query=medical%20outreach%20program%20African%20village%20doctors%20examining%20patients%20free%20health%20camp%20community%20healthcare%20initiative%20professional%20medical%20team%20with%20equipment%20outdoor%20setting&width=400&height=300&seq=csr-gallery-002&orientation=landscape"
                alt="Medical Outreach"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h4 className="font-bold text-sm">Medical Outreach</h4>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-2xl cursor-pointer h-[200px]">
              <img
                src="https://readdy.ai/api/search-image?query=water%20well%20inauguration%20ceremony%20African%20village%20community%20members%20celebrating%20clean%20water%20access%20new%20borehole%20installation%20with%20company%20representatives%20ribbon%20cutting%20event&width=400&height=300&seq=csr-gallery-003&orientation=landscape"
                alt="Water Well Inauguration"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h4 className="font-bold text-sm">Water Well Inauguration</h4>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-2xl cursor-pointer h-[200px]">
              <img
                src="https://readdy.ai/api/search-image?query=women%20empowerment%20training%20workshop%20African%20women%20learning%20vocational%20skills%20sewing%20machines%20tailoring%20class%20indoor%20training%20center%20bright%20lighting%20professional%20instruction&width=400&height=300&seq=csr-gallery-004&orientation=landscape"
                alt="Women Empowerment Training"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h4 className="font-bold text-sm">Women Empowerment</h4>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-2xl cursor-pointer h-[200px]">
              <img
                src="https://readdy.ai/api/search-image?query=road%20construction%20project%20African%20village%20new%20infrastructure%20development%20gravel%20road%20being%20built%20with%20heavy%20machinery%20community%20development%20workers%20and%20equipment&width=400&height=300&seq=csr-gallery-005&orientation=landscape"
                alt="Road Construction"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h4 className="font-bold text-sm">Road Construction</h4>
              </div>
            </div>

            {/* Second row of regular images */}
            <div className="relative group overflow-hidden rounded-2xl cursor-pointer h-[200px]">
              <img
                src="https://readdy.ai/api/search-image?query=agricultural%20support%20program%20African%20farmers%20receiving%20farming%20equipment%20seeds%20and%20tools%20community%20agriculture%20initiative%20rural%20development%20sunny%20outdoor%20setting&width=400&height=300&seq=csr-gallery-006&orientation=landscape"
                alt="Agricultural Support"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h4 className="font-bold text-sm">Agricultural Support</h4>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-2xl cursor-pointer h-[200px]">
              <img
                src="https://readdy.ai/api/search-image?query=school%20building%20construction%20African%20village%20new%20classroom%20block%20being%20built%20community%20education%20infrastructure%20development%20workers%20and%20building%20materials&width=400&height=300&seq=csr-gallery-007&orientation=landscape"
                alt="School Construction"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h4 className="font-bold text-sm">School Construction</h4>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-2xl cursor-pointer h-[200px]">
              <img
                src="https://readdy.ai/api/search-image?query=community%20health%20awareness%20campaign%20African%20village%20health%20education%20session%20with%20posters%20and%20presentations%20local%20community%20members%20attending%20outdoor%20gathering&width=400&height=300&seq=csr-gallery-008&orientation=landscape"
                alt="Health Awareness Campaign"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h4 className="font-bold text-sm">Health Awareness</h4>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-2xl cursor-pointer h-[200px]">
              <img
                src="https://readdy.ai/api/search-image?query=solar%20panel%20installation%20African%20village%20electrification%20project%20renewable%20energy%20community%20development%20technicians%20installing%20solar%20equipment%20on%20rooftop&width=400&height=300&seq=csr-gallery-009&orientation=landscape"
                alt="Solar Electrification"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h4 className="font-bold text-sm">Solar Electrification</h4>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-12">
            <Link
              to="/gallery"
              className="px-8 py-3 bg-[#2C3E50] text-white rounded-full font-medium hover:bg-[#1a252f] transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2"
            >
              <span>View Full Gallery</span>
              <i className="ri-image-line"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="grid grid-cols-2 gap-16 items-center">
            <div>
              <img
                src="https://readdy.ai/api/search-image?query=corporate%20team%20meeting%20with%20community%20leaders%20discussing%20development%20projects%20professional%20setting%20with%20charts%20and%20plans%20African%20community%20partnership%20collaboration%20modern%20office%20environment&width=700&height=500&seq=csr-commitment-001&orientation=landscape"
                alt="Our Commitment"
                className="w-full h-[500px] object-cover rounded-3xl shadow-lg"
              />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[2px] text-[#DC2626] font-semibold mb-5">Our Commitment</p>
              <h2 className="text-4xl font-bold text-[#2C3E50] mb-8" style={{ fontFamily: 'Merriweather, serif' }}>
                Transparent, Accountable &amp; Community-Driven
              </h2>
              <p className="text-lg text-[#6C757D] leading-relaxed mb-6">
                Our CSR programs are governed by joint committees comprising company representatives and community leaders. All projects are selected through community consultation, ensuring that our initiatives address real needs and create lasting value.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#FEF2F2] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="ri-check-double-line text-xl text-[#DC2626]"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#2C3E50] mb-1">Community Consultation</h4>
                    <p className="text-sm text-[#6C757D]">Projects selected based on community needs and priorities</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#FEF2F2] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="ri-check-double-line text-xl text-[#DC2626]"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#2C3E50] mb-1">Annual Audits</h4>
                    <p className="text-sm text-[#6C757D]">Independent verification of fund utilization and project completion</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#FEF2F2] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="ri-check-double-line text-xl text-[#DC2626]"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#2C3E50] mb-1">Public Reporting</h4>
                    <p className="text-sm text-[#6C757D]">Regular reports published for community transparency</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CSRPage;
