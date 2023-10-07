import React, { Component } from 'react';

class UserPage extends Component {
    state = {
        clubs: [],
        joinedClubs: [],
        showJoinedClubs: false,
        userId: 1  // Assuming a static user ID for simplicity
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
        fetch('/api/join_club', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: this.state.userId,
                club_id: clubId,
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === "Club joined successfully.") {
                const clubToJoin = this.state.clubs.find(club => club.id === clubId);
                this.setState(prevState => ({
                    joinedClubs: [...prevState.joinedClubs, clubToJoin]
                }));
            }
        });
    }


    toggleJoinedClubs = () => {
        this.setState(prevState => ({
            showJoinedClubs: !prevState.showJoinedClubs
        }));
    }

    render() {
        return (
            <div>
                <h2>Available Clubs</h2>
                <ul>
                    {this.state.clubs.map(club => (
                        <li key={club.id}>
                            {club.name}
                            <button onClick={() => this.handleJoinClub(club.id)}>Add</button>
                        </li>
                    ))}
                </ul>

                <h2>Joined Clubs</h2>
                <ul>
                    {this.state.joinedClubs.map(club => (
                        <li key={club.id}>{club.name}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default UserPage;



