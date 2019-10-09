import React from "react";
import ReactDOM from "react-dom";


import './css/index.css'



if(module.hot){
  module.hot.accept()
} 

 

const App = () => { 
  return (<h1>hello world</h1>)
} 


ReactDOM.render( 
  <App />,
  document.getElementById('root')
)
 