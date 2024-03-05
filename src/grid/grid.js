import React from 'react';

export default function Grid(props) {
  return (
    <div className="p-2 bd-highlight" style={{ height: "3rem", width: "3rem", background: (props.value!==".")?"yellow":"red", border: "1px solid black" }}>
      {props.value}
    </div>
  );
}
