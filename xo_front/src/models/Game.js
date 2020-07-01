import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Service } from 'axios-middleware';
import MsgBar from './MsgBar';
import { fieldUrl, moveUrl, resetUrl } from '../constants';

export default function Game(props) {
  const [field, setField] = useState([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
  const [winner, setWinner] = useState();
  const [errorMsg, setErrorMsg] = useState(null);
  const [movesCounter, setMovesCounter] = useState(0);
  const [maxMoves, setMaxMoves] = useState(field.length ** 2 - 1);

  const updateField = function () {
    axios.get(fieldUrl).then(res => {
      setField(res.data);
    })
  };

  const move = function (x, y) {
    setErrorMsg(null);
    if (!winner) { // check if game is over already
      axios.post(moveUrl, {
        x: x + 1,
        y: y + 1
      }).then((res) => {
        if (res.data.winner) { //check if someone won
          setWinner('Player ' + res.data.winner + ' won!');
          updateField(); // refresh the field
        }
        //otherwise check if field is full then it should be Tie, so game is over
        movesCounter === maxMoves ? setWinner("Tie") : setMovesCounter(movesCounter + 1);
        updateField();
      }, (error) => {
        //yet single error is 
        setErrorMsg(error.response.data);
      });
    }
  };
  const reset = () => {
    axios.post(resetUrl);
    setMovesCounter(0);
    updateField();
    setWinner();
    setErrorMsg('');
  };
  const showCell = function (value) {
    if (!value) return ' ';
    return value == '1' ? 'x' : 'o';
  };

  return (
    <div className="App">
      <div className="field">
        {field.map((row, x) =>
          <div className="row">
            {row.map((el, y) =>
              <div className="cell" onClick={() => move(x, y)}>
                {showCell(el)}
              </div>)}
          </div>)}
        <div className="button" style={{ width: "100%" }} onClick={() => reset()}>Reset</div>
      </div>
      <div className="bottombar">
        {winner ? <MsgBar msg={winner} /> : null}
        {errorMsg ? <MsgBar error={true} msg={errorMsg} /> : null}
      </div>
    </div>
  );
}