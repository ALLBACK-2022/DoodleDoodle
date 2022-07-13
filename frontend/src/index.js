import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

function Container() {
  const [counter, setCounter] = React.useState(0);
  function TestButtonClick() {
    setCounter(current => current + 1);
  }
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl mt-16">Button Click Count: {counter}</h1>
      <button className="bg-sky-600 hover:bg-sky-700 text-white p-2.5 w-fit mt-9" onMouseUp={TestButtonClick}>
        Click This
      </button>
    </div>
  );
}

function RenderScreen() {
  root.render(
    <React.StrictMode>
      <App />
      <Container />
    </React.StrictMode>,
  );
}

RenderScreen();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
