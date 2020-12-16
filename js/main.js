'use strict';
{

  // const numbers = [];
  // for (let i = 0; i < 15; i++) {
  //   numbers.push(i + 1);//i+1にすることで０－１４を１－１５にする
  // };
  
  // const selectedNumbers = [];
  // for (let i = 0; i < 5; i++) {
  // // let selectedN = Math.floor(Math.random() * numbers.length);
  // let selectedN = numbers.splice(Math.floor(Math.random() * numbers.length), 1)[0];//[0]でsplice()で作成した配列のindex[0]番目と指定する。そうしないと配列として指定されることになる。
  // selectedNumbers.push(selectedN);
  // };


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
  // document.querySelector('tbody').rows[2].cells[2].classList.add('called');
  
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
    // console.log(next);
    console.log(nextNum.textContent);
    calledNumbers.push(next);
    calledNum.textContent = calledNumbers;
    for (let i = 0; i < 5; i++) {
      for (let n = 0; n < 5; n++) {
        let cell = document.querySelector('tbody').rows[i].cells[n];
        // console.log(cell);
        console.log(cell.textContent);
        if (cell.textContent === nextNum.textContent) {
          cell.classList.add('called');
        }
      }
    }
  });

  //↓自作
  // const b = [];
  // const i = [];
  // const n = [];
  // const g = [];
  // const o = [];

  // function getNumbers(retsu, th) {
    
  //   const source = [];
  //   for (let i = 0; i < 15 + 15 * retsu; i++) {
  //     source[i] = i + 1;
  //   };
  
  //   for (let i = 0; i < 5; i++) {
  //     th[i] = source.splice(Math.floor(Math.random() * (source.length - 15 * retsu))+ 15 * retsu, 1)[0];
  //   };
  // };

  // getNumbers(0, b);
  // getNumbers(1, i);
  // getNumbers(2, n);
  // getNumbers(3, g);
  // getNumbers(4, o);
  // console.log(b);
  // console.log(i);
  // console.log(n);
  // console.log(g);
  // console.log(o);
  // 自作ここまで↑
}