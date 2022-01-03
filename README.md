## Image Slicer

&nbsp;

### A little module for loading an image, slicing it up into canvas objects and animating with CSS translate transitions... its a work in progress ha.

&nbsp;

#### import and declare ImageSlicer object, upon instantiation the slicer will load the image with 'display: none' to get dimensions for scaling then it will remove it. Supports multiple slicer per page with the ID.

```js
import { ImageSlicer } from './image-slicer.js';
import slicerImg from 'Assets/about-me.jpg';


const imageSlicer = new ImageSlicer([unique numerical ID], slicerImg, [num rows], [num cols]);

```

&nbsp;

#### Get the HTML of the object which can be added to the page, this will be blank until the init function is called.

```js
const imageSlicerHTML = imageSlicer.getHTML();
```

&nbsp;

#### Currently I have a few different animations and init random which randomly inits one of them with some preset settings.

&nbsp;

#### The animations are tied to scrolling the parent element. If that element is not the body then pass it in. To disable scroll events pass in a null. But the fold in/out animation is really only made for scrolling.

&nbsp;

#### Each x, y step is equal to the width, height of a tile. Increasing the number the steps per move makes each move go father

```js
initSpreadElement([number of moves], [number of steps], wrapper);

initFoldInElement(wrapper);

initRandomElement(wrapper);
```

&nbsp;

#### Current known issues, limitations, and room for improvements

1. If an image is not evenly divisible by the number of rows and cols there will be artifacts when the tiles come together. This is resolved on resize, but not on zoom. It has to do with errors when scaling, slicing, and arranging the canvas tiles. Will work on a refactor and optimization focused on these issues.
2. Mobile browsers may zoom or scale viewport and create similar artifacts.
