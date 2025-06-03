'use client'

import Script from 'next/script'
import { useEffect, useRef } from 'react'

export function AdsenseProvider() {
  const initialized = useRef(false)

  useEffect(() => {
    return () => {
      initialized.current = false
    }
  }, [])

  return (
    <Script
      id="adsbygoogle"
      strategy="lazyOnload"
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-650660617864251"
      crossOrigin="anonymous"
      onLoad={() => {
        if (!initialized.current) {
          try {
            if (typeof window !== 'undefined') {
              window.adsbygoogle = window.adsbygoogle || []
              window.adsbygoogle.push({
                google_ad_client: "ca-pub-650660617864251",
                enable_page_level_ads: true
              })
              initialized.current = true
            }
          } catch (err) {
            console.error('AdSense error:', err)
          }
        }
      }}
    />
  )
}