import PixelGrid from "react-pixel-grid";
import React, { useEffect, useState } from "react";
import Selector from './Selector.js';
import './App.css';
import { NaiveWalker, ZWalker, HilbertWalker } from './MatrixWalker';

const NAIVE = 0;
const ZINDEX = 1;
const HILBERT = 2;

function App() {
  const [size, setSize] = useState(16);
  const [leftMatrix, setLeftMatrix] = useState(-1);
  const [rightMatrix, setRightMatrix] = useState(-1);
  const [naive, setNaive] = useState(new NaiveWalker(size, 8, 4));
  const [zindex, setZindex] = useState(new ZWalker(size, 8, 4));
  const [hilbert, setHilbert] = useState(new HilbertWalker(size, 8, 4));

  // Bind and unbind events
  useEffect(() => {
    window.addEventListener("keydown", keyDownListener)
  })

  const selected = (side, value) => {
    // side is true if it is left
    if (side) {
      setLeftMatrix(value);
    }
    else {
      setRightMatrix(value);
    }
  }

  const keyDownListener = (event) => {
    console.log(event.key)
    if (event.key == "ArrowUp" || event.key == "w") {
     naive.up()
     zindex.up()
     hilbert.up()
    }
    if (event.key == "ArrowDown" || event.key == "s") {
      naive.down()
      zindex.down()
      hilbert.down()
    }
    if (event.key == "ArrowLeft" || event.key == "a") {
      naive.left()
      zindex.left()
      hilbert.left()
    }
    if (event.key == "ArrowRight" || event.key == "d") {
      naive.right()
      zindex.right()
      hilbert.right()
    }
  }

  function getLeftData() {
    if (leftMatrix === 0) {
      return naive.get_cache_visual();
    } else if (leftMatrix === 1) {
      return zindex.get_cache_visual();
    } else if (leftMatrix === 2) {
      return hilbert.get_cache_visual();
    }
    return null
  }

  function getRightData() {
    if (rightMatrix == 0) {
      return (naive.get_cache_visual());
    } else if (rightMatrix == 1) {
      return (zindex.get_cache_visual());
    } else if (rightMatrix == 2) {
      return (hilbert.get_cache_visual());
    }
    return null
  }

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div className="content">
        <div className="matrix-display" id="left-matrix">
          <Selector selected={(value) => { selected(true, value) }} />
          <div className="pixel-grid">
            {(getLeftData() === null) ? <div></div> : <PixelGrid
              data={getLeftData()}
              options={{
                size: 512 / size,
                padding: 0.5,
                background: [0, 0.5, 1],
              }}
            />}
          </div>
        </div>
        <div className="matrix-display" id="right-matrix">
          <Selector selected={(value) => { selected(false, value) }} />
          <div className="pixel-grid">
            {(getRightData() === null) ? <div></div> : <PixelGrid
              data={getRightData()}
              options={{
                size: 512 / size,
                padding: 0.5,
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