import * as React from "react";
import Virtualizer from "./Virtualizer";
import { BoxType, RangeType, SizeType } from "./types";
import useGalleryRows from "./useGalleryRows";
import useMeasure from "./useMeasure";

type RendererProps<T extends SizeType> = {
  /** Index of item in original array. */
  index: number;
  /** Rendering size of item. */
  size: SizeType;
  /** Helper fields to fill the image size. Analog of "object-fit: cover" css property for <img/> tag.  */
  cropBox: BoxType;
  /** Helper fields to fit the image into the size. Analog of "object-fit: contain" css property for <img/> tag.  */
  fitBox: BoxType;
  /** The original item. */
  item: T;
  /** Aspect ratio was preserved or not. */
  aspectRatioPreserved: boolean;
};

type GalleryProps<T extends SizeType> = {
  /** Items we need to put into the rows. Each item should have 'width' and 'height' properties. */
  items: T[];
  /** Renderer for every item where in props you can get extra info about the item and its size. */
  itemRenderer: React.FC<RendererProps<T>>;
  /** Optional key extractor for better performance. */
  keyExtractor?: (item: T, index: number) => string | number;
  /** Gap between rows and columns. */
  gap?: number;
  /** Minimum and maximum row's heights. Works when preserveAspectRatio set to false.*/
  heightRange?: RangeType;
  /** Minimum and maximum aspect ratio of every item. Works when preserveAspectRatio set to false.*/
  itemRatioRange?: RangeType;
  /** Max columns (items) in the row.*/
  maxColumns?: number;
  /** By default it's false. If set to true, heightRange and itemRatioRange will be ignored. */
  preserveAspectRatio?: boolean;
  /** Ref to the scroll element for infinity scrolling. Improve performance. */
  scrollRef: React.RefObject<HTMLElement>;
};

const Gallery = <T extends SizeType>({
  items,
  itemRenderer,
  keyExtractor,
  gap = 0,
  heightRange,
  itemRatioRange,
  maxColumns,
  preserveAspectRatio,
  scrollRef,
}: GalleryProps<T>) => {
  const { measureRef, size } = useMeasure();
  const containerWidth = size.width || 500;

  const rows = useGalleryRows({
    items,
    containerWidth,
    gap,
    heightRange,
    itemRatioRange,
    maxColumns,
    preserveAspectRatio,
  });
  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    gap,
  };

  return (
    <div ref={measureRef} style={containerStyle}>
      <Virtualizer
        scrollRef={scrollRef}
        items={rows}
        gap={gap}
        containerRef={measureRef}
        itemRenderer={({ item: row, index: rowIdx }) => {
          const rowStyle: React.CSSProperties = {
            display: "flex",
            flexDirection: "row",
            gap,
            height: row.height,
          };
          return (
            <div key={rowIdx} style={rowStyle}>
              {row.items.map((rowItem, itemIdx) => {
                const itemStyle: React.CSSProperties = rowItem.size;
                const key = keyExtractor
                  ? keyExtractor(rowItem.content, itemIdx)
                  : itemIdx;
                return (
                  <div key={key} style={itemStyle}>
                    {itemRenderer({
                      index: itemIdx,
                      item: rowItem.content,
                      size: rowItem.size,
                      cropBox: rowItem.cropBox,
                      fitBox: rowItem.fitBox,
                      aspectRatioPreserved: rowItem.aspectRatioPreserved,
                    })}
                  </div>
                );
              })}
            </div>
          );
        }}
      />
    </div>
  );
};
export default Gallery;
