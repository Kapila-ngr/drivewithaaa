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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
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
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const contactInfo = [
    { label: 'Phone', value: '+44 7743 211110', href: 'tel:+447743211110' },
    { label: 'Email', value: 'info@drivewithaaa.co.uk', href: 'mailto:info@drivewithaaa.co.uk' },
    { label: 'Areas Covered', value: 'Sheffield and South Yorkshire', href: null }
  ];

  return (
    <section ref={sectionRef} id="contact" key={key} className="py-20 px-4 bg-gradient-to-br from-white via-red-100 to-red-50">
      <div className="max-w-4xl mx-auto">
        <h2 className={`text-4xl lg:text-5xl font-bold text-center text-gray-900 mb-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Get in Touch
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-brand to-accent mx-auto rounded-full mb-5"></div>
        <p className={`text-center max-w-2xl mx-auto mb-12 text-gray-600 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Ready to start your driving journey? Contact us today to book your first lesson or ask any questions.
        </p>
        
        <div className={`bg-white rounded-2xl shadow-xl p-8 mb-8 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <ul className="space-y-5">
            {contactInfo.map((info, index) => (
              <li key={index} className="flex items-start gap-4 text-gray-700">
                <span className="text-brand font-bold mt-0.5">→</span>
                <div>
                  <strong className="font-semibold">{info.label}:</strong>{' '}
                  {info.href ? (
                    <a href={info.href} className="text-brand hover:text-accent transition-colors">
                      {info.value}
                    </a>
                  ) : (
                    <span>{info.value}</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className={`text-center transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <a 
            href="mailto:info@drivewithaaa.co.uk?subject=Driving%20Lesson%20Enquiry" 
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-brand to-accent text-white text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
          >
            Send us a Message
          </a>

          <p className="mt-8 text-sm text-gray-600">
            We typically respond within 24 hours. For urgent enquiries, please call us directly.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
