import * as React from "react";
import Virtualizer from "./Virtualizer";
import { BoxType, RangeType, SizeType } from "./types";
import useGalleryRows from "./useGalleryRows";
import useMeasure from "./useMeasure";

type RendererProps<T extends SizeType> = {
  /** The index of the item in the original array. */
  index: number;
  /** The rendering size of the item. */
  size: SizeType;
  /** Helper field to fill the image size. Analogous to the 'object-fit: cover' CSS property for the <img/> tag. */
  cropBox: BoxType;
  /** Helper field to fit the image into the size. Analogous to the 'object-fit: contain' CSS property for the <img/> tag.  */
  fitBox: BoxType;
  /** The original item. */
  item: T;
  /** Indicates whether the aspect ratio was preserved or not. */
  aspectRatioPreserved: boolean;
};

type GalleryProps<T extends SizeType> = {
  /** Items need to be placed into the rows. Each item should have 'width' and 'height' properties. */
  items: T[];
  /** Renderer for every item where in props you can get extra info about the item and its size. */
  itemRenderer: React.FC<RendererProps<T>>;
  /** Optional key extractor for better performance. */
  keyExtractor?: (item: T, index: number) => string | number;
  /** Gap between rows and columns. */
  gap?: number;
  /** Minimum and maximum row heights. Works when preserveAspectRatio is set to false.*/
  rowHeightRange?: RangeType;
  /** Minimum and maximum aspect ratio of every item. Works when preserveAspectRatio is set to false.*/
  itemRatioRange?: RangeType;
  /** Max columns (items) in the row.*/
  maxColumns?: number;
  /** By default it's false. If set to true, heightRange and itemRatioRange will be ignored. */
  preserveAspectRatio?: boolean;
  /** A reference to the scroll element for implementing infinite scrolling, enhancing performance. */
  scrollRef: React.RefObject<HTMLElement>;
};

const Gallery = <T extends SizeType>({
  items,
  itemRenderer,
  keyExtractor,
  gap = 0,
  rowHeightRange,
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
    rowHeightRange,
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
