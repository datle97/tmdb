import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

// ngăn vào /login /signup
// Redirect to profile khi người dùng đã đăng nhập
const PublicRoute = ({ component: Component, ...rest }) => {
  const { isAuth } = useSelector((state) => state.user);
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? <Redirect to="/watchlist" /> : <Component {...props} />
      }
    />
  );
};

export default PublicRoute;
