export class ImageGrid {
    constructor(rows, cols, tileWidth, tileHeight) {
        this.rows = rows;
        this.cols = cols;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.tiles = [];
        this.initGrid(tileWidth, tileHeight);
    }

    initGrid(tileWidth, tileHeight) {
        let index = 0;
        this.tiles = [];
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                const foldDir = this.getFoldDir(i, j);
                this.tiles.push(
                    new Tile(
                        index,
                        j * tileWidth,
                        i * tileHeight,
                        tileWidth,
                        tileHeight,
                        foldDir.foldDirX,
                        foldDir.foldDirY
                    )
                );
                index++;
            }
        }
    }

    resetGrid(tileWidth, tileHeight) {
        let index = 0;
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                const foldDir = this.getFoldDir(i, j);
                this.tiles[index].id = index;
                this.tiles[index].x = j * tileWidth;
                this.tiles[index].y = i * tileHeight;
                this.tiles[index].width = tileWidth;
                this.tiles[index].height = tileHeight;
                this.tiles[index].foldDirX = foldDir.foldDirX;
                this.tiles[index].foldDirY = foldDir.foldDirY;
                index++;
            }
        }
    }

    getFoldDir(i, j) {
        let foldDirX = 0;
        let foldDirY = 0;
        let halfWidth = Math.floor(this.cols / 2);
        let halfHeight = Math.floor(this.rows / 2);
        foldDirX = j < halfWidth ? 1 : -1;
        foldDirY = i < halfHeight ? 1 : -1;
        if (this.cols % 2 === 1 && j === halfWidth) {
            foldDirX = 0;
        }
        if (this.rows % 2 === 1 && i === halfHeight) {
            foldDirY = 0;
        }
        return { foldDirX, foldDirY };
    }

    getCurrentState() {
        let frame = [];

        for (let i = 0; i < this.tiles.length; i++) {
            frame.push(this.tiles[i].getTile());
        }
        return frame;
    }
}

class Tile {
    constructor(id, x, y, width, height, foldDirX, foldDirY) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.foldDirX = foldDirX;
        this.foldDirY = foldDirY;
        this.dir = Math.floor(Math.random() * 4);
        this.lastDir = Math.floor(Math.random() * 4);
    }

    moveUp(steps) {
        this.y -= this.height * steps;
    }

    moveDown(steps) {
        this.y += this.height * steps;
    }

    moveLeft(steps) {
        this.x -= this.width * steps;
    }

    moveRight(steps) {
        this.x += this.width * steps;
    }

    walkRandom(steps) {
        this.lastDir = this.dir;
        this.dir = Math.floor(Math.random() * 4);
        let moves = [
            () => this.moveUp(steps),
            () => this.moveDown(steps),
            () => this.moveLeft(steps),
            () => this.moveRight(steps)
        ];

        while (this.dir + this.lastDir === 1 || this.dir + this.lastDir === 5) {
            this.dir = Math.floor(Math.random() * 4);
        }
        moves[this.dir]();
    }

    foldIn() {
        this.x = this.x + (this.foldDirX * this.width) / 2;
        this.y = this.y + (this.foldDirY * this.height) / 2;
    }

    getTile() {
        let tile = {};
        tile.id = this.id;
        tile.x = this.x;
        tile.y = this.y;
        tile.width = this.width;
        tile.height = this.height;
        return tile;
    }
}
