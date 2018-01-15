class RegisterGuestFieldsComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="guest-info">
      <div className="field is-horizontal">
        <div className="field-body">
          <div className="field">
            <p className="control has-icons-left">
              <input required className="input gFirstname" type="text" placeholder="First Name" />
              <span className="icon is-small is-left">
                <i className="fa fa-user"></i>
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control has-icons-left">
              <input required className="input gLastname" type="text" placeholder="Last Name" />
              <span className="icon is-small is-left">
                <i className="fa fa-user"></i>
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control has-icons-left has-icons-right">
              <input required className="input gEmail" type="email" placeholder="Email" />
              <span className="icon is-small is-left">
                <i className="fa fa-envelope"></i>
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="field is-horizontal">
        <div className="field-body">
          <div className="field">
            <p className="control has-icons-left">
              <input required className="input gAddress" type="text" />
              <span className="icon is-small is-left">
                <i className="fa fa-home"></i>
              </span>
            </p>
          </div>
        </div>
      </div>
      <br />
      </div>
    );
  }
}

class RegisterGuestComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {submitted: false, guests: [0]};

    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleAddClick() {
    this.state.guests.push(this.state.guests.length);
    this.setState(this.state)
  }

  handleSubmit(e) {
    e.preventDefault();
    var guestsHTML = document.getElementsByClassName("guest-info")
    var guests = []
    for(var i = 0; i < guestsHTML.length; i++){
      var f = guestsHTML[i].getElementsByClassName("gFirstname")[0].value;
      var l = guestsHTML[i].getElementsByClassName("gLastname")[0].value;
      var e = guestsHTML[i].getElementsByClassName("gEmail")[0].value;
      var a = guestsHTML[i].getElementsByClassName("gAddress")[0].value;
      guests.push({"firstname": f, "lastname": l, "address": e, "email": a});
    }
    this.sendData(JSON.stringify({"recaptcha": grecaptcha.getResponse(), "guests": guests}))
  }

  sendData(g) {
    fetch('https://api.mrandmrsblanton.com/add', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: g
    }).then(res=>res.json())
      .then(res => {
        if(res.success){
          this.state.submitted = true;
          this.setState(this.state)
        }
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {
          this.state.submitted ? (
            <article className="message is-primary">
              <div className="message-header">
                <p>RSVP Submitted</p>
              </div>
              <div className="message-body">
                Thank you for the RSVP. In case of changes we will email you.
              </div>
            </article>
          ) : (
            this.state.guests.map(function (i) {
              return (
                <RegisterGuestFieldsComponent key={i} />
              );
            })
          )
        }
        {
          !this.state.submitted &&
          <div className="field is-grouped has-addons has-addons-right">
            <div className="g-recaptcha" data-sitekey="6LfpPC4UAAAAAOTs1q3qVcz8K6zmdE99AwPfWFmX"></div>
          </div>
        }
        {
          !this.state.submitted &&
          <div className="field is-grouped has-addons has-addons-right">
            <p className="control">
              <a className="button" onClick={this.handleAddClick}>
                Add Guest
              </a>
            </p>
            <p className="control">
              <input type="submit" value="Submit RSVP" className="button is-primary" />
            </p>
          </div>
        }
      </form>
    );
  }
}

class FooterComponent extends React.Component {
  render() {
    return (
      <div className="container has-text-centered">
        <p><strong>Copyright &copy; 2018 </strong> mrandmrsblanton.com</p>
        <p>Source at <strong><a href="https://github.com/zbblanton/mrandmrsblanton_main_website">GitHub</a></strong></p>
      </div>
    );
  }
}

ReactDOM.render(<RegisterGuestComponent />, document.getElementById('RegisterGuestComponent'));
ReactDOM.render(<FooterComponent />, document.getElementById('FooterComponent'));
