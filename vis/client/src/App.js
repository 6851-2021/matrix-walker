import PixelGrid from "react-pixel-grid";
import React, { useEffect, useState } from "react";
import Selector from './Selector.js';
import './App.css';
import {NaiveWalker, ZWalker, HilbertWalker} from './MatrixWalker';

const NAIVE = 0;
const ZINDEX = 1;
const HILBERT = 2;

function App() {
  const [size, setSize] = useState(8**8);
  const [leftMatrix, setLeftMatrix] = useState(-1);
  const [rightMatrix, setRightMatrix] = useState(-1);
  const [naive, setNaive] = useState(new NaiveWalker(8, 8, 2));
  const [zindex, setZindex] = useState(new ZWalker(8, 8, 2));
  const [hilbert, setHilbert] = useState(new HilbertWalker(8, 8, 2));

  useEffect(() => {
  });

  let leftData = null;
  if (leftMatrix === 0) {
    leftData = naive.get_cache_visual();
  } else if (leftMatrix === 1) {
    leftData = zindex.get_cache_visual();
  } else if (leftMatrix === 2) {
    leftData = hilbert.get_cache_visual();
  } 

  let rightData = null;
  if (rightMatrix === 0) {
    rightData = naive.get_cache_visual();
  } else if (rightMatrix === 1) {
    rightData = zindex.get_cache_visual();
  } else if (rightMatrix === 2) {
    rightData = hilbert.get_cache_visual();
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
