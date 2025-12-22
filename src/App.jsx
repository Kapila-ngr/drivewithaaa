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
