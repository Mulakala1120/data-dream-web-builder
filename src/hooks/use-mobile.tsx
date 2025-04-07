
import * as React from "react"

const MOBILE_BREAKPOINT = 768 // Standard mobile breakpoint

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false)

  React.useEffect(() => {
    // Handle the initial state
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Set initial value
    checkMobile()
    
    // Add event listener for window resizing
    window.addEventListener("resize", checkMobile)
    
    // Cleanup function
    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  return isMobile
}
