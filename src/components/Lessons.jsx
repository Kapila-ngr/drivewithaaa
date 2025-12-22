import { useState, useEffect, useRef } from 'react';

const Lessons = () => {
  const [activeModal, setActiveModal] = useState(null);
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
      if (window.location.hash === '#lessons') {
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

  const openModal = (lessonType) => {
    setActiveModal(lessonType);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setActiveModal(null);
    document.body.style.overflow = '';
  };

  const lessons = [
    {
      id: 'manual',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      ),
      title: 'Manual Lessons',
      description: 'Master the art of driving with manual transmission',
      details: {
        intro: 'Our manual driving lessons are designed to give you complete control and confidence behind the wheel. Learn the fundamentals of manual transmission and develop skills that will last a lifetime.',
        includes: [
          'Comprehensive clutch control training',
          'Gear changing techniques',
          'Hill starts and reversing',
          'Road positioning and awareness',
          'Preparation for the driving test'
        ],
        features: ['Flexible Scheduling', 'Experienced Instructors', 'Modern Vehicles', 'Test Preparation'],
        price: 'From £30 per hour'
      }
    },
    {
      id: 'automatic',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Automatic Lessons',
      description: 'Simplified driving experience with automatic transmission',
      details: {
        intro: 'Learning to drive in an automatic car can be easier and less stressful. Focus on road awareness and driving skills without worrying about gear changes.',
        includes: [
          'Smooth acceleration and braking',
          'Road safety and hazard perception',
          'Parking and maneuvering',
          'Motorway driving (if applicable)',
          'Automatic-specific test preparation'
        ],
        features: ['Easier Learning Curve', 'Less Stress', 'Modern Automatics', 'Quick Progress'],
        price: 'From £35 per hour'
      }
    },
    {
      id: 'intensive',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Intensive Courses',
      description: 'Fast-track your driving test with our intensive programs',
      details: {
        intro: 'Need to pass your test quickly? Our intensive courses are designed to get you test-ready in the shortest possible time with concentrated lessons over a few weeks.',
        includes: [
          'Customized course duration (1-2 weeks)',
          'Multiple lessons per day',
          'Fast-track test booking',
          'Comprehensive test preparation',
          'Mock test sessions'
        ],
        features: ['Quick Results', 'Focused Learning', 'Test Included', 'High Success Rate'],
        price: 'Packages from £600'
      }
    },
    {
      id: 'advanced',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      title: 'Advanced Training',
      description: 'Enhance your driving skills beyond the basics',
      details: {
        intro: 'Already passed your test? Take your driving to the next level with advanced training including motorway driving, defensive driving techniques, and eco-driving.',
        includes: [
          'Motorway driving confidence',
          'Defensive driving techniques',
          'Eco-driving and fuel efficiency',
          'Night driving practice',
          'Adverse weather condition training'
        ],
        features: ['Post-Test Training', 'Motorway Skills', 'Defensive Driving', 'Confidence Building'],
        price: 'From £40 per hour'
      }
    }
  ];

  return (
    <>
      <section ref={sectionRef} id="lessons" key={key} className="py-20 px-4 bg-gradient-to-br from-white via-red-100 to-red-50">
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-4xl lg:text-5xl font-bold text-center text-gray-900 mb-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>Our Driving Lessons</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-brand to-accent mx-auto rounded-full mb-5"></div>
          <p className={`text-center max-w-3xl mx-auto mb-12 text-gray-600 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Choose the right lesson type for your needs. Click on any option to learn more about what's included.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {lessons.map((lesson, index) => (
              <div 
                key={lesson.id}
                className={`bg-gradient-to-br from-white to-gray-50 border-2 border-red-200 rounded-2xl p-8 text-center cursor-pointer transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl hover:border-brand group relative overflow-hidden ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
                onClick={() => openModal(lesson.id)}
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand to-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                <div className="text-brand mb-4 group-hover:scale-110 transition-all">{lesson.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{lesson.title}</h3>
                <p className="text-gray-600 text-sm mb-5">{lesson.description}</p>
                <button className="bg-brand-light text-brand px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-brand hover:text-white hover:-translate-y-0.5 hover:shadow-lg transition-all">
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modals */}
      {lessons.map((lesson) => (
        <div 
          key={`modal-${lesson.id}`}
          className={`fixed inset-0 z-[9999] flex items-center justify-center p-5 transition-opacity ${activeModal === lesson.id ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeModal}></div>
          <div className={`relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all duration-400 ${activeModal === lesson.id ? 'scale-100 translate-y-0' : 'scale-95 translate-y-10'}`}>
            <button 
              className="sticky top-4 float-right mr-4 w-9 h-9 bg-gray-100 hover:bg-brand hover:text-white rounded-full text-2xl flex items-center justify-center transition-all hover:rotate-90 z-10"
              onClick={closeModal}
            >
              &times;
            </button>
            <div className="p-12">
              <div className="flex justify-center text-brand mb-6">
                <div className="scale-150">{lesson.icon}</div>
              </div>
              <h3 className="text-3xl font-bold mb-4 text-gray-900 text-center">{lesson.title}</h3>
              <p className="text-gray-700 leading-relaxed mb-5">{lesson.details.intro}</p>
              
              <h4 className="text-xl font-semibold text-brand mb-3">What's Included:</h4>
              <ul className="space-y-2 mb-6">
                {lesson.details.includes.map((item, index) => (
                  <li key={index} className="text-gray-700 pl-0">{item}</li>
                ))}
              </ul>
              
              <div className="flex flex-wrap gap-3 mb-8">
                {lesson.details.features.map((feature, index) => (
                  <span key={index} className="bg-brand-light text-brand px-4 py-2 rounded-xl text-sm font-medium">{feature}</span>
                ))}
              </div>
              
              <p className="text-2xl font-semibold text-brand text-center mb-6">
                {lesson.details.price}
              </p>
              
              <div className="text-center">
                <a 
                  href="#contact" 
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-brand to-accent text-white text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
                  onClick={(e) => {
                    e.preventDefault();
                    closeModal();
                    setTimeout(() => {
                      document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
                    }, 300);
                  }}
                >
                  Book This Course
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Lessons;
