
import * as React from "react";

const MOBILE_BREAKPOINT = 768; // Standard mobile breakpoint

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false);

  React.useEffect(() => {
    // Function to check if the screen is mobile size
    const checkMobile = () => {
      const width = window.innerWidth;
      setIsMobile(width < MOBILE_BREAKPOINT);
    };
    
    // Set initial value
    checkMobile();
    
    // Add event listener for window resizing with debounce
    let timeoutId: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkMobile, 100);
    };
    
    window.addEventListener("resize", handleResize);
    
    // Check again after a short delay to ensure correct value after component mount
    const initialCheckTimeout = setTimeout(checkMobile, 50);
    
    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
      clearTimeout(initialCheckTimeout);
    };
  }, []);

  return isMobile;
}
