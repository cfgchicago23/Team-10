import React, { Component } from 'react';

class UserPage extends Component {
    state = {
        clubs: [],          // All available clubs
        joinedClubs: [],    // Clubs that the user has joined
        showJoinedClubs: false  // Toggle to show/hide joined clubs
    }

    componentDidMount() {
        this.fetchAllClubs();
    }

    fetchAllClubs = () => {
        fetch('/api/clubs')
            .then(response => response.json())
            .then(data => {
                this.setState({ clubs: data });
            });
    }

    handleJoinClub = (clubId) => {
        // Logic to join a club
        // For simplicity, we'll just add the club to the joinedClubs state
        const clubToJoin = this.state.clubs.find(club => club.id === clubId);
        this.setState(prevState => ({
            joinedClubs: [...prevState.joinedClubs, clubToJoin]
        }));
    }

    toggleJoinedClubs = () => {
        this.setState(prevState => ({
            showJoinedClubs: !prevState.showJoinedClubs
        }));
    }

    render() {
        return (
            <div className="user-container">
                <h2 className="user-header">All Clubs</h2>
                <ul className="club-list">
                    {this.state.clubs.map(club => (
                        <li key={club.id} className="club-item">
                            <span>{club.name}</span>
                            <button onClick={() => this.handleJoinClub(club.id)}>Join</button>
                        </li>
                    ))}
                </ul>

                <button className="toggle-button" onClick={this.toggleJoinedClubs}>
                    {this.state.showJoinedClubs ? "Hide Joined Clubs" : "Show Joined Clubs"}
                </button>

                {this.state.showJoinedClubs && (
                    <div>
                        <h2 className="user-header">Joined Clubs</h2>
                        <ul className="club-list">
                            {this.state.joinedClubs.map(club => (
                                <li key={club.id} className="club-item">
                                    <span>{club.name}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        );
    }
}

export default UserPage;
