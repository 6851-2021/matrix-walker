import PixelGrid from "react-pixel-grid";
import React, { useEffect, useState } from "react";
import Selector from './Selector.js';
import './App.css';
import {NaiveWalker, ZWalker, HilbertWalker} from './MatrixWalker';

const NAIVE = 0;
const ZINDEX = 1;
const HILBERT = 2;

function App() {
  const [size, setSize] = useState(16);
  const [leftMatrix, setLeftMatrix] = useState(-1);
  const [rightMatrix, setRightMatrix] = useState(-1);
  const [naive, setNaive] = useState(new NaiveWalker(size, 8, 2));
  const [zindex, setZindex] = useState(new ZWalker(size, 8, 2));
  const [hilbert, setHilbert] = useState(new HilbertWalker(size, 8, 2));
  const [rightData, setRightData] = useState(null);
  const [leftData, setLeftData] = useState(null);

  const refreshData = () => {
    if (leftMatrix === 0) {
      setLeftData(naive.get_cache_visual());
    } else if (leftMatrix === 1) {
      setLeftData(zindex.get_cache_visual());
    } else if (leftMatrix === 2) {
      setLeftData(hilbert.get_cache_visual());
    } 
  
    if (rightMatrix == 0) {
      console.log("seeting right matrix 0")

      setRightData(naive.get_cache_visual());
    } else if (rightMatrix == 1) {
      console.log("seeting right matrixn 1")
      console.log("setting it as " + zindex.get_cache_visual())
      setRightData(zindex.get_cache_visual());
    } else if (rightMatrix == 2) {
      console.log("seeting right matrix 2")
      setRightData(hilbert.get_cache_visual());
    } 
  }

  const selected = (side, value) => {
    // side is true if it is left
    if (side) {
      setLeftMatrix(value);
    }
    else {
      console.log("set right as " + value)
      setRightMatrix(value);
      console.log("right is now equal to " + rightMatrix)
    }
    refreshData();
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
              padding: 0.5,
              background: [0, 0.5, 1],
            }}
          />}
          </div>
          {leftData}
        </div>
        <div className="matrix-display" id="right-matrix">
          <Selector selected={(value) => {selected(false, value)}}/>
          <div className="pixel-grid">
          {(rightData === null)? <div></div> : <PixelGrid
            data={rightData}
            options={{
              size: 512/size,
              padding: 0.5,
              background: [0, 0.5, 1],
            }}
          />}
          </div>
          {rightData}
        </div>
      </div>
    </div>
  );
}

export default App;