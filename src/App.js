import { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { CssBaseline, MuiThemeProvider } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "./actions/userActions";
import theme from "./theme";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import SearchPage from "./components/SearchPage";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import WatchlistPage from "./components/WatchlistPage";
import MoviePage from "./components/TvMovie/MoviePage";
import TvPage from "./components/TvMovie/TvPage";
import PersonPage from "./components/PersonPage";
import CompanyPage from "./components/CompanyPage";
import Footer from "./components/Footer";
import KeywordPage from "./components/KeywordPage";
import CollectionPage from "./components/CollectionPage";
import MovieCreditsPage from "./components/TvMovieCredits/MovieCreditsPage";
import TvCreditsPage from "./components/TvMovieCredits/TvCreditsPage";
import PrivateRoute from "./components/common/PrivateRoute";
import PublicRoute from "./components/common/PublicRoute";
import { fetchWatchlist } from "./actions/watchlistActions";

const App = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.user);
  useEffect(() => {
    if (isAuth) {
      dispatch(fetchProfile());
      dispatch(fetchWatchlist());
    }
  }, [dispatch, isAuth]);
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <main
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route
            path="/search/:type/:query/:page"
            component={SearchPage}
            exact
          />
          <Route path="/movie/:id" component={MoviePage} exact />
          <Route path="/movie/:id/cast" component={MovieCreditsPage} exact />
          <Route path="/tv/:id/cast" component={TvCreditsPage} exact />
          <Route path="/tv/:id" component={TvPage} exact />
          <Route path="/company/:id" component={CompanyPage} exact />
          <Route path="/person/:id" component={PersonPage} exact />
          <Route path="/keyword/:id" component={KeywordPage} exact />
          <Route path="/collection/:id" component={CollectionPage} exact />
          <PrivateRoute path="/watchlist" component={WatchlistPage} exact />
          <PublicRoute path="/login" component={LoginPage} exact />
          <PublicRoute path="/signup" component={SignUpPage} exact />
        </Switch>
      </main>
      <Footer />
    </MuiThemeProvider>
  );
};

export default App;
