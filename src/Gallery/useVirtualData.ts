import React from "react";
import { RangeType } from "./types";
import useDeepEffect from "./useDeepEffect";

type VirtualDataType = {
  headerHeight: number;
  footerHeight: number;

  /**Includes "from" */
  showFromIndex: number;
  /**Includes "to" */
  showToIndex: number;
};

const threshold = 1000;

const getVirtualData = <T extends { height: number }>(
  items: T[],
  gap: number,
  scroll: HTMLElement,
  container: HTMLElement
): VirtualDataType => {
  let passedHeight = 0;
  let headerHeight = 0;
  let footerHeight = 0;
  let showFromIndex = 0;
  let showToIndex = items.length - 1;

  const scrollRect = scroll.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  const offset = containerRect.top - scrollRect.top;

  const scrollClientHeight = scroll.clientHeight;
  const visibleRange: RangeType = {
    min: 0 - threshold,
    max: scrollClientHeight + threshold,
  };

  items.forEach((item, index) => {
    const height = item.height;
    const itemTop = offset + passedHeight;
    const itemBottom = itemTop + height;

    if (visibleRange.min > itemBottom) {
      //before visible
      const isFirst = index === 0;
      headerHeight += (isFirst ? 0 : gap) + height;
      showFromIndex = index + 1;
    } else if (visibleRange.max > itemTop) {
      //visible
      showToIndex = index;
    } else {
      //after visible
      const isLast = index === items.length - 1;
      footerHeight += height + (isLast ? 0 : gap);
    }
    passedHeight += height + gap;
  });
  return {
    headerHeight,
    footerHeight,
    showFromIndex,
    showToIndex,
  };
};
const useVirtualData = <T extends { height: number }>(
  items: T[],
  gap: number,
  scrollRef: React.RefObject<HTMLElement>,
  containerRef: React.RefObject<HTMLElement>
): VirtualDataType => {
  const [data, setData] = React.useState<VirtualDataType>({
    headerHeight: 0,
    footerHeight: 0,
    showFromIndex: 0,
    showToIndex: items.length - 1,
  });
  const prevScrollTopRef = React.useRef<number>(0);
  useDeepEffect(() => {
    const calculateData = () => {
      if (scrollRef.current && containerRef.current) {
        const data = getVirtualData(
          items,
          gap,
          scrollRef.current,
          containerRef.current
        );
        setData(data);
        prevScrollTopRef.current = scrollRef.current.scrollTop;
      }
    };
    const handleScroll = () => {
      if (scrollRef.current) {
        const prevScrollTop = prevScrollTopRef.current;
        const currentScrollTop = scrollRef.current.scrollTop;
        //Calculate new data only when we scroll by threshold value(almost out of view)
        if (Math.abs(prevScrollTop - currentScrollTop) > threshold) {
          calculateData();
        }
      }
    };
    calculateData();
    const scrollDOM = scrollRef.current;
    scrollDOM?.addEventListener("scroll", handleScroll);
    return () => {
      scrollDOM?.removeEventListener("scroll", handleScroll);
    };
  }, [items.map((i) => i.height), gap, scrollRef, containerRef]);
  return data;
};

export default useVirtualData;
