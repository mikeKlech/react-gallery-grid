import React from "react";

const useMeasure = () => {
  const measureRef = React.useRef<HTMLDivElement>(null);
  const [size, setSize] = React.useState({ width: 0, height: 0 });

  React.useLayoutEffect(() => {
    const handleMutation = () => {
      const elem = measureRef.current;
      if (!elem) return;
      const rect = elem.getBoundingClientRect();
      setSize((state) => {
        if (state.width === rect.width && state.height === rect.height)
          return state;
        return {
          width: rect.width,
          height: rect.height,
        };
      });
    };
    handleMutation();
    const mo = new MutationObserver(handleMutation);
    measureRef.current &&
      mo.observe(measureRef.current, {
        childList: true,
        subtree: true,
        attributes: true,
      });
    window.addEventListener("resize", handleMutation);
    return () => {
      mo.disconnect();
      window.removeEventListener("resize", handleMutation);
    };
  }, []);

  return {
    measureRef,
    size,
  };
};

export default useMeasure;
