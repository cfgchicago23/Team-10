import React, { Component } from 'react';
import './ClubList.css';

class ClubList extends Component {
  constructor() {
    super();
    this.state = {
      clubs: [],
      isLoading: true,
      error: null,
      search: ''
    };
  }

  componentDidMount() {
    fetch('/api/clubs')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        this.setState({ clubs: data, isLoading: false });
      })
      .catch((error) => {
        this.setState({ error, isLoading: false });
      });
  }

  handleSearchChange = (e) => {
    this.setState({ search: e.target.value });
  }

  render() {
    const { clubs, isLoading, error, search } = this.state;
    const filteredClubs = clubs.filter(club => club.name.toLowerCase().includes(search.toLowerCase()));

    return (
      <div className="club-container">
        <h1 className="club-header">Club List</h1>
        {isLoading && <p>Loading clubs...</p>}
        {error && <p>Error loading clubs: {error.message}</p>}
        <input 
          type="text" 
          placeholder="Search clubs..." 
          className="club-search"
          value={search}
          onChange={this.handleSearchChange}
        />
        <ul className="club-list">
          {filteredClubs.map((club) => (
            <li key={club.id} className="club-item">
              <h2>{club.name}</h2>
              {club.description && <p>{club.description}</p>}
            </li>

          ))}
        </ul>
      </div>
    );
  }
}


export default ClubList;

