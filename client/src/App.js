import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { useRoutes } from './routes'
import { useAuth } from './hooks/hookAuth'
import { ContextAuth } from './context/ContextAuth'
import { Header } from './components/Header'
import { Loader } from './components/Loader'
import 'materialize-css'

function App() {
  const { token, signin, signout, userId, ready, login } = useAuth()
  const isAuthorize = !!token
  const routes = useRoutes(isAuthorize)

  if (!ready) {
    return <Loader />
  }
  return (
    <ContextAuth.Provider value={{
      token, signin, signout, userId, isAuthorize, userName: login
    }}>
      <Router>
        {<Header userId={userId} isAuthorize={isAuthorize}/>}
        <div className="container">
          {routes}
        </div>
      </Router>
    </ContextAuth.Provider>
  )

}

export default App
