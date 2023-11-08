import { dequal } from "dequal";
import React, { EffectCallback } from "react";

const useDeepEffect = (cb: EffectCallback, deps: unknown[]) => {
  const triggerRef = React.useRef(true);
  const prevDepsRef = React.useRef(deps);

  const check = (deps: unknown[]) => {
    const prevDeps = prevDepsRef.current;
    prevDepsRef.current = deps;
    if (!dequal(deps, prevDeps)) {
      triggerRef.current = !triggerRef.current;
    }
    return triggerRef.current;
  };

  return React.useEffect(cb, [check(deps)]);
};

export default useDeepEffect;
