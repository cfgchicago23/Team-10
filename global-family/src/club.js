import React, { Component } from 'react';
import './ClubList.css';

class ClubList extends Component {
  constructor() {
    super();
    this.state = {
      clubs: [],
      isLoading: true,
      error: null,
      search: '',
      newClubName: '', // New club name input field
      clubMembers: {}, // Store club members as an object
      expandedClub: null, // Store the ID of the expanded club
    };
  }

  componentDidMount() {
    this.fetchClubs();
  }

  fetchClubs() {
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

  fetchClubMembers(clubId) {
    // Simulate fetching club members from the server
    // Replace this with your actual API call to fetch members
    const members = ['a', 'b', 'c'];

    // Update the state with club members
    this.setState((prevState) => ({
      clubMembers: {
        ...prevState.clubMembers,
        [clubId]: members,
      },
    }));
  }

  handleSearchChange = (e) => {
    this.setState({ search: e.target.value });
  }

  handleNewClubNameChange = (e) => {
    this.setState({ newClubName: e.target.value });
  }

  handleExpandClub = (clubId) => {
    // If the clicked club is already expanded, collapse it
    if (this.state.expandedClub === clubId) {
      this.setState({ expandedClub: null });
    } else {
      // Otherwise, expand the clicked club and fetch its members
      this.setState({ expandedClub: clubId }, () => {
        this.fetchClubMembers(clubId);
      });
    }
  }

  handleDelete = (clubId) => {
    fetch(`/api/clubs/${clubId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => {
        // After successfully deleting the club, fetch the updated list of clubs
        this.fetchClubs();
      })
      .catch((error) => {
        console.error('Error deleting club:', error);
      });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { newClubName } = this.state;

    // Create a new club object
    const newClub = {
      id: this.state.clubs.length + 1, // Use this.state.clubs to access clubs
      name: newClubName,
      description: '', // You can add a description field if needed
      mentor_id: 1, // Replace with the actual mentor ID
    };

    // Update the local state with the new club
    this.setState((prevState) => ({
      clubs: [...prevState.clubs, newClub],
      newClubName: '', // Clear the input field
    }));

    // Submit the new club name to the server
    fetch('/api/clubs/add', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: newClubName,
        description: '', // You can add a description field if needed
        mentor_id: 1, // Replace with the actual mentor ID
      }),
    })
      .then((response) => response.json())
      .then(() => {
        // After successfully adding the club, fetch the updated list of clubs
        this.fetchClubs();
        this.setState({ newClubName: '' }); // Clear the input field
      })
      .catch((error) => {
        console.error('Error adding club:', error);
      });
  }

  render() {
    const { clubs, isLoading, error, search, newClubName, clubMembers, expandedClub } = this.state;
    const filteredClubs = clubs.filter(club => club.name.toLowerCase().includes(search.toLowerCase()));

    return (
      <div className="club-container">
        <h1 className="club-header">Club List</h1>
        {isLoading && <p>Loading clubs...</p>}
        {error && <p>Error loading clubs: {error.message}</p>}
        <form onSubmit={this.handleSubmit}>
          <input 
            type="text" 
            placeholder="Enter club name" 
            className="club-name-input"
            value={newClubName}
            onChange={this.handleNewClubNameChange}
          />
          <button type="submit">Add Club</button>
        </form>
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
              {expandedClub === club.id && clubMembers[club.id] && (
                <div>
                  <p>Members:</p>
                  <ul className="club-members-list">
                    {clubMembers[club.id].map((member, index) => (
                      <li key={index} className="club-member-item">
                        {member}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <button
                className="club-expand-button"
                onClick={() => this.handleExpandClub(club.id)}
              >
                {expandedClub === club.id ? 'Collapse' : 'Expand'}
              </button>
              {club.description && <p>{club.description}</p>}
              <button onClick={() => this.handleDelete(club.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ClubList;
