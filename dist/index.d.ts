import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React from 'react';

interface SizeType {
    width: number;
    height: number;
}
interface BoxType {
    width: number;
    height: number;
    left: number;
    top: number;
}
interface RangeType {
    min: number;
    max: number;
}

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
declare const Gallery: <T extends SizeType>({ items, itemRenderer, keyExtractor, gap, heightRange, itemRatioRange, maxColumns, preserveAspectRatio, scrollRef, }: GalleryProps<T>) => react_jsx_runtime.JSX.Element;

export { Gallery };
