import * as React from "react";
type RendererProps<T extends {
    height: number;
}> = {
    index: number;
    item: T;
};
type VirtualizerProps<T extends {
    height: number;
}> = {
    items: T[];
    itemRenderer: React.FC<RendererProps<T>>;
    gap?: number;
    scrollRef: React.RefObject<HTMLElement>;
    containerRef: React.RefObject<HTMLElement>;
};
declare const Virtualizer: <T extends {
    height: number;
}>({ items, itemRenderer, gap, scrollRef, containerRef, }: VirtualizerProps<T>) => import("react/jsx-runtime").JSX.Element;
export default Virtualizer;
