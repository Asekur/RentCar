import { useState, useCallback, useEffect } from 'react'
const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [ready, setReady] = useState(false)
    const [userId, setUserId] = useState(null)
    const [login, setLogin] = useState(null)

    const signin = useCallback((jwtToken, id, login) => {
        setToken(jwtToken)
        setUserId(id)
        setLogin(login)

        localStorage.setItem(storageName, JSON.stringify({
            userId: id, token: jwtToken, login: login
        }))
    }, [])

    const signout = useCallback((jwtToken) => {
        setToken(null)
        setUserId(null)

        localStorage.removeItem(storageName)
        document.location.reload()
    }, [])

    //есть ли вообще данные в localStorage
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))
        if (data && data.token && data.login) {
            signin(data.token, data.userId, data.login)
        }
        setReady(true)
    }, [signin])

    return { signin, signout, token, userId, ready, login }
}