import { useState, useEffect, useRef } from 'react';

const Contact = () => {
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

    const section = sectionRef.current;
    if (section) {
      observer.observe(section);
    }

    const handleHashChange = () => {
      if (window.location.hash === '#contact') {
        setIsVisible(false);
        setKey(prev => prev + 1);
        setTimeout(() => setIsVisible(true), 50);
      }
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      if (section) {
        observer.unobserve(section);
      }
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const contactInfo = [
    { label: 'Phone', value: '+44 7743 211110', href: 'tel:+447743211110' },
    { label: 'Email', value: 'info@drivewithaaa.co.uk', href: 'mailto:info@drivewithaaa.co.uk' },
    { label: 'Areas Covered', value: 'Sheffield and Rotherham', href: null }
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      key={key}
      aria-labelledby="contact-heading"
      className="py-20 px-4 bg-gradient-to-br from-white via-red-100 to-red-50"
    >
      <div className="max-w-4xl mx-auto">
        <h2 id="contact-heading" className={`text-4xl lg:text-5xl font-bold text-center text-gray-900 mb-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Contact Drive with AAA Driving School
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-brand to-accent mx-auto rounded-full mb-5"></div>
        <p className={`text-center max-w-2xl mx-auto mb-12 text-gray-600 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Ready to start your driving journey? Contact our Sheffield and Rotherham driving instructors to book your first lesson or ask any questions.
        </p>
        
        <div className={`bg-white rounded-2xl shadow-xl p-8 mb-8 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <address className="not-italic">
            <ul className="space-y-5">
            {contactInfo.map((info, index) => (
              <li key={index} className="flex items-start gap-4 text-gray-700">
                <span className="text-brand font-bold mt-0.5">→</span>
                <div>
                  <strong className="font-semibold">{info.label}:</strong>{' '}
                  {info.href ? (
                    <a
                      href={info.href}
                      aria-label={`${info.label}: ${info.value}`}
                      className="text-brand hover:text-accent transition-colors"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <span>{info.value}</span>
                  )}
                </div>
              </li>
            ))}
            </ul>
          </address>
        </div>

        <div className={`text-center transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <a 
            href="https://wa.me/447743211110?text=Hi%20Drive%20with%20AAA%2C%20I%20would%20like%20to%20book%20a%20driving%20lesson" 
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contact Drive with AAA on WhatsApp to book a driving lesson"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-brand to-accent text-white text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
          >
            Message us on WhatsApp
          </a>

          <p className="mt-8 text-sm text-gray-600">
            Message us on WhatsApp for quick responses. We typically reply within the hour.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
