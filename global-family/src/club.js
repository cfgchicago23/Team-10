import React, { Component } from 'react';
import { Button, TextField, List, ListItem, ListItemText, Container, Typography, Select, MenuItem, Card, CardContent, CardActions, CssBaseline } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { motion } from 'framer-motion';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import { useLocation, Link } from "react-router-dom";



class ClubList extends Component {
  constructor() {
    super();
    this.state = {
      clubs: [],
      isLoading: false,
      error: null,
      search: '',
      newClubName: '',
      newClubDescription: '', // New club description field
      newClubCountry: '', // New club country field
      clubMembers: {},
      expandedClub: null,
      selectedTab: 'club',
    };
  }
  handleBottomNavChange = (event, newValue) => {
    console.log(newValue);
    this.setState({ selectedTab: newValue });
  };
  
  
  componentDidMount() {
    fetch('https://localhost:8000/api/get-signed-in-user')
        .then((response) => response.json())
        .then((data) => {
            this.setState({ signedInUser: data });
        })
        .catch((error) => {
            console.error('Error fetching user data:', error);
        });
  }

  handleNewClubDescriptionChange = (e) => {
    this.setState({ newClubDescription: e.target.value });
  }

  handleNewClubCountryChange = (e) => {
    this.setState({ newClubCountry: e.target.value });
  }

  fetchClubs() {
    fetch('https://localhost:8000/api/clubs/list')
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


  //method for those who are joining the club
  fetchClubMembers = (clubName, userEmail) => {
    // Make a POST request to /api/clubs/addmember
    fetch('https://localhost:8000/api/clubs/addmember', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        club_name: clubName,
        user_email: userEmail,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  

      })
      .catch((error) => {
        console.error('Error adding member to club:', error);
        // Handle errors here if needed
      });
  };
  //add a method for those who want to join but aren't admitted. 

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
    const { newClubName, newClubDescription, newClubCountry } = this.state;
  
    // Create a new club object
    const newClub = {
      name: newClubName,
      description: newClubDescription,
      country: newClubCountry,
    };
  
    // Make a POST request to your Flask API endpoint for adding a club
    fetch('https://localhost:8000/api/clubs/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newClub),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Club added successfully, reset the form and fetch updated club list
        this.setState({
          newClubName: '',
          newClubDescription: '',
          newClubCountry: '',
        });
        this.fetchClubs(); // Fetch updated club list
      })
      .catch((error) => {
        console.error('Error adding club:', error);
        // Handle errors here if needed
      });
  };

  render() {
    const { clubs, isLoading, error, search, newClubName, newClubDescription, newClubCountry, clubMembers, expandedClub } = this.state;
    const filteredClubs = clubs.filter(club => club.name.toLowerCase().includes(search.toLowerCase()));
    return (
      <Container maxWidth="lg" style={{ marginTop: '40px', background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', padding: '40px', borderRadius: '15px' }}>
        <CssBaseline />
        <Typography variant="h2" gutterBottom style={{ color: '#FFF' }}>
          Club List for Leaders
        </Typography>
        <Typography variant="h6" gutterBottom style={{ color: '#FFF' }}>
          Want to add a club? Add here! (Name, Description, and Country!)
        </Typography>
        {isLoading && <p>Loading clubs...</p>}
        {error && <p>Error loading clubs: {error.message}</p>}
        <form onSubmit={this.handleSubmit}>
          <TextField 
            fullWidth
            variant="outlined"
            placeholder="Enter club name"
            value={newClubName}
            onChange={this.handleNewClubNameChange}
            style={{ marginBottom: '20px', background: '#FFF' }}
          />
          <TextField 
            fullWidth
            variant="outlined"
            placeholder="Enter description"
            value={newClubDescription}
            onChange={this.handleNewClubDescriptionChange}
            style={{ marginBottom: '20px', background: '#FFF' }}
          />
          <Select
            fullWidth
            //placeholder="Enter country!"
            value={newClubCountry}
            onChange={this.handleNewClubCountryChange}
            variant="outlined"
            placeholder="Enter country!"
            style={{ marginBottom: '20px', background: '#FFF' }}
          >
            <MenuItem value=""><em>Select Country</em></MenuItem>
            <MenuItem value="USA">USA</MenuItem>
            <MenuItem value="Canada">Canada</MenuItem>
            <MenuItem value="UK">UK</MenuItem>
            <MenuItem value="Nepal">Nepal</MenuItem>
            <MenuItem value="India">India</MenuItem>
            <MenuItem value="China">China</MenuItem>
            <MenuItem value="Brazil">Brazil</MenuItem>
            <MenuItem value="Mexico">Mexico</MenuItem>
            <MenuItem value="Spain">Spain</MenuItem>
            {/* Add more countries as needed */}
          </Select>
          <Button variant="contained" color="primary" type="submit">
            Add Club
          </Button>
        </form>
        <TextField 
            fullWidth
            variant="outlined"
            placeholder="Search clubs..."
            value={search}
            onChange={this.handleSearchChange}
            style={{ marginBottom: '20px', background: '#FFF' }}
        />
        {filteredClubs.map((club) => (
          <motion.div key={club.id} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card style={{ marginBottom: '20px' }}>
              <CardContent>
                <Typography variant="h5">{club.name}</Typography>
                <Typography color="textSecondary">{club.description}</Typography>
                <Typography color="textSecondary">Country: {club.country}</Typography>
                {expandedClub === club.id && clubMembers[club.id] && (
                  <List>
                    {clubMembers[club.id].map((member, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={member} />
                      </ListItem>
                    ))}
                  </List>
                )}
              </CardContent>
              <CardActions>
                <Button 
                  variant="contained" 
                  color="primary" 
                  startIcon={expandedClub === club.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  onClick={() => this.handleExpandClub(club.id)}
                >
                  {expandedClub === club.id ? 'Collapse' : 'Expand'}
                </Button>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  startIcon={<DeleteIcon />}
                  onClick={() => this.handleDelete(club.id)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </motion.div>
        ))}
      <BottomNavigation value={this.state.selectedTab} onChange={this.handleBottomNavChange}>
        <BottomNavigationAction
          label="ContentPage"
          value="content"
          icon={<HomeIcon />}
          component={Link} to="/ContentPage" // Link to the home page
        />
        <BottomNavigationAction
          label="Clubs"
          value="club"
          icon={<PeopleIcon />}
          component={Link} to="/club" // Link to the clubs page
        />
      </BottomNavigation>
      </Container>
    );
  }
}

export default ClubList;