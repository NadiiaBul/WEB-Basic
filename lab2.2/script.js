document.addEventListener('DOMContentLoaded', function() {
    const table = document.getElementById('colorTable');
    const numRows = 6;
    const numCols = 6;
    let selectedColor = '#ffffff';
    let isDoubleClick = false;

    for (let i = 0; i < numRows; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < numCols; j++) {
            const cell = document.createElement('td');
            cell.textContent = i * numCols + j + 1;

            cell.addEventListener('mouseover', function() {
                if (!isDoubleClick && this.textContent === '6') {
                    const randomColor = getRandomColor();
                    this.style.backgroundColor = randomColor;
                    selectedColor = randomColor;
                } else {
                    this.classList.add('hover');
                }
            });

            cell.addEventListener('mouseout', function() {
                this.classList.remove('hover');
            });

            cell.addEventListener('click', function() {
                if (!isDoubleClick && this.textContent === '6') {
                    const colorPicker = document.createElement('input');
                    colorPicker.type = 'color';
                    colorPicker.addEventListener('change', function() {
                        cell.style.backgroundColor = this.value;
                        selectedColor = this.value;
                    });
                    colorPicker.click();
                } else {
                    this.classList.remove('hover');
                }
            });

            cell.addEventListener('dblclick', function() {
            if (this.textContent === '6') {
                isDoubleClick = true;
                for(let i=0; i<numRows; i++){
                    for(let j=0; j<numCols; j++){
                        const currentCell = table.rows[i].cells[j]; 
                        currentCell.style.backgroundColor = "#ffffff";
                    }
                }
                const rowIndex = this.parentElement.rowIndex;
                const cellIndex = this.cellIndex;

                const rectWidth = Math.floor(Math.random() * (numCols - cellIndex)) + 1;
                const rectHeight = Math.floor(Math.random() * (numRows - rowIndex)) + 1;

                for (let i = rowIndex; i < rowIndex + rectHeight; i++) {
                    for (let j = cellIndex; j > rectWidth; j--) {
                        if (i < numRows && j < numCols) {
                            const currentCell = table.rows[i].cells[j];
                            currentCell.style.backgroundColor = selectedColor;
                            currentCell.classList.remove('hover');
                        }
                    }
                }

                isDoubleClick = false;
            }
        });
            row.appendChild(cell);
        }
        table.appendChild(row);
    };

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
});
