var Router = ReactRouter.Router;
var Route = ReactRouter.Route;

class AppRouter extends React.Component {
  render () {
    return <Router history={ReactRouter.hashHistory}>
      <Route path="/" component={Application}>
        <Route path="point/:longitude/:latitude" component={Application}/>
      </Route>
    </Router>

  }
}
        //<Route path="about" component={About}/>
        //<Route path="users" component={Users}>
          //<Route path="/user/:userId" component={User}/>
        //</Route>

        //<Route path="*" component={NoMatch}/>
