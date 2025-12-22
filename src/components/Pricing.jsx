import { useState, useEffect, useRef } from 'react';

const Pricing = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [key, setKey] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const handleHashChange = () => {
      if (window.location.hash === '#pricing') {
        setIsVisible(false);
        setKey(prev => prev + 1);
        setTimeout(() => setIsVisible(true), 50);
      }
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const packages = [
    {
      title: 'Single Lesson',
      price: '£35',
      period: '/hour',
      features: [
        'Manual transmission',
        'Flexible scheduling',
        'Pick-up & drop-off',
        'Expert instruction'
      ],
      cta: 'Book Now',
      popular: false
    },
    {
      title: '10-Hour Package',
      price: '£330',
      period: '/package',
      features: [
        'Save £20 total',
        'Manual or automatic',
        'Flexible scheduling',
        'Theory test support',
        'Mock test included'
      ],
      cta: 'Book Now',
      popular: true
    },
    {
      title: '20-Hour Package',
      price: '£640',
      period: '/package',
      features: [
        'Save £60 total',
        'Manual or automatic',
        'Priority booking',
        'Test preparation',
        '2 mock tests included'
      ],
      cta: 'Book Now',
      popular: false
    },
    {
      title: 'Intensive Course',
      price: 'From £600',
      period: '',
      features: [
        '1-2 week course',
        'Test booking included',
        'Multiple daily lessons',
        'Fast-track to test',
        'Guaranteed test date'
      ],
      cta: 'Get Quote',
      popular: false
    }
  ];

  return (
    <section ref={sectionRef} id="pricing" key={key} className="py-20 px-4 bg-gradient-to-br from-red-50 via-white to-red-50">
      <div className="max-w-7xl mx-auto">
        <h2 className={`text-4xl lg:text-5xl font-bold text-center text-gray-900 mb-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Transparent Pricing
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-brand to-accent mx-auto rounded-full mb-5"></div>
        <p className={`text-center max-w-3xl mx-auto mb-12 text-gray-600 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          No hidden fees. Choose the package that works best for you.
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {packages.map((pkg, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-2xl p-8 transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl relative ${pkg.popular ? 'border-4 border-brand shadow-xl' : 'border-2 border-red-100'} ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand text-white px-6 py-1.5 rounded-full text-sm font-semibold shadow-lg">
                  MOST POPULAR
                </div>
              )}
              <h3 className="text-2xl font-bold text-gray-900 mb-6 mt-2">{pkg.title}</h3>
              <div className="mb-6">
                <span className="text-5xl font-bold text-brand">{pkg.price}</span>
                <span className="text-gray-500 text-base">{pkg.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-5 h-5 bg-gradient-to-br from-brand to-accent rounded-full flex items-center justify-center text-white text-xs font-bold">✓</span>
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <a 
                href="#contact" 
                className="block text-center py-4 px-6 bg-gradient-to-r from-brand to-accent text-white font-semibold rounded-xl hover:shadow-xl hover:-translate-y-0.5 transition-all"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {pkg.cta}
              </a>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-600 text-sm">
          * Automatic lessons are £5 extra per hour. All prices include VAT.
        </p>
      </div>
    </section>
  );
};

export default Pricing;
