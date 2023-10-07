import React, { useState } from 'react';

const HelpPage = () => {
    return (<div><h1>Ask for Help</h1>
        <form>
            <label for="formTitle">Report an Issue:</label><br />
            <br />
            <textarea rows="5" cols="60" name="description">

            </textarea><br /><br />
            <input type="submit" value="Submit" />
        </form>

    </div>);
}

export default HelpPage;