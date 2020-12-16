'use strict';
{
  function createColumn(col) {
    const source = [];
    for (let i = 0; i < 15; i++) {
      source[i] = i + 1 + 15 * col;
    }
  
    const column = [];
    for (let i = 0; i < 5; i++) {
      column[i] = source.splice(Math.floor(Math.random() * source.length), 1)[0];
    }

    return column;
  }

  function createColumns() {
    const columns = [];
    for (let i = 0; i < 5; i++) {
      columns[i] = createColumn(i);
    }
    columns[2][2] = 'FREE';
    return columns;
  }

  function renderBingo(columns) {
    for (let row = 0; row < 5; row++) {
      const tr = document.createElement('tr');
      for (let col = 0; col < 5; col++) {
        const td = document.createElement('td');
        td.textContent = columns[col][row];
        tr.appendChild(td);
      }
      
      document.querySelector('tbody').appendChild(tr);
    }
  }

  const columns = createColumns();
  renderBingo(columns);

  //next number call  
  const numbers = [];
  for (let i = 0; i < 75; i++) {
    numbers[i] = i + 1;
  }
  const nextNum = document.getElementById('nextNum');
  const button = document.querySelector('button');
  const calledNum = document.getElementById('calledNum');
  const calledNumbers = [];
  button.addEventListener('click', () => {
    let free = document.querySelector('tbody').rows[2].cells[2];
    if (free.textContent === 'FREE') {
      free.classList.add('called');
    }

    let next = numbers.splice(Math.floor(Math.random() * numbers.length), 1)[0]
    nextNum.textContent = next;
    console.log(nextNum.textContent);
    calledNumbers.push(next);
    calledNum.textContent = calledNumbers;
    for (let i = 0; i < 5; i++) {
      for (let n = 0; n < 5; n++) {
        let cell = document.querySelector('tbody').rows[i].cells[n];
        console.log(cell.textContent);
        if (cell.textContent === nextNum.textContent) {
          cell.classList.add('called');
        }
      }
    }
  });
}