import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class Navbar extends Component {
  renderLinks = () => {
    const titles = ['alchemy', 'leatherworking', 'tailoring']
    const { pathname } = this.props.location
    const getClasses = link => link === pathname ?  'Navbar-item active' : 'Navbar-item'
    return titles.map(title => {
      const linkUrl = `/prof/${title}`
      return (
        <Link key={title} className={getClasses(linkUrl)} to={linkUrl}>
          {title}
        </Link>
      )
    })
  }
  render() {
    return (
      <div className="Navbar">
        {this.renderLinks()}
      </div>
    )
  }
}

export default withRouter(Navbar);