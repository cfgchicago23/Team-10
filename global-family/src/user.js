import React, { Component } from 'react';
import { Button, TextField, List, ListItem, ListItemText, ListItemSecondaryAction, Container, Typography, Select, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

class UserPage extends Component {
    state = {
        clubs: [{id: 1, name: "Test Club", country: "USA"}], // Added country for demonstration
        joinedClubs: [],
        userId: 1,
        searchName: '',
        searchCountry: ''
    }

    // ... other methods ...

    handleSearchNameChange = (e) => {
        this.setState({ searchName: e.target.value });
    }

    handleSearchCountryChange = (e) => {
        this.setState({ searchCountry: e.target.value });
    }

    filteredClubs = () => {
        const { clubs, searchName, searchCountry } = this.state;
        return clubs.filter(club => 
            club.name.toLowerCase().includes(searchName.toLowerCase()) &&
            (searchCountry === '' || club.country === searchCountry)
        );
    }

    render() {
        const filteredClubs = this.filteredClubs();
        return (
            <Container maxWidth="md" style={{ marginTop: '40px' }}>
                <Typography variant="h4" gutterBottom>
                    Clubs
                </Typography>
                <TextField 
                    fullWidth
                    variant="outlined"
                    placeholder="Search clubs by name..."
                    value={this.state.searchName}
                    onChange={this.handleSearchNameChange}
                    style={{ marginBottom: '20px' }}
                />
                <Select
                    fullWidth
                    value={this.state.searchCountry}
                    onChange={this.handleSearchCountryChange}
                    variant="outlined"
                    style={{ marginBottom: '20px' }}
                >
                    <MenuItem value=""><em>Filter by Country</em></MenuItem>
                    <MenuItem value="USA">USA</MenuItem>
                    <MenuItem value="Canada">Canada</MenuItem>
                    <MenuItem value="UK">UK</MenuItem>
                    {/* Add more countries as needed */}
                </Select>
                <List>
                    {filteredClubs.length === 0 ? (
                        <ListItem>
                            <ListItemText primary="No clubs found." />
                        </ListItem>
                    ) : (
                        filteredClubs.map(club => (
                            <ListItem key={club.id}>
                                <ListItemText primary={club.name} secondary={club.country} />
                                <ListItemSecondaryAction>
                                    <Button 
                                        variant="contained" 
                                        color="primary" 
                                        startIcon={<AddIcon />}
                                        onClick={() => this.handleJoinClub(club.id)}
                                    >
                                        Add
                                    </Button>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))
                    )}
                </List>

                <Typography variant="h4" gutterBottom style={{ marginTop: '40px' }}>
                    Joined Clubs
                </Typography>
                <List>
                    {this.state.joinedClubs.length === 0 ? (
                        <ListItem>
                            <ListItemText primary="You haven't joined any clubs yet." />
                        </ListItem>
                    ) : (
                        this.state.joinedClubs.map(club => (
                            <ListItem key={club.id}>
                                <ListItemText primary={club.name} secondary={club.country} />
                            </ListItem>
                        ))
                    )}
                </List>
            </Container>
        );
    }
}

export default UserPage;
