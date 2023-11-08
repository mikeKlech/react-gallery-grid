import React from "react";
declare const useMeasure: () => {
    measureRef: React.RefObject<HTMLDivElement>;
    size: {
        width: number;
        height: number;
    };
};
export default useMeasure;
