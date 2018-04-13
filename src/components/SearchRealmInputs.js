import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveUserPreferences } from '../actions';

class SearchRealmInputs extends Component {
  constructor(props){
    super(props)


    const { apikey, realm, region } = this.props.userData
    this.state = {
      apikey,
      realm,
      region
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    const { apikey, realm, region } = this.state
    this.props.saveUserPreferences({apikey, realm, region}, true)
  };
  
  handleChange = (e) => {
    const { target: { name, value } } = e;
    this.setState({ [name]: value })
  };

  render() {
    const { apikey, region, realm } = this.state;
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
        <label htmlFor="realmField">realm</label>
        <input
          id="realmField"
          name="realm"
          onChange={this.handleChange}
          type="text"
          value={realm}
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

export default connect(mapStateToProps, { saveUserPreferences })(SearchRealmInputs)