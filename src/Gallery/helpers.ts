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
  destArea: SizeType,
  sourceItem: SizeType
): BoxType => {
  const destRatio = getRatio(destArea);
  const sourceRatio = getRatio(sourceItem);
  const box: BoxType = {
    width: sourceItem.width,
    height: sourceItem.height,
    left: 0,
    top: 0,
  };
  if (destRatio > sourceRatio) {
    box.width = destArea.width;
    box.height = destArea.width / sourceRatio;
  } else {
    box.width = destArea.height * sourceRatio;
    box.height = destArea.height;
  }
  box.left = -Math.abs(destArea.width - box.width) / 2;
  box.top = -Math.abs(destArea.height - box.height) / 2;
  return box;
};

export const getFitBox = (
  destArea: SizeType,
  sourceItem: SizeType
): BoxType => {
  const destRatio = getRatio(destArea);
  const sourceRatio = getRatio(sourceItem);
  const box: BoxType = {
    width: sourceItem.width,
    height: sourceItem.height,
    left: 0,
    top: 0,
  };
  if (destRatio < sourceRatio) {
    box.width = destArea.width;
    box.height = destArea.width / sourceRatio;
  } else {
    box.width = destArea.height * sourceRatio;
    box.height = destArea.height;
  }
  box.left = Math.abs(destArea.width - box.width) / 2;
  box.top = Math.abs(destArea.height - box.height) / 2;
  return box;
};
