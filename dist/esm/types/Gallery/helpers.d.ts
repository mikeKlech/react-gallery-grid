import { BoxType, SizeType } from "./types";
export declare const getRatio: (size: SizeType) => number;
export declare const sum: (addends: number[]) => number;
export declare const clamp: (val: number, min: number, max?: number) => number;
export declare const getCoverBox: (destArea: SizeType, sourceItem: SizeType) => BoxType;
export declare const getFitBox: (destArea: SizeType, sourceItem: SizeType) => BoxType;
