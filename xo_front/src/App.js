import React, {useState, useEffect} from 'react';
//import logo from './logo.svg';
import axios from 'axios';

import './App.css';

import { fieldUrl, moveUrl, resetUrl } from './constants';

function App() {
  const [field, setField] = useState([[0, 0, 0],[0, 0, 0],[0, 0, 0]]);
  const [winner, setWinner] = useState();
  const [errorMsg, setErrorMsg] = useState(null);
  const updateField = function() {
    axios.get(fieldUrl).then(res => {
      setField(res.data);
    })
  };

  const move = function(x, y){
    //console.log(x + ' , ' + y);
    setErrorMsg(null);
    if(!winner) {
      axios.post(moveUrl, {
        x: x + 1,
        y: y + 1
      }).then((res) => {
        if (res.data.winner) {          
          setWinner('Player ' + res.data.winner + ' won! Fatality!');
          updateField();
        }
        else if (res.data === 'Tie') {
          setWinner('Game is over!');
          updateField();
        }
      updateField();
    },
      (error) => {
        setErrorMsg('Cell is taken or out of field');
        updateField();
      });
  }};
  const reset = () => {
    axios.post(resetUrl);
    updateField();
    setWinner();
  };

  useEffect(() => {
    updateField();
    setInterval(updateField, 2000);
  }, []);

  const showCell = function(value) {
    if (!value) return ' ';
    return value == '1' ? 'x' : 'o';
  };

  return (
    <div className="App">
      <div className="field">
        {field.map((row, x) => <div className="row">
          {row.map((el, y) => <div className="cell" onClick={() => move(x, y)}>{showCell(el)}</div>)}
        </div>)}
        <div className="button" style={{ width: "100%" }}  onClick={() => reset()}>Reset</div>
        {winner ? <p style={{ textAlign: "center", backgroundColor: '#0f646e', color: 'white' }}>{winner}</p> : null}
        {errorMsg ? <p style={{ textAlign: "center", backgroundColor: '#cc3f23', color: 'white' }}>{errorMsg}</p> : null}
      </div>
    </div>
  );
}

export default App;
