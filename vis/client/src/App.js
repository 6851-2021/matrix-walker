import PixelGrid from "react-pixel-grid";
import React, { useEffect, useState } from "react";
import Selector from './Selector.js';
import './App.css';

const NAIVE = 0;
const ZINDEX = 1;
const HILBERT = 2;

function App() {
  const [size, setSize] = useState(512);
  const [leftMatrix, setLeftMatrix] = useState(-1);
  const [rightMatrix, setRightMatrix] = useState(-1);
  const [naive, setNaive] = useState(Array(512*512).fill(0).map(Math.random));
  const [zindex, setZindex] = useState(Array(512*512).fill(1));
  const [hilbert, setHilbert] = useState(Array(512*512).fill(0));

  useEffect(() => {
  });

  let leftData = null;
  if (leftMatrix === 0) {
    leftData = naive;
  } else if (leftMatrix === 1) {
    leftData = zindex;
  } else if (leftMatrix === 2) {
    leftData = hilbert;
  } 

  let rightData;
  if (rightMatrix === 0) {
    rightData = naive;
  } else if (rightMatrix === 1) {
    rightData = zindex;
  } else if (rightMatrix === 2) {
    rightData = hilbert;
  } 

  const selected = (side, value) => {
    // side is true if it is left
    if (side) {
      setLeftMatrix(value);
      console.log("setting left side to be" + value)
    }
    else {
      setRightMatrix(value);
      console.log("setting right side to be" + value)
    }

  }
  
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div className="content">
        <div className="matrix-display" id="left-matrix">
          <Selector selected={(value) => {selected(true, value)}}/>
          <div className="pixel-grid">
          {(leftData === null)? <div></div> : <PixelGrid
            data={leftData}
            options={{
              size: 512/size,
              padding: 0,
              background: [0, 0.5, 1],
            }}
          />}
          </div>
        </div>
        <div className="matrix-display" id="right-matrix">
          <Selector selected={(value) => {selected(false, value)}}/>
          <div className="pixel-grid">
          {(rightData === null)? <div></div> : <PixelGrid
            data={rightData}
            options={{
              size: 512/size,
              padding: 0,
              background: [0, 0.5, 1],
            }}
          />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
