import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";
import Firebase, { FirebaseContext } from "./components/Firebase";

import 'semantic-ui-less/semantic.less';

ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase()} >
        <App />
    </FirebaseContext.Provider>,
    document.getElementById("root"));
