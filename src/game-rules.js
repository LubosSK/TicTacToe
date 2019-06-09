export function checkVictory(boardState) {
    const fullRowIndex = checkRows(boardState);
    if (fullRowIndex > -1) {
        return boardState.map((s, i) => ({ row: fullRowIndex, column: i }));
    }

    const fullColumnIndex = checkColumns(boardState);
    if (fullColumnIndex > -1) {
        return boardState[0].map((s, i) => ({ row: i, column: fullColumnIndex }));
    }

    if (checkDownDiagonal(boardState)) {
        return boardState.map((b, i) => ({ row: i, column: i }));
    }

    if (checkUpDiagonal(boardState)) {
        return boardState.map((b, i) => ({ row: i, column: boardState.length - 1 - i }));
    }

    return [];
}

export function checkDraw(boardState) {
    return boardState.every(row => row.every(col => col.ownerIndex > -1));
}

function checkRows(boardState) {
    return boardState.findIndex(b =>
        b[0].ownerIndex >= 0 && b.every(v => v.ownerIndex === b[0].ownerIndex)
    );
}

function checkColumns(boardState) {
    return boardState[0].findIndex((b, i) =>
        b.ownerIndex >= 0 && boardState.every(v => v[i].ownerIndex === b.ownerIndex));
}

// diagonal from top left to down right
function checkDownDiagonal(boardState) {
    return boardState[0][0].ownerIndex >= 0
        && boardState.every((b, i) => boardState[0][0].ownerIndex === b[i].ownerIndex);
}

// diagonal from bottom left to top right
function checkUpDiagonal(boardState) {
    const leftBottom = boardState[0][boardState.length - 1].ownerIndex;
    return leftBottom >= 0 && boardState.every((b, i) => leftBottom === b[boardState.length - i - 1].ownerIndex);
}