import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute({userId: userId, component: Component, ...rest }) {
    return (
        <Route {...rest} render={props => {
            if (userId) {
                return(<Component {...props} />)
            } else {
                return(<Redirect to={{pathname:'/', state:{ from: props.location }}} />)
            }
        }} />
    )
}

export default ProtectedRoute
