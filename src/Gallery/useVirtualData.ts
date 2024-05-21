import debounce from "debounce";
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
  const trashold = 500;

  const scrollClientHeight = scroll.clientHeight;
  const visibleRange: RangeType = {
    min: 0 - trashold,
    max: scrollClientHeight + trashold,
  };

  items.forEach((item, index) => {
    const height = item.height + gap;
    const itemTop = offset + passedHeight;
    const itemBottom = itemTop + height;

    if (visibleRange.min > itemBottom) {
      //before visible
      headerHeight += height;
      showFromIndex = index + 1;
    } else if (visibleRange.max > itemTop) {
      //visible
      showToIndex = index;
    } else {
      //after visible
      footerHeight += height;
    }
    passedHeight += height;
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
  useDeepEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current && containerRef.current) {
        const data = getVirtualData(
          items,
          gap,
          scrollRef.current,
          containerRef.current
        );
        setData(data);
      }
    };
    const debouncedScroll = debounce(handleScroll, 5);
    debouncedScroll();
    const scrollDOM = scrollRef.current;
    scrollDOM?.addEventListener("scroll", debouncedScroll);
    return () => {
      debouncedScroll.clear();
      scrollDOM?.removeEventListener("scroll", debouncedScroll);
    };
  }, [items.map((i) => i.height), gap, scrollRef, containerRef]);
  return data;
};

export default useVirtualData;
