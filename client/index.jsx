import * as React from "react";
import * as ReactDOM from "react-dom";


function FrontPage() {
    return <h1>Kristiania Movie Database</h1>;
}

function Application() {
    return <Router>
            <Route path={"/"} element={<FrontPage />}/>
        <Route path={"/movies/new"} element={<h1>New movie</h1>}/>
        <Route path={"/movies"} element={<h1>List movies</h1>}/>

         </Router>
    <FrontPage/>;
}

ReactDOM.render(
    <Application/>,
    document.getElementById("app")

);