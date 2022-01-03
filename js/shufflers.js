export function squareShuffle(grid) {
    let newGrid = { ...grid };
    let traveled = createAndFill2DArray(grid.x, grid.y, 0);
    for (let i = 0; i < newGrid.length; i++) {
        for (let j = 0; j < newGrid[i].length; j++) {
            let dir = 0;
            if (!traveled[i][j]) {
                if (i === newGrid.length - 1) {
                    dir = 0;
                } else if (j === newGrid[i].length - 1) {
                    dir = 1;
                } else {
                    dir = Math.floor(Math.random() * 2);
                }
                if (!(i === newGrid.length - 1 && j === newGrid[i].length - 1)) {
                    let tI = dir ? i + 1 : i;
                    let tJ = dir ? j : j + 1;

                    if (traveled[tI][tJ] !== 1) {
                        let temp = newGrid[i][j];
                        newGrid[i][j] = newGrid[tI][tJ];
                        newGrid[tI][tJ] = temp;
                    }

                    traveled[i][j] = 1;
                    traveled[tI][tJ] = 1;
                }
            }
        }
    }
    return newGrid;
}

export function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i);
        const temp = newArray[i];
        newArray[i] = newArray[j];
        newArray[j] = temp;
    }
    return newArray;
}

function createAndFill2DArray(rows, columns, defaultValue) {
    return Array.from({ length: rows }, () => Array.from({ length: columns }, () => defaultValue));
}
