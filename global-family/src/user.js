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
            <div>
                {/* List of all clubs with join functionality */}
                <h2>All Clubs</h2>
                <div>
                    {this.state.clubs.map(club => (
                        <div key={club.id}>
                            <span>{club.name}</span>
                            <button onClick={() => this.handleJoinClub(club.id)}>Join</button>
                        </div>
                    ))}
                </div>

                {/* Button to toggle showing joined clubs */}
                <button onClick={this.toggleJoinedClubs}>
                    {this.state.showJoinedClubs ? "Hide Joined Clubs" : "Show Joined Clubs"}
                </button>

                {/* List of clubs user has joined */}
                {this.state.showJoinedClubs && (
                    <div>
                        <h2>Joined Clubs</h2>
                        {this.state.joinedClubs.map(club => (
                            <div key={club.id}>
                                <span>{club.name}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }
}

export default UserPage;

