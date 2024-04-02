import { useEffect, useState } from 'react';
import './App.css';
import SplitPane, { Pane } from 'react-split-pane';

function App() {
  const [data, setData] = useState(""); // I am storing the value in this state
  const [inputData, setInputData] = useState(""); // This state is responsible for storing the input 
  const [count, setCount] = useState(null);
  const [stage, setStage] = useState(1); // stage value can be 1,2 and 3. I am showing the input field when stage value will be 2 or 3.

  useEffect(() => {
    getCount();
    getData();
  }, []);

  // This function fetch the value
  const getData = () => {
    fetch("https://dataneuron-backend-9hp3.onrender.com/data")
      .then((res) => res.json())
      .then((json) => {
        setData(json.data.value);
      });
  };

  // This funciton fetch the count value
  const getCount = () => {
    fetch("https://dataneuron-backend-9hp3.onrender.com/count")
      .then((res) => res.json())
      .then((json) => {
        setCount(json.data.count);
      });
  };

  // This function is for storing the value 
  const addData = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: inputData })
    }

    fetch('https://dataneuron-backend-9hp3.onrender.com/add', requestOptions)
      .then(response => response.json())
      .then(data => {
        setData(inputData);
        setStage(1);
        getCount();
      });
  }

  // This function is for updating the value
  const update = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: inputData })
    }

    fetch('https://dataneuron-backend-9hp3.onrender.com/update', requestOptions)
      .then(response => response.json())
      .then(data => {
        setData(inputData);
        setStage(1);
        getCount();
      });
  }

  return (
    <SplitPane split="horizontal" defaultSize={'50%'} >
      <SplitPane split="vertical" defaultSize={'50%'}>
        <Pane style={{display: 'flex'}}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id faucibus nisl tincidunt eget nullam non nisi est sit. Pellentesque nec nam aliquam sem et tortor consequat id porta. In nisl nisi scelerisque eu ultrices vitae. Amet facilisis magna etiam tempor orci. Sem integer vitae justo eget magna fermentum. Sem integer vitae justo eget magna. Nisl vel pretium lectus quam id. At tempor commodo ullamcorper a lacus vestibulum sed arcu non. Facilisi nullam vehicula ipsum a arcu cursus vitae. Non quam lacus suspendisse faucibus interdum posuere. Porta nibh venenatis cras sed felis eget velit aliquet.
        </Pane >
        <Pane>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id faucibus nisl tincidunt eget nullam non nisi est sit. Pellentesque nec nam aliquam sem et tortor consequat id porta. In nisl nisi scelerisque eu ultrices vitae. Amet facilisis magna etiam tempor orci. Sem integer vitae justo eget magna fermentum. Sem integer vitae justo eget magna. Nisl vel pretium lectus quam id. At tempor commodo ullamcorper a lacus vestibulum sed arcu non. Facilisi nullam vehicula ipsum a arcu cursus vitae. Non quam lacus suspendisse faucibus interdum posuere. Porta nibh venenatis cras sed felis eget velit aliquet.
        </Pane >
      </SplitPane>
      <Pane style={{ display: 'flex' }}>
        <div style={{ margin: 'auto', marginTop: '20px', maxWidth: '285px' }}>
          {(stage === 2 || stage === 3) &&
          // Input field
            <div>
              <input
                style={{ height: '30px', fontSize: '20px' }}
                onChange={(e) => setInputData(e.target.value)}
                value={inputData}
              />
              {/* Submit button */}
              <div
                onClick={() => stage === 2 ? addData() : update()}
                className='button'
                style={{ backgroundColor: 'green' }}>
                SUBMIT</div>
            </div>
          }

          <div style={{ display: 'flex', marginTop: '20px', justifyContent: 'space-between' }}>
            {/* Add button */}
            <div
              onClick={() => {
                setStage(2)
                setInputData("")
              }}
              className='button'
              style={{ backgroundColor: 'green' }}
            >ADD</div>
            {/* Update button */}
            <div
              onClick={() => {
                setStage(3)
                setInputData(data)
              }}
              className='button'
              style={{ backgroundColor: 'blue' }}
            >UPDATE</div>
          </div>

          <div style={{ fontSize: '18px' }}>
            {/* Display information */}
            <p>{count} times add and update API called.</p>
            <p>Value from db: <span style={{ fontWeight: 'bold' }}>{data}</span></p>
          </div>
        </div>
      </Pane >
    </SplitPane>
  );
}

export default App;
