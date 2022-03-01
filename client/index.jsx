import * as React from "react";
import * as ReactDOM from "react-dom";


function FrontPage() {
    return <h1>Kristiania Movie Database</h1>;
}

function Application() {
    return
        <Router>

         </Router>
    <FrontPage/>;
}

ReactDOM.render(
    <Application/>,
    document.getElementById("app")

);