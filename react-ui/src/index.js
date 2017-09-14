
import React from 'react';
import ReactDOM from 'react-dom';
import PeopleBox from './components/PeopleBox';

ReactDOM.render(
   <PeopleBox url='http://localhost:5001/api/people' pollInterval={2000} />,
 document.getElementById('root')
);
