import React from 'react'
import { RouteProps as ReactDOMROuteProps, Route as ReactCOMRoute, Redirect } from 'react-router-dom'

import { useAuth } from '../hooks/Auth'

interface RouteProps extends ReactDOMROuteProps {
  isPivate?: boolean
  component: React.ComponentType
}

const Route: React.FC<RouteProps> = ({
  isPivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth()
  return (
    <ReactCOMRoute
      {...rest}
      render={({ location }) => {
        return isPivate === !!user ? (
          <Component />
        ) : (
            <Redirect
              to={{
                pathname: isPivate ? '/' : '/dashboard',
                state: { from: location },
              }}
            />
          )
      }}
    />
  )
}

export default Route
