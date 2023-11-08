import { clamp, getCoverBox, getFitBox, getRatio, sum } from "./helpers";
import { RangeType, SizeType } from "./types";
import { GalleryGridProps } from "./useGalleryRows";

class RowItem<T extends SizeType> {
  content;
  private _row;
  private _ratio;
  constructor(content: T, row: Row<T>) {
    this.content = content;
    this._row = row;
    this._ratio = clamp(
      getRatio(content),
      this.ratioRange.min,
      this.ratioRange.max
    );
  }
  get ratioRange(): RangeType {
    return this._row.itemRatioRange;
  }
  get ratio() {
    return this._ratio;
  }
  set ratio(r: number) {
    this._ratio = clamp(r, this.ratioRange.min, this.ratioRange.max);
  }
  get originalRatio() {
    return getRatio(this.content);
  }
  get size() {
    const rowHeight = this._row.height;
    return {
      width: this.ratio * rowHeight,
      height: rowHeight,
    };
  }
  get cropBox() {
    return getCoverBox(this.size, this.content);
  }
  get fitBox() {
    return getFitBox(this.size, this.content);
  }
  get aspectRatioPreserved() {
    return this.originalRatio === this.ratio;
  }
  clone(parentRow: Row<T>): RowItem<T> {
    return new RowItem(this.content, parentRow);
  }
}
class Row<T extends SizeType> {
  items: RowItem<T>[] = [];
  private _grid;
  constructor(grid: GalleryGrid<T>) {
    this._grid = grid;
  }
  get isLast() {
    return this._grid.rows[this._grid.rows.length - 1] === this;
  }
  get itemRatioRange() {
    return this._grid.itemRatioRange;
  }
  get width() {
    return (
      this._grid.containerWidth - Math.max(this.columns - 1, 0) * this._grid.gap
    );
  }
  get height() {
    if (this.columns === 0) return 0;
    return this.width / this.ratio;
  }
  get ratio(): number {
    const ratio = sum(this.items.map((item) => item.ratio));
    if (this.isLast) {
      //if last - don`t need to fit whole container width, just cut it by max height(min ratio)
      return clamp(ratio, this.ratioRange.min);
    } else {
      return ratio;
    }
  }
  get columns() {
    return this.items.length;
  }
  get ratioRange(): RangeType {
    const rowWidth = this.width;
    //Height is inverse to ratio. So:
    //Min ratio is where maximum height.
    //Max ratio is where minimum height.
    const minRatio = rowWidth / this._grid.heightRange.max;
    const maxRatio = rowWidth / this._grid.heightRange.min;
    return {
      min: minRatio,
      max: maxRatio,
    };
  }
  addItem(item: T) {
    this.items.push(new RowItem(item, this));
  }
  canAddItem(item: T) {
    const newRow = this.clone(this._grid);
    newRow.addItem(item);
    const { max: newMaxRatio } = newRow.ratioRange;
    const fitRatio = newRow.ratio <= newMaxRatio;
    const fitMaxColumns = this._grid.maxColumns
      ? this._grid.maxColumns >= newRow.columns
      : true;
    return fitRatio && fitMaxColumns;
  }
  clone(parent: GalleryGrid<T>) {
    const newRow = new Row<T>(parent);
    newRow.items = this.items.map((i) => i.clone(newRow));
    return newRow;
  }
  /**
    Adjusting the row and its items to fit heigth range.
  */
  adjust() {
    if (!this._grid.preserveAspectRatio) {
      const ratio = this.ratio;
      const ratioRange = this.ratioRange;

      if (ratio < ratioRange.min) {
        //Ratio diff is positive - just add it to item with lowest ratio.
        const ratioDiff = ratioRange.min - ratio;
        const sortItems = [...this.items];
        sortItems.sort((a, b) => a.ratio - b.ratio);
        const itemWithMinRatio = sortItems[0];
        if (itemWithMinRatio) {
          itemWithMinRatio.ratio += ratioDiff;
        }
      } else if (ratio > ratioRange.max) {
        //!IMPORTANT
        //Ratio diff is negative - it could become less than 0.
        const ratioDiff = ratioRange.max - ratio;
        //1. Distribute this difference between all row items.
        //2. Clamp it by min ratio.
        const ratioDiffPerItem = ratioDiff / this.columns;
        this.items.forEach((i) => {
          i.ratio += ratioDiffPerItem;
        });
      }
    }
  }
}
export class GalleryGrid<T extends SizeType> {
  private _items: T[];
  containerWidth: number;
  gap: number;
  heightRange: RangeType;
  itemRatioRange: RangeType;
  maxColumns;
  enableCrop;
  preserveAspectRatio;
  rows: Row<T>[] = [];
  constructor({
    items,
    containerWidth,
    gap,
    heightRange,
    itemRatioRange,
    maxColumns,
    enableCrop,
    preserveAspectRatio,
  }: GalleryGridProps<T>) {
    if (items.some((i) => i.width === undefined || i.height === undefined))
      throw new Error("Items should have 'width' and 'height' properties");
    this._items = items;
    if (containerWidth < 0)
      throw new Error("Container width should be positive");
    this.containerWidth = containerWidth;
    const defaultGap = 0;
    if (gap && gap < 0) throw new Error("Gap should be positive");
    this.gap = gap || defaultGap;
    const defaultHeightRange: RangeType = { min: 240, max: 340 };
    if (heightRange) {
      if (heightRange.min < 0 || heightRange.max < 0)
        throw new Error("Height range should be positive");
      if (heightRange.max < heightRange.min)
        throw new Error("Height range minimum should be less than maximum");
    }
    this.heightRange = heightRange || defaultHeightRange;
    const defaultItemRatioRange: RangeType = { min: 0, max: 1000000 };
    if (itemRatioRange) {
      if (itemRatioRange.min < 0 || itemRatioRange.max < 0)
        throw new Error("Item ratio range should be positive");
      if (itemRatioRange.max < itemRatioRange.min)
        throw new Error("Item ratio range minimum shold be less than maximum");
    }
    this.itemRatioRange =
      !preserveAspectRatio && itemRatioRange
        ? itemRatioRange
        : defaultItemRatioRange;
    if (maxColumns !== undefined && maxColumns <= 0)
      throw new Error("maxColumns should be greater than 0");
    this.maxColumns = maxColumns;
    this.enableCrop = enableCrop;
    this.preserveAspectRatio = preserveAspectRatio;
  }
  addRow(row: Row<T>) {
    this.rows.push(row);
  }
  fillRows() {
    this._items.forEach((item) => {
      let row = this.rows[this.rows.length - 1];
      if (!row) {
        const newRow = new Row(this);
        this.addRow(newRow);
        row = newRow;
      }

      if (row.columns === 0) {
        row.addItem(item);
      } else {
        if (row.canAddItem(item)) {
          row.addItem(item);
        } else {
          //Adjust last row.
          row.adjust();

          //Add item to new row.
          const newRow = new Row(this);
          newRow.addItem(item);
          this.addRow(newRow);
        }
      }
    });
    return this.rows;
  }
}
