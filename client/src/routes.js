import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Catalog } from './pages/Catalog'
import { Home } from './pages/Home'
import { Authorize } from './pages/Authorize'
import { Create } from './pages/Create'
import { About} from './pages/About'

export const useRoutes = (isAuthorize) => {
    if (!isAuthorize) {
        return (
            <Switch>
                <Route path="/catalog" exact>
                    <Catalog />
                </Route>
                <Route path="/home" exact>
                    <Home />
                </Route>
                <Route path="/about" exact>
                   <About />
                </Route>
                <Route path="/auth" exact>
                   <Authorize />
                </Route>
                <Redirect to="/home" />
            </Switch >
        )
    } else {
        return (
            <Switch>
                <Route path="/catalog" exact>
                    <Catalog />
                </Route>
                <Route path="/home" exact>
                    <Home />
                </Route>
                <Route path="/about" exact>
                   <About />
                </Route>
                <Route path="/create" exact>
                    <Create />
                </Route>
                <Redirect to="/home" />
            </Switch>
        )  
    }

}