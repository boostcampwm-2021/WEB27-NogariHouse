import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import userState from '@atoms/user';

function PrivateRoute({ component: Component, ...rest }: any) {
  const isAuthenticated = useRecoilValue(userState);

  return (
    <Route
      render={(props) => (
        isAuthenticated.isLoggedIn
          // eslint-disable-next-line react/jsx-props-no-spreading
          ? (<Component {...props} />)
          : (<Redirect to="/" />)
      )}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    />
  );
}

export default PrivateRoute;
