import React from "react"
import {Routes, Route, BrowserRouter as Router} from "react-router-dom"
import Home from "./pages/Home/Home"
import Menu from "./pages/Menu/Menu"

const App = () => {
    return(
        <Router>
            <Routes>
                <Route path="/" Component={Home}/>
                <Route path="/menu" Component={Menu}/>
            </Routes>
        </Router>
    )
}
export default App;