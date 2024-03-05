import React, { useState,useEffect } from 'react';
import Grid from './grid/grid';
import 'bootstrap/dist/css/bootstrap.css';
function App() {
  const [board, setBoard] = useState([
    ['5', '3', '.', '.', '7', '.', '.', '.', '.'],
    ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
    ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
    ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
    ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
    ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
    ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
    ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
    ['.', '.', '.', '.', '8', '.', '.', '7', '9']
  ]);
  const [count,setcount]=useState(0);



  const condition = (board, val, x, y) => {
    for (let i = 0; i < 9; i++) {
      if (board[x][i] === val) {
        return false;
      }
      if (board[i][y] === val) {
        return false;
      }
      if (board[3 * Math.floor(x / 3) + Math.floor(i / 3)][3 * Math.floor(y / 3) + (i % 3)] === val) {
        return false;
      }
    }
    return true;
  };

  const solveSudoku = () => {
    const pathStates = []; 
  
    const solve = (board) => {
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (board[i][j] === '.') {
            for (let num = 1; num <= 9; num++) {
              const numString = num.toString();
              if (condition(board, numString, i, j)) {
                board[i][j] = numString;
  
              
                const newPathState = JSON.parse(JSON.stringify(board));
                pathStates.push(newPathState);
  
                
  
                if (solve(board)) {
                  return true;
                } else {
                  board[i][j] = '.';
                }
              }
            }
            return false;
          }
        }
      }
      return true;
    };
    
    const newBoard = JSON.parse(JSON.stringify(board));
    pathStates.push(newBoard);
    solve(newBoard);
     
    pathStates.forEach((state, index) => {
      if (index === 0) {
        return;
      }
      setTimeout(() => {
        setBoard(state);
        setcount(index)
      }, (index + 1) * 100); 
     
    });
 
  };
  useEffect(() => {
    console.log(count); 
  }, [count]);

  return (
    <div className="sudoku">
      <h1 style={{ textAlign: 'center' }}>Sudoku</h1>
      <div className="d-flex justify-content-center">
        {board.map((row, rowIndex) => (
          <div key={rowIndex}>
            {row.map((value, columnIndex) => (
              <Grid key={columnIndex} value={value} />
            ))}
          </div>
        ))}

        
      </div>
      <div className="d-flex justify-content-center my-2">
      <button className="btn btn-primary" onClick={solveSudoku}>Solve</button>
     
      </div>
      <div className="d-flex justify-content-center my-2">
     <h2>COUNT : {count}</h2>
      </div>
    </div>
  );
}

export default App;
