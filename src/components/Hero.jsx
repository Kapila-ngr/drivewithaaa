const Hero = () => {
  // Generate snowflakes
  const snowflakes = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    animationDuration: 5 + Math.random() * 10,
    animationDelay: Math.random() * 5,
    fontSize: 10 + Math.random() * 10
  }));

  return (
    <section id="hero" className="relative py-32 lg:py-40 px-4 overflow-hidden">
      {/* Background Image with Overlay - Optimized loading */}
      <div 
        className="absolute inset-0 bg-cover bg-top bg-no-repeat will-change-transform"
        style={{ 
          backgroundImage: 'url(/assets/hero.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'top center'
        }}
        role="img"
        aria-label="Hero background"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-red-50/85 to-white/90"></div>
      </div>
      
      {/* Falling Snow */}
      <div className="absolute inset-0 pointer-events-none z-[5]">
        {snowflakes.map((flake) => (
          <div
            key={flake.id}
            className="snowflake"
            style={{
              left: `${flake.left}%`,
              animationDuration: `${flake.animationDuration}s`,
              animationDelay: `${flake.animationDelay}s`,
              fontSize: `${flake.fontSize}px`
            }}
          >
            ❄
          </div>
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="text-left">
            <p className="text-brand text-xl lg:text-2xl font-semibold mb-4 animate-fadeIn">
              Your Journey to Safe Driving Starts Here
            </p>
            <h1 className="text-5xl lg:text-7xl font-extrabold mb-5 bg-gradient-to-r from-gray-900 to-brand bg-clip-text text-transparent tracking-tight animate-fadeIn animation-delay-200 lg:h-[82px] lg:flex lg:items-center">
              Drive with AAA
            </h1>
            <p className="text-gray-600 text-lg lg:text-xl max-w-2xl mb-8 animate-fadeIn animation-delay-400">
              Professional driving instruction in Sheffield and Rotherham. 
              Expert ADI-approved instructors with high pass rates.
            </p>
            <a 
              href="#contact" 
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-brand to-accent text-white text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 hover:scale-105"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Book Your First Lesson
            </a>
          </div>

          <div className="bg-white/90 rounded-2xl shadow-2xl border border-red-100 p-8 backdrop-blur-sm animate-fadeIn animation-delay-400">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Drive with AAA?</h3>
            <div className="grid grid-cols-1 gap-3 text-gray-700">
              <div className="flex items-start gap-3">
                <span className="text-brand text-xl">✓</span>
                <span>Flexible training hours (early morning to late night)</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-brand text-xl">✓</span>
                <span>Student and worker-friendly learning</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-brand text-xl">✓</span>
                <span>Manual and automatic lessons</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-brand text-xl">✓</span>
                <span>DVSA-approved UK driving instructors</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-brand text-xl">✓</span>
                <span>Lessons tailored to your lifestyle</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-brand text-xl">✓</span>
                <span>Learn at your pace • Train on your schedule • Pass with confidence</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .snowflake {
          position: absolute;
          top: -20px;
          color: rgba(173, 216, 230, 0.9);
          animation: snowfall linear infinite;
          text-shadow: 0 0 5px rgba(135, 206, 250, 0.8);
        }
        @keyframes snowfall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0.7;
          }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-30px) rotate(5deg); }
          50% { transform: translateY(-60px) rotate(-5deg); }
          75% { transform: translateY(-30px) rotate(3deg); }
        }
        .animate-float { animation: float 12s ease-in-out infinite; }
        .animate-float-delayed { animation: float 14s ease-in-out infinite 2s; }
        .animate-float-slow { animation: float 16s ease-in-out infinite 4s; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.8s ease-out; }
        .animation-delay-200 { animation-delay: 0.2s; animation-fill-mode: both; }
        .animation-delay-400 { animation-delay: 0.4s; animation-fill-mode: both; }
      `}</style>
    </section>
  );
};

export default Hero;
