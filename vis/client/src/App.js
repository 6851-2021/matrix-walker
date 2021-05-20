import PixelGrid from "react-pixel-grid";
import React, { useEffect, useState } from "react";
import Selector from './Selector.js';
import './App.css';
import { NaiveWalker, ZWalker, HilbertWalker } from './MatrixWalker';
import { Dropdown, Form } from 'semantic-ui-react';


const NAIVE = 0;
const ZINDEX = 1;
const HILBERT = 2;

const options = [
  { key: 0, value: 0, text: 0 },
  { key: 1, value: 1, text: 1 },
  { key: 2, value: 2, text: 2 },
  { key: 3, value: 3, text: 3 },
  { key: 4, value: 4, text: 4 },
  { key: 5, value: 5, text: 5 },
  { key: 6, value: 6, text: 6 },
  { key: 7, value: 7, text: 7 },
  { key: 8, value: 8, text: 8 },
  { key: 9, value: 9, text: 9 },
  { key: 10, value: 10, text: 10 },
  { key: 11, value: 11, text: 11 },
  { key: 12, value: 12, text: 12 },
  { key: 13, value: 13, text: 13 },
  { key: 14, value: 14, text: 14 },
  { key: 15, value: 15, text: 15 },
  { key: 16, value: 16, text: 16 },
  { key: 17, value: 17, text: 17 },
  { key: 18, value: 18, text: 18 },
  { key: 19, value: 19, text: 19 },
  { key: 20, value: 20, text: 20 },
  { key: 21, value: 21, text: 21 },
  { key: 22, value: 22, text: 22 },
  { key: 23, value: 23, text: 23 },
  { key: 24, value: 24, text: 24 },
  { key: 25, value: 25, text: 25 },
  { key: 26, value: 26, text: 26 },
  { key: 27, value: 27, text: 27 },
  { key: 28, value: 28, text: 28 },
  { key: 29, value: 29, text: 29 },
  { key: 30, value: 30, text: 30 },
  { key: 31, value: 31, text: 31 },
]

function App() {
  const [size] = useState(32);
  const [leftMatrix, setLeftMatrix] = useState(-1);
  const [rightMatrix, setRightMatrix] = useState(-1);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [naive] = useState(new NaiveWalker(size, 8, 8));
  const [zindex] = useState(new ZWalker(size, 8, 8));
  const [hilbert] = useState(new HilbertWalker(size, 8, 8));
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

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
    if (leftMatrix === NAIVE) {
      return naive.get_cache_visual();
    } else if (leftMatrix === ZINDEX) {
      return zindex.get_cache_visual();
    } else if (leftMatrix === HILBERT) {
      return hilbert.get_cache_visual();
    }
    return null
  }


  function getLeftStats() {
    if (leftMatrix === NAIVE) {
      return naive.get_cache_stats();
    } else if (leftMatrix === ZINDEX) {
      return zindex.get_cache_stats();
    } else if (leftMatrix === HILBERT) {
      return hilbert.get_cache_stats();
    }
    return null
  }

  function getRightData() {
    if (rightMatrix == NAIVE) {
      return (naive.get_cache_visual());
    } else if (rightMatrix == ZINDEX) {
      return (zindex.get_cache_visual());
    } else if (rightMatrix == HILBERT) {
      return (hilbert.get_cache_visual());
    }
    return null
  }

  function getRightStats() {
    if (rightMatrix === NAIVE) {
      return naive.get_cache_stats();
    } else if (rightMatrix === ZINDEX) {
      return zindex.get_cache_stats();
    } else if (rightMatrix === HILBERT) {
      return hilbert.get_cache_stats();
    }
    return null
  }

  function onChangeX(event, {value}) {
    setX(value)
  }

  function onChangeY(event, {value}) {
    setY(value)
  }

  function onSubmitForm(event) {
    naive.teleport(x, y)
    zindex.teleport(x, y)
    hilbert.teleport(x, y)
    setLastUpdated(new Date())
  }

  return (
    <div className="App">
      <h1>Matrix Walker Cache Visualization</h1>
      <div className="content">
        <div className="matrix-display" id="left-matrix">
          <Selector selected={(value) => { selected(true, value) }} />
          <div className="pixel-grid">
            {(getLeftData() === null) ? <div></div> : <PixelGrid
              data={getLeftData()}
              options={{
                size: 450 / size,
                padding: 0.5,
                background: [0, 0.5, 1],
              }}
            />}
          </div>
          <div className="cache-stats">
            {getLeftStats()}
          </div>
        </div>
        <div id="teleport-ui">
          <h3>Teleport</h3>
          <Form onSubmit={onSubmitForm}>
            <Form.Group widths='equal'>
              <Dropdown
                placeholder='Row'
                fluid
                search
                selection
                options={options}
                className="teleport-dropdown"
                onChange={onChangeX}
              />
              <Dropdown
                placeholder='Col'
                fluid
                search
                selection
                options={options}
                className="teleport-dropdown"
                onChange={onChangeY}
              />
            </Form.Group>
            <Form.Button>Submit</Form.Button>
          </Form>
        </div>
        <div className="matrix-display" id="right-matrix">
          <Selector selected={(value) => { selected(false, value) }} />
          <div className="pixel-grid">
            {(getRightData() === null) ? <div></div> : <PixelGrid
              data={getRightData()}
              options={{
                size: 450 / size,
                padding: 0.5,
                background: [0, 0.5, 1],
              }}
            />}
          </div>
          <div className="cache-stats">
            {getRightStats()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;