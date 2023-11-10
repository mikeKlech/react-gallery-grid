import{jsxs as t,Fragment as e,jsx as r}from"react/jsx-runtime";import i from"react";var n=Object.prototype.hasOwnProperty;function o(t,e,r){for(r of t.keys())if(a(r,e))return r}function a(t,e){var r,i,h;if(t===e)return!0;if(t&&e&&(r=t.constructor)===e.constructor){if(r===Date)return t.getTime()===e.getTime();if(r===RegExp)return t.toString()===e.toString();if(r===Array){if((i=t.length)===e.length)for(;i--&&a(t[i],e[i]););return-1===i}if(r===Set){if(t.size!==e.size)return!1;for(i of t){if((h=i)&&"object"==typeof h&&!(h=o(e,h)))return!1;if(!e.has(h))return!1}return!0}if(r===Map){if(t.size!==e.size)return!1;for(i of t){if((h=i[0])&&"object"==typeof h&&!(h=o(e,h)))return!1;if(!a(i[1],e.get(h)))return!1}return!0}if(r===ArrayBuffer)t=new Uint8Array(t),e=new Uint8Array(e);else if(r===DataView){if((i=t.byteLength)===e.byteLength)for(;i--&&t.getInt8(i)===e.getInt8(i););return-1===i}if(ArrayBuffer.isView(t)){if((i=t.byteLength)===e.byteLength)for(;i--&&t[i]===e[i];);return-1===i}if(!r||"object"==typeof t){for(r in i=0,t){if(n.call(t,r)&&++i&&!n.call(e,r))return!1;if(!(r in e)||!a(t[r],e[r]))return!1}return Object.keys(e).length===i}}return t!=t&&e!=e}var h=function(t,e,r,n){var o,h,u,s,c=i.useState({headerHeight:0,footerHeight:0,showFromIndex:0,showToIndex:t.length-1}),f=c[0],g=c[1];return o=function(){var i=function(){if(r.current&&n.current){var i=function(t,e,r,i){var n=0,o=0,a=0,h=0,u=t.length-1,s=r.getBoundingClientRect(),c=i.getBoundingClientRect().top-s.top,f=r.clientHeight,g=-500,d=f+500;return t.forEach((function(t,r){var i=t.height+e,s=c+n;g>s+i?(o+=i,h=r+1):d>s?u=r:a+=i,n+=i})),{headerHeight:o,footerHeight:a,showFromIndex:h,showToIndex:u}}(t,e,r.current,n.current);g(i)}};i();var o=r.current;return null==o||o.addEventListener("scroll",i),function(){null==o||o.removeEventListener("scroll",i)}},h=[t.map((function(t){return t.height})),e,r,n],u=i.useRef(!0),s=i.useRef(h),i.useEffect(o,[function(t){var e=s.current;return s.current=t,a(t,e)||(u.current=!u.current),u.current}(h)]),f},u=function(i){var n=i.items,o=i.itemRenderer,a=i.gap,u=void 0===a?0:a,s=i.scrollRef,c=i.containerRef,f=h(n,u,s,c),g=f.headerHeight,d=f.footerHeight,m=f.showFromIndex,l=f.showToIndex;return t(e,{children:[g?r("div",{style:{height:g}}):null,n.map((function(t,e){return e<m||e>l?null:o({item:t,index:e})})),d?r("div",{style:{height:d}}):null]})};"function"==typeof SuppressedError&&SuppressedError;var s=function(t){return t.width/t.height},c=function(t,e,r){var i=t;return"number"==typeof r&&(i=Math.min(i,r)),i=Math.max(i,e)},f=function(t){var e,r,n,o;return e=function(){return new g(t).fillRows()},r=[t],n=i.useRef(!0),o=i.useRef(r),i.useMemo(e,[function(t){var e=o.current;return o.current=t,a(t,e)||(n.current=!n.current),n.current}(r)])},g=function(){function t(t){var e=t.items,r=t.containerWidth,i=t.gap,n=t.rowHeightRange,o=t.itemRatioRange,a=t.maxColumns,h=t.enableCrop,u=t.preserveAspectRatio;if(this.rows=[],e.some((function(t){return void 0===t.width||void 0===t.height})))throw new Error("Items should have 'width' and 'height' properties");if(this._items=e,r<0)throw new Error("Container width should be positive");this.containerWidth=r;if(i&&i<0)throw new Error("Gap should be positive");this.gap=i||0;if(n){if(n.min<0||n.max<0)throw new Error("Row height range should be positive");if(n.max<n.min)throw new Error("Row height range minimum should be less than maximum")}this.rowHeightRange=n||{min:240,max:340};if(o){if(o.min<0||o.max<0)throw new Error("Item ratio range should be positive");if(o.max<o.min)throw new Error("Item ratio range minimum shold be less than maximum")}if(this.itemRatioRange=!u&&o?o:{min:0,max:1e6},void 0!==a&&a<=0)throw new Error("maxColumns should be greater than 0");this.maxColumns=a,this.enableCrop=h,this.preserveAspectRatio=u}return t.prototype.addRow=function(t){this.rows.push(t)},t.prototype.fillRows=function(){var t=this;return this._items.forEach((function(e){var r=t.rows[t.rows.length-1];if(!r){var i=new d(t);t.addRow(i),r=i}0===r.columns?r.addItem(e):r.canAddItem(e)?r.addItem(e):(r.adjust(),(i=new d(t)).addItem(e),t.addRow(i))})),this.rows},t}(),d=function(){function t(t){this.items=[],this._grid=t}return Object.defineProperty(t.prototype,"isLast",{get:function(){return this._grid.rows[this._grid.rows.length-1]===this},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"itemRatioRange",{get:function(){return this._grid.itemRatioRange},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"width",{get:function(){return this._grid.containerWidth-Math.max(this.columns-1,0)*this._grid.gap},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"height",{get:function(){return 0===this.columns?0:this.width/this.ratio},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"ratio",{get:function(){var t=this.items.map((function(t){return t.ratio})).reduce((function(t,e){return t+e}),0);return this.isLast?c(t,this.ratioRange.min):t},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"columns",{get:function(){return this.items.length},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"ratioRange",{get:function(){var t=this.width;return{min:t/this._grid.rowHeightRange.max,max:t/this._grid.rowHeightRange.min}},enumerable:!1,configurable:!0}),t.prototype.addItem=function(t){this.items.push(new m(t,this))},t.prototype.canAddItem=function(t){var e=this.clone(this._grid);e.addItem(t);var r=e.ratioRange.max,i=e.ratio<=r,n=!this._grid.maxColumns||this._grid.maxColumns>=e.columns;return i&&n},t.prototype.clone=function(e){var r=new t(e);return r.items=this.items.map((function(t){return t.clone(r)})),r},t.prototype.adjust=function(){if(!this._grid.preserveAspectRatio){var t=this.ratio,e=this.ratioRange;if(t<e.min){var r=e.min-t,i=function(t,e,r){if(r||2===arguments.length)for(var i,n=0,o=e.length;n<o;n++)!i&&n in e||(i||(i=Array.prototype.slice.call(e,0,n)),i[n]=e[n]);return t.concat(i||Array.prototype.slice.call(e))}([],this.items,!0);i.sort((function(t,e){return t.ratio-e.ratio}));var n=i[0];n&&(n.ratio+=r)}else if(t>e.max){
//!IMPORTANT
var o=(r=e.max-t)/this.columns;this.items.forEach((function(t){t.ratio+=o}))}}},t}(),m=function(){function t(t,e){this.content=t,this._row=e,this._ratio=c(s(t),this.ratioRange.min,this.ratioRange.max)}return Object.defineProperty(t.prototype,"ratioRange",{get:function(){return this._row.itemRatioRange},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"ratio",{get:function(){return this._ratio},set:function(t){this._ratio=c(t,this.ratioRange.min,this.ratioRange.max)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"originalRatio",{get:function(){return s(this.content)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"size",{get:function(){var t=this._row.height;return{width:this.ratio*t,height:t}},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"cropBox",{get:function(){return t=this.size,e=this.content,r=s(t),i=s(e),n={width:e.width,height:e.height,left:0,top:0},r>i?(n.width=t.width,n.height=t.width/i):(n.width=t.height*i,n.height=t.height),n.left=-Math.abs(t.width-n.width)/2,n.top=-Math.abs(t.height-n.height)/2,n;var t,e,r,i,n},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"fitBox",{get:function(){return t=this.size,e=this.content,r=s(t),i=s(e),n={width:e.width,height:e.height,left:0,top:0},r<i?(n.width=t.width,n.height=t.width/i):(n.width=t.height*i,n.height=t.height),n.left=-Math.abs(t.width-n.width)/2,n.top=-Math.abs(t.height-n.height)/2,n;var t,e,r,i,n},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"aspectRatioPreserved",{get:function(){return this.originalRatio===this.ratio},enumerable:!1,configurable:!0}),t.prototype.clone=function(e){return new t(this.content,e)},t}(),l=function(t){var e=t.items,n=t.itemRenderer,o=t.keyExtractor,a=t.gap,h=void 0===a?0:a,s=t.rowHeightRange,c=t.itemRatioRange,g=t.maxColumns,d=t.preserveAspectRatio,m=t.scrollRef,l=function(){var t=i.useRef(null),e=i.useState({width:0,height:0}),r=e[0],n=e[1];return i.useEffect((function(){var e=function(){var e=t.current;if(e){var r=e.getBoundingClientRect();n((function(t){return t.width===r.width&&t.height===r.height?t:{width:r.width,height:r.height}}))}};e();var r=new MutationObserver(e);return t.current&&r.observe(t.current,{childList:!0,subtree:!0,attributes:!0}),window.addEventListener("resize",e),function(){r.disconnect(),window.removeEventListener("resize",e)}}),[]),{measureRef:t,size:r}}(),p=l.measureRef,w=l.size.width||500,v=f({items:e,containerWidth:w,gap:h,rowHeightRange:s,itemRatioRange:c,maxColumns:g,preserveAspectRatio:d});return r("div",{ref:p,style:{display:"flex",flexDirection:"column",width:"100%",gap:h},children:r(u,{scrollRef:m,items:v,gap:h,containerRef:p,itemRenderer:function(t){var e=t.item,i=t.index,a={display:"flex",flexDirection:"row",gap:h,height:e.height};return r("div",{style:a,children:e.items.map((function(t,e){var i=t.size,a=o?o(t.content,e):e;return r("div",{style:i,children:n({index:e,item:t.content,size:t.size,cropBox:t.cropBox,fitBox:t.fitBox,aspectRatioPreserved:t.aspectRatioPreserved})},a)}))},i)}})})};export{l as Gallery};
//# sourceMappingURL=index.js.map
