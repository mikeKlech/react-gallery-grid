import React from "react";
type VirtualDataType = {
    headerHeight: number;
    footerHeight: number;
    /**Includes "from" */
    showFromIndex: number;
    /**Includes "to" */
    showToIndex: number;
};
declare const useVirtualData: <T extends {
    height: number;
}>(items: T[], gap: number, scrollRef: React.RefObject<HTMLElement>, containerRef: React.RefObject<HTMLElement>) => VirtualDataType;
export default useVirtualData;
