import { RangeType, SizeType } from "./types";
export interface GalleryGridProps<T extends SizeType> {
    items: T[];
    containerWidth: number;
    gap?: number;
    rowHeightRange?: RangeType;
    itemRatioRange?: RangeType;
    maxColumns?: number;
    enableCrop?: boolean;
    preserveAspectRatio?: boolean;
}
declare const useGalleryRows: <T extends SizeType>(props: GalleryGridProps<T>) => Row<T>[];
export default useGalleryRows;
declare class GalleryGrid<T extends SizeType> {
    private _items;
    containerWidth: number;
    gap: number;
    rowHeightRange: RangeType;
    itemRatioRange: RangeType;
    maxColumns: number | undefined;
    enableCrop: boolean | undefined;
    preserveAspectRatio: boolean | undefined;
    rows: Row<T>[];
    constructor({ items, containerWidth, gap, rowHeightRange, itemRatioRange, maxColumns, enableCrop, preserveAspectRatio, }: GalleryGridProps<T>);
    addRow(row: Row<T>): void;
    fillRows(): Row<T>[];
}
declare class Row<T extends SizeType> {
    items: RowItem<T>[];
    private _grid;
    constructor(grid: GalleryGrid<T>);
    get isLast(): boolean;
    get itemRatioRange(): RangeType;
    get width(): number;
    get height(): number;
    get ratio(): number;
    get columns(): number;
    get ratioRange(): RangeType;
    addItem(item: T): void;
    canAddItem(item: T): boolean;
    clone(parent: GalleryGrid<T>): Row<T>;
    /**
      Adjusting the row and its items to fit heigth range.
    */
    adjust(): void;
}
declare class RowItem<T extends SizeType> {
    content: T;
    private _row;
    private _ratio;
    constructor(content: T, row: Row<T>);
    get ratioRange(): RangeType;
    get ratio(): number;
    set ratio(r: number);
    get originalRatio(): number;
    get size(): {
        width: number;
        height: number;
    };
    get cropBox(): import("./types").BoxType;
    get fitBox(): import("./types").BoxType;
    get aspectRatioPreserved(): boolean;
    clone(parentRow: Row<T>): RowItem<T>;
}
