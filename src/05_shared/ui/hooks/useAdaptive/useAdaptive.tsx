import { breakpoints } from "@models/global"
import { useEffect, useState } from "react"

export const useAdaptive = () => {
  const [size, setSize] = useState<{ w: number; h: number }>({
    h: window.innerHeight,
    w: window.innerWidth,
  })
  const [isMobile, setIsMobile] = useState(window.innerWidth <= breakpoints.xs)
  const [isTablet, setIsTablet] = useState(
    window.innerWidth <= breakpoints.md && window.innerWidth >= breakpoints.xs,
  )
  const [isDesktop, setIsDesktop] = useState(
    window.innerWidth >= breakpoints.md,
  )

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth
      const h = window.innerHeight

      setIsMobile(w <= breakpoints.xs)
      setIsTablet(w <= breakpoints.md && w >= breakpoints.xs)
      setIsDesktop(w >= breakpoints.md)

      setSize({ h, w })
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return { isMobile, isTablet, isDesktop, size }
}
