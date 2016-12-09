var Router = ReactRouter.Router;
var Route = ReactRouter.Route;

class AppRouter extends React.Component {
  render () {
    return <Router history={ReactRouter.hashHistory}>
      <Route path="/" component={Application}>
        <Route path="point/:longitude/:latitude" component={Application} />
        <Route path="route/:route" component={Application}/>
        <Route path="stops/:stop_id" component={Application}/>
      </Route>
    </Router>

  }
}
