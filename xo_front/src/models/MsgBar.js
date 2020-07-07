import React from 'react';

export default function MsgBar(props) {
  const style = {
    textAlign: "center",
    backgroundColor: '#0f646e',
    color: 'white'
  };
  const errStyle = {
    textAlign: "center", 
    backgroundColor: '#cc3f23', 
    color: 'white'
  };
  return (

  <div style={ props.error ? errStyle : style }>{props.msg}</div>
  )
};

