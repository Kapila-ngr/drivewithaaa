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
      title: 'Starter Package',
      subtitle: 'Beginner Driver',
      features: [
        'Vehicle controls and safety checks',
        'Moving off, stopping, clutch control',
        'Basic road positioning',
        'Quiet roads and low-traffic areas',
        'Instructor feedback and progress tracking'
      ],
      highlights: [
        'Calm, step-by-step learning',
        'Manual or automatic available',
        'Flexible lesson times'
      ],
      idealFor: [
        'First-time learner drivers',
        'Students starting their journey'
      ],
      popular: false
    },
    {
      title: 'Confidence Builder',
      subtitle: 'Part-Trained Drivers',
      features: [
        'Junctions and roundabouts',
        'Lane discipline and speed control',
        'Independent driving practice',
        'Common learner mistakes correction',
        'Progress tracking and instructor feedback'
      ],
      highlights: [
        'Tailored lesson plans',
        'Focus on weak areas',
        'Evening and weekend sessions'
      ],
      idealFor: [
        'Part-trained learners',
        'Students or workers returning to lessons'
      ],
      popular: true
    },
    {
      title: 'Test Ready',
      subtitle: 'Practical Test Preparation',
      features: [
        'Driving test routes',
        'Manoeuvres (parallel, bay parking, hill starts)',
        'Mock driving tests',
        'Examiner expectations and fault awareness',
        'Readiness assessment and mock test feedback'
      ],
      highlights: [
        'Test-focused training',
        'Calm mock test environment',
        'High first-time pass success'
      ],
      idealFor: [
        'Learners with an upcoming test',
        'Driving test retakes'
      ],
      popular: false
    },
    {
      title: 'Sheffield Taxi',
      subtitle: 'Taxi & Private Hire Drivers',
      features: [
        'Sheffield taxi driving standards',
        'Local area knowledge and route training',
        'Professional passenger driving skills',
        'Safe night-time and city-centre driving',
        'Assessment and test preparation support'
      ],
      highlights: [
        'Professional instructor guidance',
        'Flexible training hours (including nights)',
        'Local Sheffield expertise'
      ],
      idealFor: [
        'New taxi and private hire drivers',
        'Existing drivers needing refresher training',
        'Drivers preparing for Sheffield taxi tests'
      ],
      popular: false
    }
  ];

  return (
    <section ref={sectionRef} id="pricing" key={key} className="py-20 px-4 bg-gradient-to-br from-red-50 via-white to-red-50">
      <div className="max-w-7xl mx-auto">
        <h2 className={`text-4xl lg:text-5xl font-bold text-center text-gray-900 mb-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Our Packages
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-brand to-accent mx-auto rounded-full mb-5"></div>
        <p className={`text-center max-w-3xl mx-auto mb-6 text-gray-600 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          At <strong>Drive with AAA</strong>, we focus on <strong>flexible, learner-focused driving packages</strong> rather than fixed pricing. Our packages are designed to suit <strong>students, workers, shift staff</strong>, and professional drivers.
        </p>
        <p className={`text-center max-w-3xl mx-auto mb-12 text-gray-600 font-medium transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Early morning sessions • Evening & late-night lessons • Weekend availability
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 items-stretch">
          {packages.map((pkg, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-2xl p-8 transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl relative ${pkg.popular ? 'border-4 border-brand shadow-xl' : 'border-2 border-red-100'} ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'} flex flex-col h-full`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand text-white px-6 py-1.5 rounded-full text-sm font-semibold shadow-lg">
                  MOST POPULAR
                </div>
              )}
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{pkg.title}</h3>
              <p className="text-brand font-semibold text-sm mb-4">{pkg.subtitle}</p>
              
              <div className="mb-6">
                <p className="text-gray-700 font-semibold text-sm mb-3">Includes:</p>
                <ul className="space-y-2 mb-4">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-4 h-4 bg-gradient-to-br from-brand to-accent rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">✓</span>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <p className="text-gray-700 font-semibold text-sm mb-2">Why Choose This:</p>
                <ul className="space-y-1">
                  {pkg.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-brand text-xs">→</span>
                      <span className="text-gray-600 text-sm">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <p className="text-gray-700 font-semibold text-sm mb-2">Ideal For:</p>
                <ul className="space-y-1">
                  {pkg.idealFor.map((item, i) => (
                    <li key={i} className="text-gray-600 text-sm">• {item}</li>
                  ))}
                </ul>
              </div>
              
              <a 
                href="#contact" 
                className="mt-auto block text-center py-4 px-6 bg-gradient-to-r from-brand to-accent text-white font-semibold rounded-xl hover:shadow-xl hover:-translate-y-0.5 transition-all"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Get Started
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Pricing;
