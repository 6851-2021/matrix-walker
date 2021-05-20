import PixelGrid from "react-pixel-grid";
import React, { useEffect, useState } from "react";
import Selector from './Selector.js';
import './App.css';
import { NaiveWalker, ZWalker, HilbertWalker } from './MatrixWalker';

const NAIVE = 0;
const ZINDEX = 1;
const HILBERT = 2;

function App() {
  const [size, setSize] = useState(32);
  const [leftMatrix, setLeftMatrix] = useState(-1);
  const [rightMatrix, setRightMatrix] = useState(-1);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [naive, setNaive] = useState(new NaiveWalker(size, 8, 8));
  const [zindex, setZindex] = useState(new ZWalker(size, 8, 8));
  const [hilbert, setHilbert] = useState(new HilbertWalker(size, 8, 8));

  // Bind and unbind events
  useEffect(() => {
    window.addEventListener('keydown', keyDownListener);
    return () => window.removeEventListener('keydown', keyDownListener);
  }, [lastUpdated]);

  const keyDownListener = (event) => {
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
    setLastUpdated(new Date())
  }

  const selected = (side, value) => {
    // side is true if it is left
    if (side) {
      setLeftMatrix(value);
    }
    else {
      setRightMatrix(value);
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


  function getLeftStats() {
    if (leftMatrix === 0) {
      return naive.get_cache_stats();
    } else if (leftMatrix === 1) {
      return zindex.get_cache_stats();
    } else if (leftMatrix === 2) {
      return hilbert.get_cache_stats();
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

  function getRightStats() {
    if (rightMatrix === 0) {
      return naive.get_cache_stats();
    } else if (rightMatrix === 1) {
      return zindex.get_cache_stats();
    } else if (rightMatrix === 2) {
      return hilbert.get_cache_stats();
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
          {getLeftStats()}
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
          {getRightStats()}
        </div>
      </div>
    </div>
  );
}

export default App;