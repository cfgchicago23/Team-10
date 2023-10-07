import React, { Component } from 'react';
import { Button, TextField, List, ListItem, ListItemText, Container, Typography, Select, MenuItem, Card, CardContent, CardActions, CssBaseline } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { motion } from 'framer-motion';

class UserPage extends Component {
    state = {
        clubs: [{id: 1, name: "Test Club", country: "USA"}], // Added country for demonstration
        joinedClubs: [],
        userId: 1,
        searchName: '',
        searchCountry: ''
    }


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
            <Container maxWidth="lg" style={{ marginTop: '40px', background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', padding: '40px', borderRadius: '15px' }}>
                <CssBaseline />
                <Typography variant="h2" gutterBottom style={{ color: '#FFF' }}>
                    Clubs Directory
                </Typography>
                <TextField 
                    fullWidth
                    variant="outlined"
                    placeholder="Search clubs by name..."
                    value={this.state.searchName}
                    onChange={this.handleSearchNameChange}
                    style={{ marginBottom: '20px', background: '#FFF' }}
                />
                <Select
                    fullWidth
                    value={this.state.searchCountry}
                    onChange={this.handleSearchCountryChange}
                    variant="outlined"
                    style={{ marginBottom: '20px', background: '#FFF' }}
                >
                    <MenuItem value=""><em>Filter by Country</em></MenuItem>
                    <MenuItem value="USA">USA</MenuItem>
                    <MenuItem value="Canada">Canada</MenuItem>
                    <MenuItem value="UK">UK</MenuItem>
                    <MenuItem value="UK">Nepal</MenuItem>
                    <MenuItem value="UK">India</MenuItem>
                    <MenuItem value="UK">China</MenuItem>
                    <MenuItem value="UK">Brazil</MenuItem>
                    <MenuItem value="UK">Mexico</MenuItem>
                    <MenuItem value="UK">Spain</MenuItem>
                    {/* Add more countries as needed */}
                </Select>
                {filteredClubs.map(club => (
                    <motion.div key={club.id} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <Card style={{ marginBottom: '20px' }}>
                            <CardContent>
                                <Typography variant="h5">{club.name}</Typography>
                                <Typography color="textSecondary">{club.country}</Typography>
                            </CardContent>
                            <CardActions>
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    startIcon={<AddIcon />}
                                    onClick={() => this.handleJoinClub(club.id)}
                                >
                                    Add
                                </Button>
                            </CardActions>
                        </Card>
                    </motion.div>
                ))}

                <Typography variant="h4" gutterBottom style={{ marginTop: '40px', color: '#FFF' }}>
                    Joined Clubs
                </Typography>
                <List>
                    {this.state.joinedClubs.map(club => (
                        <ListItem key={club.id}>
                            <ListItemText primary={club.name} secondary={club.country} />
                        </ListItem>
                    ))}
                </List>
            </Container>
        );
    }
}

export default UserPage;