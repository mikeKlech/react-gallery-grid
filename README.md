
# React Gallery Grid - Justified Layout with Infinite Scroll Support[![CI](https://cdn.creazilla.com/logo/designed-by-creazilla-bold.svg)](https://creazilla.com/) 



Create stunning, responsive galleries effortlessly with React Gallery Grid. This versatile component offers a justified layout, ensuring that your images are elegantly arranged with consistent row heights. Supporting infinite scroll allows users to comfortably explore your gallery without interruption by page toggling.

## Features

* Justified Grid: Achieve a harmonious and justified layout for your images, creating a visually engaging gallery.
* Infinite Scroll: Allow users to enjoy seamless and uninterrupted scrolling without compromising performance.
* Responsive Design: React Justified Gallery adapts seamlessly to different screen sizes, ensuring an optimal viewing experience across devices.


## Installation
```bash
  npm install react-gallery-grid
```
    
## Usage/Examples

The only one requirement is: **Every item of the grid should have "width" and "height" properties.**

### Source: data.ts
```javascript
interface SizeType {
    width: number;
    height: number;
}

export const images: SizeType[] = [
    {
        url: 'image1.png',
        width: 470,
        height: 280,
    },
    {
        url: 'image2.png',
        width: 620,
        height: 1080,
    },
    ...
]
```
### Basic usage: MyGallery.tsx
```javascript
import { Gallery } from 'react-gallery-grid';
import { images } from 'data.ts';

function MyGallery() {
    return (
        <Gallery
            items={images}
            itemRenderer={({ item, size }) => (
                <img 
                    src={item.url} 
                    width={size.width} 
                    height={size.height} 
                />
            )}
            rowHeightRange={{ min: 200, max: 350 }}
            gap={8}
            preserveAspectRatio={true}
        />
  )
}
```
### Advanced usage:
"For everything you gain, you lose something else.” — Ralph Waldo Emerson

The same is true for our grid:

**If we keep aspect ratio - we lose row height range.**

In the example above we preserve the aspect ratio of our images and therefore not every row fits within the height range.

To strictly match the row height range, we should ignore the aspect ratio by setting  **preserveAspectRatio** to **false**.
In this case, we don't want our images to be distorted, so we can:
*  Crop the images.
*  Fit the images.
*  Or perhaps something else; let me know :)
We can achieve this in a simple way by using the [object-fit](https://developer.mozilla.org/ru/docs/Web/CSS/object-fit) CSS property.

```javascript
import { Gallery } from 'react-gallery-grid';
import { images } from 'data.ts';

function CropOrFitGallery() {
    return (
        <Gallery
            preserveAspectRatio={false}
            rowHeightRange={{ min: 200, max: 350 }}
            items={images}
            itemRenderer={({ item, size }) => (
                <img 
                    src={item.url} 
                    width={size.width} 
                    height={size.height} 
                    //for cropping the image
                    style={{object-fit: 'cover'}}
                    //for fitting the image
                    style={{object-fit: 'contain'}}
                />
            )}
            gap={8}
        />
  )
}
```

P.S.: Sometimes it is not possible to use CSS for cropping\fitting images. 
So, the **itemRenderer** provides you with extra data, **cropBox** and **fitBox**, for every item."

### Extra cool features:
**1. Cut big images**

Simetimes it is usefull to crop very long or very tall images.
We can set up the **itemRatioRange**(Works only with preserveAspectRatio = false).

```javascript
import { Gallery } from 'react-gallery-grid';
import { images } from 'data.ts';

function CropOrFitGallery() {
    // const aspectRatio = width/height;
    // 0.5 - means ratio 1:2
    // 2.0 - means ratio 2:1
    const itemRatioRange = {min: 0.5, max: 2.0};
    return (
        <Gallery
            itemRatioRange={itemRatioRange}
            preserveAspectRatio={false}
            items={images}
            itemRenderer={({ item, size }) => (
                <img 
                    src={item.url} 
                    width={size.width} 
                    height={size.height} 
                    style={{object-fit: 'cover'}}
                />
            )}
            rowHeightRange={{ min: 200, max: 350 }}
            gap={8}
        />
  )
}
```
**2. Infinite scroll** 

For infinite scrolling of the gallery without losing performance, wrap it in the scroll element and pass its ref to the Gallery **scrollRef** prop.
```javascript
import { Gallery } from 'react-gallery-grid';
import { images } from 'data.ts';
import MyScroll from './MyScroll.tsx';

function InfiniteGallery() {
    const scrollRef = React.useRef(null);

    return (
        <MyScroll ref={scrollRef}>
            <Gallery
                scrollRef={scrollRef}
                items={images}
                itemRenderer={({ item, size }) => (
                    <img 
                        src={item.url} 
                        width={size.width} 
                        height={size.height} 
                    />
                )}
                rowHeightRange={{ min: 200, max: 350 }}
            />
        </MyScroll>
  )
}
```
## API
type SizeType = {width: number, height: number};

type BoxType = {width: number, height: number, left: number, top: number};
#### <Gallery /> props:


| Prop | Type     | Description                |
| :-------- | :------- | :------------------------- |
| items | SizeType[] | **Required**. Items need to be placed into the rows. Each item should have 'width' and 'height' properties. |
| itemRenderer | (props) => any | **Required**. Renderer for every item where in props you can get extra info about the item and its size. |
| rowHeightRange | {min: number, max: number} | **Optional**. Minimum and maximum row heights. Works when preserveAspectRatio is set to false. |
| itemRatioRange | {min: number, max: number} | **Optional**. Minimum and maximum aspect ratio of every item. Works when preserveAspectRatio is set to false. |
| gap | number | **Optional**. Gap between rows and columns. |
| preserveAspectRatio | boolean | **Optional**. By default it's false. If set to true, rowHeightRange and itemRatioRange will be ignored. |
| maxColumns | number | **Optional**. Max columns (items) in the row. |
| scrollRef | React.RefObject<HTMLElement> | **Optional**. A reference to the scroll element for implementing infinite scrolling, enhancing performance. |
| keyExtractor | (item: SizeType, index: number) => string \| number | **Optional**. Key extractor for better performance. |


#### itemRenderer props:
| Prop | Type     | Description                |
| :-------- | :------- | :------------------------- |
| item | SizeType | The original item. |
| size | SizeType | The rendering size of the item. |
| index | number | The index of the item in the original array.|
| cropBox | BoxType | Helper field to fill the image size. Analogous to the 'object-fit: cover' CSS property for the <img/> tag. |
| fitBox | BoxType | Helper field to fit the image into the size. Analogous to the 'object-fit: contain' CSS property for the <img/> tag. |
| aspectRatioPreserved | boolean | Indicates whether the aspect ratio was preserved or not. |

## License

[MIT](https://choosealicense.com/licenses/mit/)

