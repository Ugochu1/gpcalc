import { useEffect, useState } from "react";

const useScrollPos = () => {
  const [scrollPos, setScrollPos] = useState<number>(0);

  useEffect(() => {
    function getScrollPosition() {
      setScrollPos(document.documentElement.scrollTop);
    }

    document.addEventListener("scroll", getScrollPosition);
    return () => document.removeEventListener("scroll", getScrollPosition);
  }, []);

  return scrollPos;
};

export default useScrollPos;
