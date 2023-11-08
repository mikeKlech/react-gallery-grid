import { BoxType, SizeType } from "./types";

export const getRatio = (size: SizeType) => size.width / size.height;

export const sum = (addends: number[]) =>
  addends.reduce((acc, addend) => acc + addend, 0);

export const clamp = (val: number, min: number, max?: number) => {
  let res = val;
  if (typeof max === "number") res = Math.min(res, max);
  res = Math.max(res, min);
  return res;
};

export const getCoverBox = (
  coverArea: SizeType,
  coverItem: SizeType
): BoxType => {
  const areaRatio = getRatio(coverArea);
  const itemRatio = getRatio(coverItem);
  const box: BoxType = {
    width: coverItem.width,
    height: coverItem.height,
    left: 0,
    top: 0,
  };
  if (areaRatio > itemRatio) {
    box.width = coverArea.width;
    box.height = coverArea.width / itemRatio;
  } else {
    box.width = coverArea.height * itemRatio;
    box.height = coverArea.height;
  }
  box.left = -Math.abs(coverArea.width - box.width) / 2;
  box.top = -Math.abs(coverArea.height - box.height) / 2;
  return box;
};

export const getFitBox = (
  destArea: SizeType,
  sourceItem: SizeType
): BoxType => {
  const areaRatio = getRatio(destArea);
  const itemRatio = getRatio(sourceItem);
  const box: BoxType = {
    width: sourceItem.width,
    height: sourceItem.height,
    left: 0,
    top: 0,
  };
  if (areaRatio < itemRatio) {
    box.width = destArea.width;
    box.height = destArea.width / itemRatio;
  } else {
    box.width = destArea.height * itemRatio;
    box.height = destArea.height;
  }
  box.left = -Math.abs(destArea.width - box.width) / 2;
  box.top = -Math.abs(destArea.height - box.height) / 2;
  return box;
};
