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
  const tbody = document.querySelector('tbody');
  const bingoCall = document.getElementById('bingoCall');
  const reach = document.getElementById('reach');
  let counts = 0;
  let clicks = 0;
  button.addEventListener('click', () => {
    clicks++;
    let free = document.querySelector('tbody').rows[2].cells[2];
    if (free.textContent === 'FREE') {
      free.classList.add('called');
    }

    let next = numbers.splice(Math.floor(Math.random() * numbers.length), 1)[0]
    nextNum.textContent = next;
    calledNumbers.push(next);
    calledNum.textContent = calledNumbers;    
    for (let i = 0; i < 5; i++) {
      for (let n = 0; n < 5; n++) {
        let cell = document.querySelector('tbody').rows[i].cells[n];
        if (cell.textContent === nextNum.textContent) {
          cell.classList.add('called');
        }
      }
    }

    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        if (tbody.rows[r].cells[c].classList.contains('called')) {
          counts++;
        }
        if (c === 4) {
          if (counts === 4) {
            reach.classList.remove('hiddenR');
          }
          if (counts === 5) {
            bingoCall.classList.remove('hidden');
          } else {
            counts = 0;
          }
        }
      }
    }
    for (let c = 0; c < 5; c++) {
      for (let r = 0; r < 5; r++) {
        if (tbody.rows[r].cells[c].classList.contains('called')) {
          counts++;
        }
        if (r === 4) {
          if (counts === 4) {
            reach.classList.remove('hiddenR');
          }
          if (counts === 5) {
            bingoCall.classList.remove('hidden');
          } else {
            counts = 0;
          }
        }
      }
    }
    for (let i = 0; i < 5; i++) {
      if (tbody.rows[i].cells[i].classList.contains('called')) {
        counts++;
      }
      if (i === 4) {
        if (counts === 4) {
          reach.classList.remove('hiddenR');
        }
        if (counts === 5) {
          bingoCall.classList.remove('hidden');
        } else {
          counts = 0;
        }
      }
    }
    for (let i = 0; i < 5; i++) {
      if (tbody.rows[i].cells[4 - i].classList.contains('called')) {
        counts++;
      }
      if (i === 4) {
        if (counts === 4) {
          reach.classList.remove('hiddenR');
        }
        if (counts === 5) {
          bingoCall.classList.remove('hidden');
        } else {
          counts = 0;
        }
      }
    }
    const callCount = document.getElementById('callCount');
    callCount.textContent = `${clicks}th call`;
    console.log(counts);
  });
}