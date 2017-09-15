
import React from 'react';
import ReactDOM from 'react-dom';
import PeopleBox from './components/PeopleBox';

// -- The url property below is very important. --

// It is pointed at the production Node.js server url currently, however if you would like to work in your development environment switch it to url='http://localhost:5001/api/people' (what the Node.js server is set to run on if a PORT environment variable isn't set.)
ReactDOM.render(
   <PeopleBox url='https://profile-crud-app.herokuapp.com/api/people' pollInterval={2000} />,

   //pollInterval --> reruns a check every 2 seconds to get new information from DB. This is visible in child component (PeopleBox)
 document.getElementById('root')
);
