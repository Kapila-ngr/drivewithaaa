import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { routes } from '../routes'

const BASE_URL = 'https://www.drivewithaaa.co.uk'

function setMeta(selector, attr, key, value) {
  let el = document.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

// Updates title, description, canonical and OG tags on each route change and resets scroll.
const Seo = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    const path = pathname.replace(/\/$/, '') || '/'
    const route = routes.find((r) => r.path === path) || routes[0]
    const url = BASE_URL + (path === '/' ? '/' : path)

    document.title = route.title
    setMeta('meta[name="description"]', 'name', 'description', route.description)
    setMeta('meta[property="og:title"]', 'property', 'og:title', route.title)
    setMeta('meta[property="og:description"]', 'property', 'og:description', route.description)
    setMeta('meta[property="og:url"]', 'property', 'og:url', url)

    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', url)

    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default Seo
