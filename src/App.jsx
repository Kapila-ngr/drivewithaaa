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
