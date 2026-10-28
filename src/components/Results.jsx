import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { googleReviews as reviews, googleReviewsUrl } from '../data/googleReviews';

const Results = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [key, setKey] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);

  const highlights = [
    { title: 'Expert ADI instructors', description: 'High pass rates backed by patient, DVSA approved teaching.' },
    { title: 'Manual & automatic lessons', description: 'Choose the car that suits your preference.' },
    { title: 'Flexible scheduling', description: 'Lessons that fit students, workers and shift staff.' }
  ];

  const avatarColors = ['bg-red-600', 'bg-blue-600', 'bg-emerald-600', 'bg-amber-600', 'bg-purple-600', 'bg-teal-600'];

  const gallery = [
    '/assets/images/1.jpeg',
    '/assets/images/2.jpeg',
    '/assets/images/3.jpeg',
    '/assets/images/4.jpeg',
    '/assets/images/5.jpeg',
    '/assets/images/6.jpeg',
    '/assets/images/7.jpeg',
    '/assets/images/8.jpeg',
    '/assets/images/9.jpeg',
    '/assets/images/10.jpeg',
    '/assets/images/11.jpeg',
    '/assets/images/12.jpeg',
    '/assets/images/13.jpeg',
    '/assets/images/14.jpeg',
    '/assets/images/15.jpeg'
  ];

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

  const showPreviousImage = () => {
    setActiveIndex((index) => (index - 1 + gallery.length) % gallery.length);
  };

  const showNextImage = () => {
    setActiveIndex((index) => (index + 1) % gallery.length);
  };

  const touchStartX = useRef(null);

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') showPreviousImage();
    if (event.key === 'ArrowRight') showNextImage();
  };

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null) return;
    const distance = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(distance) < 50) return;
    if (distance < 0) showNextImage();
    else showPreviousImage();
  };

  return (
    <section ref={sectionRef} id="results" key={key} className="py-20 px-4 bg-gradient-to-b from-white to-red-50">
      <div className="max-w-7xl mx-auto">
        <h2 className={`text-4xl lg:text-5xl font-bold text-center text-gray-900 mb-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Our Results Speak for Themselves
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-brand to-accent mx-auto rounded-full mb-5"></div>
        <p className={`text-center max-w-3xl mx-auto mb-12 text-gray-600 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          We take pride in our students' success. Here's what our learners have achieved with Drive with AAA.
        </p>

        <div className="grid lg:grid-cols-5 gap-8 items-stretch mb-16">
          <div className={`lg:col-span-3 relative overflow-hidden rounded-3xl border border-red-100 bg-gradient-to-br from-white via-red-50 to-white p-6 sm:p-8 shadow-2xl ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} transition-all duration-1000`} style={{ transitionDelay: '250ms' }}>
            <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-brand/10 blur-3xl"></div>
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-accent/10 blur-3xl"></div>
            <div className="relative grid md:grid-cols-2 gap-10 items-center">
          <div className="relative aspect-[3/4] w-full max-w-xs mx-auto mb-8 touch-pan-y select-none rounded-3xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-brand"
               role="region"
               aria-label="Student success photo gallery"
               aria-roledescription="carousel"
               tabIndex={0}
               onKeyDown={handleKeyDown}
               onTouchStart={(event) => { touchStartX.current = event.touches[0].clientX; }}
               onTouchEnd={handleTouchEnd}>
            {gallery.map((src, i) => {
              const offset = (i - activeIndex + gallery.length) % gallery.length;
              const isDismissed = offset === gallery.length - 1;
              if (offset > 3 && !isDismissed) return null;

              const style = isDismissed
                ? { transform: 'translateX(-120%) rotate(-14deg)', opacity: 0, zIndex: 0 }
                : {
                    transform: `translateY(${offset * 16}px)`,
                    opacity: offset > 2 ? 0 : 1 - offset * 0.2,
                    zIndex: 10 - offset
                  };

              return (
                <div
                  key={src}
                  aria-hidden={offset !== 0}
                  className="absolute inset-0 overflow-hidden rounded-3xl border-4 border-white bg-white shadow-2xl transition-all duration-500 ease-out will-change-transform"
                  style={{ ...style, pointerEvents: 'none' }}
                >
                  <img
                    src={src}
                    alt={`Drive with AAA student success photo ${i + 1}`}
                    className="h-full w-full object-contain"
                    loading={i === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    draggable={false}
                  />
                </div>
              );
            })}
            <button
              type="button"
              onClick={showPreviousImage}
              aria-label="Show previous student success photo"
              className="absolute z-20 left-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-gray-900 shadow-lg transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={showNextImage}
              aria-label="Show next student success photo"
              className="absolute z-20 right-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-gray-900 shadow-lg transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <div className="absolute z-20 bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/65 px-3 py-1 text-sm font-medium text-white" aria-live="polite">
              {activeIndex + 1} / {gallery.length}
            </div>
          </div>

          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-light px-4 py-1.5 text-sm font-semibold text-brand">
              <span className="h-2 w-2 rounded-full bg-brand animate-pulse"></span>
              Success Stories
            </span>
            <div>
              <h3 className="text-3xl font-bold tracking-tight text-gray-900">Real students, real passes</h3>
              <div className="mt-3 h-1 w-14 rounded-full bg-gradient-to-r from-brand to-accent"></div>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Browse recent successes from learners across Sheffield and Rotherham.
              </p>
            </div>
            <ul className="space-y-4">
              {highlights.map((item) => (
                <li key={item.title} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand to-accent text-white text-sm font-bold" aria-hidden="true">✓</span>
                  <div>
                    <p className="font-semibold text-gray-900">{item.title}</p>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-brand to-accent px-6 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl">
              Start your journey
              <span aria-hidden="true">→</span>
            </Link>
          </div>
            </div>
          </div>

          <div className={`lg:col-span-2 relative ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} transition-all duration-1000`} style={{ transitionDelay: '550ms' }}>
          <div className="bg-white rounded-3xl shadow-xl border border-gray-200 flex flex-col lg:absolute lg:inset-0">
            <div className="p-5 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Student Reviews</h3>
              <div className="flex items-center gap-1 mt-1 text-amber-400" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            <ul className="flex-1 overflow-y-auto max-h-96 lg:max-h-none lg:min-h-0 divide-y divide-gray-200" tabIndex={0} aria-label="Student reviews">
              {reviews.map((review, index) => (
                <li key={`${review.name}-${index}`} className="p-5">
                  <div className="flex items-center gap-3">
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white font-medium ${avatarColors[index % avatarColors.length]}`} aria-hidden="true">
                      {review.name.charAt(0)}
                    </span>
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900">{review.name}</p>
                      {review.meta && <p className="text-xs text-gray-500">{review.meta}</p>}
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5 mt-3 text-amber-400" aria-label="5 out of 5 stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    {review.date && <span className="ml-2 text-xs text-gray-500">{review.date}</span>}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-gray-700">
                    {review.text}
                    {review.text.endsWith('…') && (
                      <>
                        {' '}
                        <a
                          href={googleReviewsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`See more of ${review.name}'s review on Google`}
                          className="font-medium text-blue-600 hover:underline"
                        >
                          See more
                        </a>
                      </>
                    )}
                  </p>
                </li>
              ))}
            </ul>
            <a
              href={googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block border-t border-gray-200 p-4 text-center text-sm font-medium text-blue-600 hover:bg-gray-50 rounded-b-2xl"
            >
              View all reviews on Google
            </a>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Results;
