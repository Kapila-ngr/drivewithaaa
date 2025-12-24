import { useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Lessons from './components/Lessons'
import Results from './components/Results'
import Pricing from './components/Pricing'
import Blog from './components/Blog'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  useEffect(() => {
    // Ensure canonical URL is set dynamically
    const canonicalUrl = 'https://drivewithaaa.com' + window.location.pathname.replace(/\/$/, '')
    let canonicalLink = document.querySelector('link[rel="canonical"]')
    
    if (!canonicalLink) {
      canonicalLink = document.createElement('link')
      canonicalLink.setAttribute('rel', 'canonical')
      document.head.appendChild(canonicalLink)
    }
    
    canonicalLink.setAttribute('href', canonicalUrl || 'https://drivewithaaa.com')
    
    // Update Open Graph URL
    let ogUrl = document.querySelector('meta[property="og:url"]')
    if (!ogUrl) {
      ogUrl = document.createElement('meta')
      ogUrl.setAttribute('property', 'og:url')
      document.head.appendChild(ogUrl)
    }
    ogUrl.setAttribute('content', canonicalUrl || 'https://drivewithaaa.com')
    
    // Register service worker for performance optimization
    if ('serviceWorker' in navigator && import.meta.env.PROD) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            console.log('SW registered:', registration)
          })
          .catch((error) => {
            console.log('SW registration failed:', error)
          })
      })
    }
  }, [])

  return (
    <>
      <Header />
      {/* Christmas Promotion Banner */}
      <div className="bg-gradient-to-r from-red-600 via-green-600 to-red-600 text-white py-3 overflow-hidden shadow-lg">
        <div className="whitespace-nowrap animate-marquee">
          <span className="inline-block text-lg md:text-xl font-semibold px-4">
            🎄 The Perfect Christmas Gift! 🎄 Looking for a gift that really makes a difference? Drive with AAA Christmas gift vouchers are now available! 🚗✨ Perfect for new drivers or anyone wanting to build confidence on the road. Message us today to grab a voucher and give the gift of driving this Christmas 🎁
          </span>
          <span className="inline-block text-lg md:text-xl font-semibold px-4">
            🎄 The Perfect Christmas Gift! 🎄 Looking for a gift that really makes a difference? Drive with AAA Christmas gift vouchers are now available! 🚗✨ Perfect for new drivers or anyone wanting to build confidence on the road. Message us today to grab a voucher and give the gift of driving this Christmas 🎁
          </span>
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 30s linear infinite;
        }
      `}</style>
      <main>
        <Hero />
        <About />
        <Lessons />
        <Results />
        <Pricing />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
