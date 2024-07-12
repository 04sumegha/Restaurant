import React from "react"
import {Routes, Route, BrowserRouter as Router} from "react-router-dom"
import Home from "./pages/Home/Home"
import Menu from "./pages/Menu/Menu"
import Auth from "./pages/Auth/User/Auth"
import StaffAuth from "./pages/Auth/Staff/StaffAuth"
import See from "./pages/See/See"

const App = () => {
    return(
        <Router>
            <Routes>
                <Route path="/" Component={Home}/>
                <Route path="/menu" Component={Menu}/>
                <Route path="/auth/user" Component={Auth}/>
                <Route path="/auth/staff" Component={StaffAuth}/>
                <Route path="/see" Component={See}/>
            </Routes>
        </Router>
    )
}
export default App;