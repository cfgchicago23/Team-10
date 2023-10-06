import React, { Component } from 'react';
import './ClubList.css';

class ClubList extends Component {
  constructor() {
    super();
    this.state = {
      clubs: [],
    };
  }

  componentDidMount() {
    fetch('/api/clubs')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ clubs: data });
      })
      .catch((error) => {
        console.error('Error fetching clubs:', error);
      });
  }

  render() {
    const { clubs } = this.state;
    return (
      <div className="club-container">
        <h1 className="club-header">Club List</h1>
        <ul className="club-list">
          {clubs.map((club) => (
            <li key={club.id} className="club-item">{club.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ClubList;