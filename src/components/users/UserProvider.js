import React, { useState } from "react"

/*
    The context is imported and used by individual components
    that need data
*/
export const UserContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const UserProvider = (props) => {
    const [users, setUsers] = useState([])

    const getUsers = () => {
        return fetch("http://localhost:8088/users")
            .then(res => res.json())
            .then(setUsers)
    }

    const addUser = user => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(getUsers)
    }

    /*
        You return a context provider which has the
        `customers` state, the `addCustomer` function,
        and the `getCustomer` function as keys. This
        allows any child elements to access them.
    */
    return (
        <UserContext.Provider value={{
            users, addUser, getUsers
        }}>
            {props.children}
        </UserContext.Provider>
    )
}