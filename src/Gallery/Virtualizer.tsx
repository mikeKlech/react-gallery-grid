import * as React from "react";
import useVirtualData from "./useVirtualData";

type RendererProps<T extends { height: number }> = {
  index: number;
  item: T;
};

type VirtualizerProps<T extends { height: number }> = {
  items: T[];
  itemRenderer: React.FC<RendererProps<T>>;
  gap?: number;
  scrollRef: React.RefObject<HTMLElement>;
  containerRef: React.RefObject<HTMLElement>;
};

const Virtualizer = <T extends { height: number }>({
  items,
  itemRenderer,
  gap = 0,
  scrollRef,
  containerRef,
}: VirtualizerProps<T>) => {
  const { headerHeight, footerHeight, showFromIndex, showToIndex } =
    useVirtualData(items, gap, scrollRef, containerRef);

  return (
    <>
      {headerHeight ? <div style={{ height: headerHeight }} /> : null}
      {items.map((item, index) => {
        if (index < showFromIndex || index > showToIndex) return null;
        return itemRenderer({
          item,
          index,
        });
      })}
      {footerHeight ? <div style={{ height: footerHeight }} /> : null}
    </>
  );
};
export default Virtualizer;
