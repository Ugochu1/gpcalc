import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useScreenSize = (reload?: boolean, callback?: () => void) => {
  const router = useRouter();
  const [screenSize, setScreenSize] = useState<number>(0);
  
  useEffect(() => {
    let previousWidth = window.innerWidth; // get previous width
    setScreenSize(previousWidth);
    let timeout: NodeJS.Timeout;
    window.addEventListener("resize", () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const currentWidth = window.innerWidth;
        if (reload) {
          if (previousWidth >= 1024 && currentWidth < 1024) {
            router.reload();
          }
        }
        callback && callback();
        setScreenSize(currentWidth);
      }, 200);
    });
  }, []);

  return screenSize;
};

export default useScreenSize;
