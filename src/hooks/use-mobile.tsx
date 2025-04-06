
import * as React from "react"

export const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false)

  React.useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Set initial value
    checkIfMobile()
    
    // Add event listener
    window.addEventListener("resize", checkIfMobile)
    
    // Clean up
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  return isMobile
}

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = React.useState<'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'>('md')
  
  React.useEffect(() => {
    const checkBreakpoint = () => {
      const width = window.innerWidth
      if (width < 640) return setBreakpoint('xs')
      if (width < 768) return setBreakpoint('sm')
      if (width < 1024) return setBreakpoint('md')
      if (width < 1280) return setBreakpoint('lg')
      if (width < 1536) return setBreakpoint('xl')
      return setBreakpoint('2xl')
    }
    
    checkBreakpoint()
    window.addEventListener("resize", checkBreakpoint)
    
    return () => window.removeEventListener("resize", checkBreakpoint)
  }, [])
  
  return {
    breakpoint,
    isXs: breakpoint === 'xs',
    isSm: breakpoint === 'sm',
    isMd: breakpoint === 'md',
    isLg: breakpoint === 'lg',
    isXl: breakpoint === 'xl',
    is2xl: breakpoint === '2xl',
    isSmaller: (size: 'sm' | 'md' | 'lg' | 'xl' | '2xl') => {
      const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl']
      const currentIndex = sizes.indexOf(breakpoint)
      const compareIndex = sizes.indexOf(size)
      return currentIndex < compareIndex
    },
    isLarger: (size: 'xs' | 'sm' | 'md' | 'lg' | 'xl') => {
      const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl']
      const currentIndex = sizes.indexOf(breakpoint)
      const compareIndex = sizes.indexOf(size)
      return currentIndex > compareIndex
    }
  }
}
