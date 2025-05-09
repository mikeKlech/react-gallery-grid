import * as React from "react";
import Virtualizer from "./Virtualizer";
import { BoxType, RangeType, SizeType } from "./types";
import useGalleryRows, { Row } from "./useGalleryRows";
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
  /** Gap between rows and columns. If provided, overrides gapX and gapY. */
  gap?: number;
  /** Gap between columns (horizontal spacing). */
  gapX?: number;
  /** Gap between rows (vertical spacing). */
  gapY?: number;
  /** Minimum and maximum row heights. Works when preserveAspectRatio is set to false.*/
  rowHeightRange?: RangeType;
  /** Minimum and maximum aspect ratio of every item. Works when preserveAspectRatio is set to false.*/
  itemRatioRange?: RangeType;
  /** Max columns (items) in the row.*/
  maxColumns?: number;
  /** By default it's false. If set to true, heightRange and itemRatioRange will be ignored. */
  preserveAspectRatio?: boolean;
  /** A reference to the scroll element for implementing infinite scrolling, enhancing performance. */
  scrollRef?: React.RefObject<HTMLElement>;
};

const Gallery = <T extends SizeType>({
  items,
  itemRenderer,
  keyExtractor,
  gap = 0,
  gapX,
  gapY,
  rowHeightRange,
  itemRatioRange,
  maxColumns,
  preserveAspectRatio,
  scrollRef,
}: GalleryProps<T>) => {
  const { measureRef, size } = useMeasure();
  const containerWidth = size.width || 500;
  
  // Use gap for both if specific gaps aren't provided
  const horizontalGap = gapX !== undefined ? gapX : gap;
  const verticalGap = gapY !== undefined ? gapY : gap;

  const rows = useGalleryRows({
    items,
    containerWidth,
    gap: horizontalGap, // Pass the horizontal gap to row calculation
    rowHeightRange,
    itemRatioRange,
    maxColumns,
    preserveAspectRatio,
  });

  const rowRenderer = (row: Row<T>, rowIdx: number) => {
    const rowStyle: React.CSSProperties = {
      display: "flex",
      flexDirection: "row",
      gap: horizontalGap,
      height: row.height,
    };
    return (
      <div key={rowIdx} style={rowStyle}>
        {row.items.map((rowItem) => {
          const itemStyle: React.CSSProperties = rowItem.size;
          const key = keyExtractor
            ? keyExtractor(rowItem.content, rowItem.idx)
            : rowItem.idx;
          return (
            <div key={key} style={itemStyle}>
              {itemRenderer({
                index: rowItem.idx,
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
  };

  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    gap: verticalGap,
  };

  const withVirtualizer = !!scrollRef;
  return (
    <div ref={measureRef} style={containerStyle}>
      {withVirtualizer ? (
        <Virtualizer
          scrollRef={scrollRef}
          items={rows}
          gap={verticalGap}
          containerRef={measureRef}
          itemRenderer={({ item: row, index: rowIdx }) =>
            rowRenderer(row, rowIdx)
          }
        />
      ) : (
        <>{rows.map(rowRenderer)}</>
      )}
    </div>
  );
};
export default Gallery;
