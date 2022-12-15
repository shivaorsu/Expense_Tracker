import React from "react";
import { Route,Switch } from "react-router-dom";
import AuthForm from "./Components/Authentication/AuthForm";
import Welcome from "./Components/Welcome/Welcome";
import Profile from "./Components/Profile/Profile";
import Reset from "./Components/PasswordReset/Reset";
import Expenses from "./Components/Expenses/Expenses";



function App(){
  //const authCtx=useContext(AuthContext)
  return(
    <main>
      <Switch>
        <Route path='/' exact>
          <AuthForm/>
        </Route>
        <Route path='/auth'>
          <AuthForm/>

        </Route>
        <Route path="/Welcome"exact>
          <Welcome/>
        </Route>
        <Route path="/profile">
          <Profile/>
        </Route>
        <Route path="/passwdreset">
          <Reset/>
        </Route>
        <Route path="/expenses">
          <Expenses />
        </Route>
      </Switch>
     
    </main>

  )

}
export default App;
