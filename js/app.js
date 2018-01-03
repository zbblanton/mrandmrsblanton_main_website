class TopMenuComponent extends React.Component {
  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">test</a>
          <h1 className="navbar-item">WebOps</h1>
          <button className="button navbar-burger">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <div className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item">Dashboard</a>
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">Apps</a>
              <div className="navbar-dropdown">
                <a className="navbar-item">All Apps</a>
                <a className="navbar-item">Supported Apps</a>
                <hr className="navbar-divider" />
                <a className="navbar-item">Corporate</a>
                <a className="navbar-item">Power</a>
                <a className="navbar-item">Healthcare</a>
                <a className="navbar-item">Aviation</a>
                <a className="navbar-item">Capital</a>
              </div>
            </div>
            <a className="navbar-item">Test App</a>
            <a className="navbar-item">Opal</a>
            <a className="navbar-item">Decommission</a>
          </div>
          <div className="navbar-end">
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">All</a>
              <div className="navbar-dropdown is-right">
                <a className="navbar-item">Corporate</a>
                <a className="navbar-item">Power</a>
                <a className="navbar-item">Healthcare</a>
                <a className="navbar-item">Aviation</a>
                <a className="navbar-item">Capital</a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

ReactDOM.render(<TopMenuComponent />, document.getElementById('TopMenu'));
//ReactDOM.render(<DecomPageComponent />, document.getElementById('Content'));
