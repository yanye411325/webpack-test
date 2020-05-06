
import '@/test.scss';
import '@/test.less';
import React, { Component } from "react";
import ReactDom from "react-dom";
import _ from "lodash";
import redux from "redux"
console.log(_.join(['a','b','c','****']))
class App extends Component {
  render() {
    return <div>hello world</div>;
  }
}

ReactDom.render(<App />, document.getElementById("app"));

