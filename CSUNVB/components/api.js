import React from 'react';

import axios from 'axios';

export default class BaseList extends React.Component {
  state = {
    Base: []
  }

  componentDidMount() {
    axios.get(`http://127.0.0.1:8000/api/bases`)
      .then(res => {
        const bases = res.data;
        this.setState({ bases });
      })
  }

  render() {
    return (
      <ul>
        { this.state.bases.map(base => <li>{base.name}</li>)}
      </ul>
    )
  }
}