import { GalleryGrid } from "./GalleryGrid";
import { RangeType, SizeType } from "./types";
import useDeepMemo from "./useDeepMemo";

export interface GalleryGridProps<T extends SizeType> {
  items: T[];
  containerWidth: number;
  gap?: number;
  heightRange?: RangeType;
  itemRatioRange?: RangeType;
  maxColumns?: number;
  enableCrop?: boolean;
  preserveAspectRatio?: boolean;
}

const useGalleryRows = <T extends SizeType>(props: GalleryGridProps<T>) => {
  const rows = useDeepMemo(() => new GalleryGrid(props).fillRows(), [props]);
  return rows;
};

export default useGalleryRows;
