import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveUserPreferences } from '../actions';

class ServerInputs extends Component {
  constructor(props){
    super(props)


    const { apikey, server, region } = this.props.userData
    this.state = {
      apikey,
      server,
      region
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    const { apikey, server, region } = this.state
    this.props.saveUserPreferences({apikey, server, region}, true)
  };
  
  handleChange = (e) => {
    const { target: { name, value } } = e;
    this.setState({ [name]: value })
  };

  render() {
    const { apikey, region, server } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="apikey">API Key</label>
        <input
          id="apikey"
          name="apikey"
          onChange={this.handleChange}
          type="text"
          value={apikey}
        />
        <label htmlFor="serverField">Server</label>
        <input
          id="serverField"
          name="server"
          onChange={this.handleChange}
          type="text"
          value={server}
        />
        <select
          onChange={this.handleChange}
          name="region"
          value={region}
        >
          <option label="US" value="us" />
          <option label="EU" value="eu" />
        </select>  
        <button type="submit">Save</button>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  userData: state.userData,
})

export default connect(mapStateToProps, { saveUserPreferences })(ServerInputs)