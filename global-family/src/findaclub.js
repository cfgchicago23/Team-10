import React, { useState } from 'react';
import { Button, TextField, List, ListItem, ListItemText, Container, Typography, Select, MenuItem, Card, CardContent, CardActions, CssBaseline } from '@mui/material';

const FindAClubPage = () => {
    return (<div><h1>Looking for a club?</h1>
    <TextField 
            fullWidth
            variant="outlined"
            placeholder="Search clubs..."
            onChange={this.handleSearchChange}
            style={{ marginBottom: '20px', background: '#FFF' }}
        />
    </div>);
}

export default FindAClubPage;