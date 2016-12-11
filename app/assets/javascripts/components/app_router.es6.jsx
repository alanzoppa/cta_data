var Router = ReactRouter.Router;
var Route = ReactRouter.Route;

class AppRouter extends React.Component {
  render () {
    return <Router history={ReactRouter.hashHistory}>
      <Route path="/">
        <Route path="point/:latitude/:longitude" component={Radius} />
        <Route path="route/:route" component={Route}/>
        <Route path="stops/:stop_id" component={SingleStop}/>
      </Route>
    </Router>

  }
}
