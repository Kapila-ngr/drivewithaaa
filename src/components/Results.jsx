import { useState, useEffect, useRef } from 'react';

const Results = () => {
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
      if (window.location.hash === '#results') {
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

  const stats = [
    { 
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ), 
      value: '92%', 
      label: 'First-Time Pass Rate' 
    },
    { 
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ), 
      value: '500+', 
      label: 'Students Trained' 
    },
    { 
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ), 
      value: '4.9/5', 
      label: 'Average Rating' 
    },
    { 
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ), 
      value: '15+', 
      label: 'Years Experience' 
    }
  ];

  return (
    <section ref={sectionRef} id="results" key={key} className="py-20 px-4 bg-gradient-to-b from-white to-red-50">
      <div className="max-w-7xl mx-auto">
        <h2 className={`text-4xl lg:text-5xl font-bold text-center text-gray-900 mb-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Our Results Speak for Themselves
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-brand to-accent mx-auto rounded-full mb-5"></div>
        <p className={`text-center max-w-3xl mx-auto mb-12 text-gray-600 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          We take pride in our students' success. Here's what our learners have achieved with AAA Driving School.
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className={`bg-white border-2 border-red-100 rounded-2xl p-8 text-center transition-all duration-700 hover:-translate-y-2 hover:shadow-xl ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`} style={{ transitionDelay: `${300 + index * 100}ms` }}>
              <div className="flex justify-center text-brand mb-4">{stat.icon}</div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-brand mb-8 text-center">Student Testimonials</h3>
          <div className="space-y-6">
            <blockquote className="italic text-gray-700 bg-white p-6 rounded-xl shadow-md border-l-4 border-brand">
              "I passed my test first time thanks to AAA Driving School! The instructor was patient, 
              professional, and really helped build my confidence. Highly recommend!" - Sarah M.
            </blockquote>
            <blockquote className="italic text-gray-700 bg-white p-6 rounded-xl shadow-md border-l-4 border-brand">
              "Excellent teaching methods and flexible scheduling. I felt fully prepared for my test 
              and passed with only 2 minors. Thank you!" - James T.
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Results;
