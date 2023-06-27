import { useEffect, useState } from "react";

const useScrollPos = () => {
  const [scrollPos, setScrollPos] = useState<number>(0);

  useEffect(() => {
    document.addEventListener("scroll", () => {
      setScrollPos(document.documentElement.scrollTop);
    });
  }, []);

  return scrollPos;
};

export default useScrollPos;
