import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveUserPreferences } from '../actions';
import _ from 'lodash';

const validator = (initialValues, newValues) => {
  let errors = {}, updated = {};

  Object.keys(initialValues).forEach(field => {
    if ( initialValues[field] !== newValues[field] ){
      updated[field] = newValues[field]
    }
    if ( newValues[field].trim() === '' ){
      errors[field] = true
    }
  }) 

  return {
    errors,
    updated
  }
}

class SearchRealmInputs extends Component {
  constructor(props){
    super(props)

    const { apikey, realm, region } = this.props.initialState
    this.state = {
      apikey,
      errors: {},
      realm,
      region,
      updated: {}
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const { apikey, errors, realm, region, updated } = this.state
    this.validate();
    if ( _.isEmpty(errors) && !_.isEmpty(updated) ){
      this.props.saveUserPreferences({ apikey, realm, region });
      this.setState({ errors: {}, updated: {} })
    }
  };
  
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value },
    () => this.validate())
  };

  validate = () => {
    const { initialState } = this.props
    const validated = validator(initialState, this.state)
    const { errors, updated } = validated
    this.setState({ errors, updated })
  }

  render() {
    const { apikey, errors, region, realm } = this.state;
    return (
      <form style={{ display: 'flex' }} onSubmit={this.handleSubmit}>
        <div style={{display: 'flex', flexDirection: 'column' }}>
          <div>
            <label htmlFor="apikeyField">API Key</label>
            <input
              id="apikey"
              name="apikey"
              onChange={this.handleChange}
              type="text"
              value={apikey}
            />
          </div>
          { errors.apikey && <span>Enter api key</span> }
        </div>
        <div style={{display: 'flex', flexDirection: 'column' }}>
          <div>
            <label htmlFor="realmField">realm</label>
            <input
              id="realmField"
              name="realm"
              onChange={this.handleChange}
              type="text"
              value={realm}
            />
          </div>
          { errors.realm && <span>Enter a realm</span> }          
        </div>
        <select
          onChange={this.handleChange}
          name="region"
          value={region}
        >
          <option label="US" value="US" />
          <option label="EU" value="EU" />
        </select>  
        <button type="submit">Save</button>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  initialState: state.userData,
})

export default connect(mapStateToProps, { saveUserPreferences })(SearchRealmInputs)