import React from "react";
import { Route, Redirect } from "react-router-dom";
import ls from "../../utils/localStorage";

const authentication = {
  is_admin: ls.getItem("is_admin"),
};

const AdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      authentication.is_admin === "true" ? (
        <Component {...props} />
      ) : (
        <Redirect to="/admin/login" />
      )
    }
  />
);

export default AdminRoute;
