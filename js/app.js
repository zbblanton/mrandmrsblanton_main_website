class RegisterFieldsComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="rsvp-info">
      <div className="field is-horizontal">
        <div className="field-body">
          <div className="field">
            <p className="control has-icons-left">
              <input required className="input gname" type="text" placeholder="First & Last Name" />
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
              <input required className="input gAddress" type="text" placeholder="Address" />
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

class RegisterSuccessComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <article className="message is-primary">
        <div className="message-header">
          <p>RSVP Submitted</p>
        </div>
        <div className="message-body">
          Thank you for the RSVP. In case of changes we will email you.
        </div>
      </article>
    );
  }
}

class RegisterSubmitComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="field is-grouped has-addons has-addons-right">
          <div id="g-recaptcha" className="g-recaptcha" data-sitekey="6LfpPC4UAAAAAOTs1q3qVcz8K6zmdE99AwPfWFmX"></div>
        </div>
        <div className="field is-grouped has-addons has-addons-right">
          <p className="control">
            <a className="button" onClick={this.props.handleAdd}>
              Add Guest
            </a>
          </p>
          <p className="control">
            <input type="submit" value="Submit RSVP" className="button is-primary" />
          </p>
        </div>
      </div>
    );
  }
}

class RegisterGuestFieldComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="field guest-info">
        <label className="label">Guest {this.props.guest + 1}</label>
        <div className="control has-icons-left">
          <input className="input guest-input gname" type="text" placeholder="First & Last Name" />
          <span className="icon is-small is-left">
            <i className="fa fa-user"></i>
          </span>
        </div>
      </div>
    );
  }
}

class RegisterGuestComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      this.props.guests.map(function (i) {
        return (
          <RegisterGuestFieldComponent key={i} guest={i} />
        );
      })
    );
  }
}

class RegisterComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {submitted: false, guests: []};

    this.handleAdd = this.handleAdd.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleAdd() {
    if(this.state.guests.length < 5){
      this.state.guests.push(this.state.guests.length);
      this.setState(this.state)
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    var guests = []

    //Get rsvp info from main guest
    var guestsHTML = document.getElementById("rsvp-info")
    var n = guestsHTML.getElementsByClassName("gname")[0].value;
    var e = guestsHTML.getElementsByClassName("gEmail")[0].value;
    var a = guestsHTML.getElementsByClassName("gAddress")[0].value;
    guests.push({"name": n, "address": a, "email": e, "guestof": ""});

    //Get the rest of the guests
    var guestsHTML = document.getElementsByClassName("guest-info")

    for(var i = 0; i < guestsHTML.length; i++){
      var g = guestsHTML[i].getElementsByClassName("gname")[0].value;
      guests.push({"name": g, "address": "", "email": "", "guestof": n});
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
    if(this.state.submitted){
      return (
        <RegisterSuccessComponent />
      );
    }
    else {
      return (
        <form onSubmit={this.handleSubmit}>
          <RegisterFieldsComponent />
          <RegisterGuestComponent guests={this.state.guests} />
          <RegisterSubmitComponent handleAdd={this.handleAdd} />
        </form>
      );
    }
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

ReactDOM.render(<RegisterComponent />, document.getElementById('RegisterComponent'));
ReactDOM.render(<FooterComponent />, document.getElementById('FooterComponent'));
grecaptcha.render("g-recaptcha")
