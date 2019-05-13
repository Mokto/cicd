import React from 'react';
import logo from './logo.svg';
import './App.css';
// const {HelloRequest} = require('./protos/helloworld_pb');
// const {HelloWorldClient} = require('./protos/helloworld_pb_service');

// import {HelloWorldClient} from './protos/HelloworldServiceClientPb';
// import requests from './protos/helloworld_pb';
// import clients from './protos/helloworld_grpc_web_pb';

// const client = new HelloWorldClient('https://localhost:9091');

// var client = new HelloWorldClient('http://localhost:8080', {}, {});

export const App: React.FC = () => {
  return (
    <div className="App" onClick={() => {
      console.log('Plouf');
    }}>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
