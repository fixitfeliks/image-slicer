import { shuffleArray } from './shufflers';

import {
    MAIN_WRAPPER_ELEMENT_ID,
    GRID_WRAPPER_ELEMENT_ID,
    GRID_WRAPPER_ELEMENT_CLASS,
    GRID_ELEMENT_CLASS,
    GRID_ELEMENT_ID
} from './slicer-constants.js';

export function createGridLayout(numTiles, id) {
    const fragment = document.createDocumentFragment();
    const itemsFragment = document.createDocumentFragment();
    if (numTiles != null) {
        const wrapper = document.createElement('div');
        wrapper.className = GRID_WRAPPER_ELEMENT_CLASS;
        wrapper.id = GRID_WRAPPER_ELEMENT_ID + id;
        for (let i = 0; i < numTiles; i++) {
            const itemId = GRID_ELEMENT_ID + id + i;
            const gridItem = document.createElement('canvas');
            gridItem.id = itemId;
            gridItem.className = GRID_ELEMENT_CLASS;
            gridItem.style.display = 'none';
            itemsFragment.appendChild(gridItem);
        }
        wrapper.append(...shuffleArray(itemsFragment.children));
        fragment.appendChild(wrapper);
        return fragment;
    }
    const error = document.createElement('div');
    error.innerHTML = '<b> layout null </b>';
    fragment.appendChild(error);
    return fragment;
}

export function initCanvasTile(canvas, tile) {
    applyTranslate(canvas, tile.x, tile.y);
}

export function showTiles(tiles, id) {
    const wrapper = document.getElementById(MAIN_WRAPPER_ELEMENT_ID + id);
    for (let i = 0; i < tiles.length; i++) {
        const tile = document.getElementById(GRID_ELEMENT_ID + id + tiles[i].id);
        tile.style.display = 'block';
    }
}

export function updateGridLayout(tiles, id) {
    if (tiles != null)
        for (let i = 0; i < tiles.length; i++) {
            const gridItem = document.getElementById(GRID_ELEMENT_ID + id + tiles[i].id);
            applyTranslate(gridItem, tiles[i].x, tiles[i].y);
        }
}

function applyTranslate(element, x, y) {
    element.style.transform = `translate(${x}px, ${y}px) translate3d(0, 0, 0)`;
    element.style.MozTransform = `translate(${x}px, ${y}px) translate3d(0, 0, 0)`;
    element.style.WebkitTransform = `translate(${x}px, ${y}px) translate3d(0, 0, 0)`;
    element.style.OTransform = `translate(${x}px, ${y}px) translate3d(0, 0, 0)`;
    element.style.msTransform = `translate(${x}px, ${y}px) translate3d(0, 0, 0)`;
}
