
import React from 'react';
import ReactDOM from 'react-dom';
import CommentBox from './components/CommentBox';

 // url='https://profile-crud-app.herokuapp.com/api/comments'
ReactDOM.render(
   <CommentBox
   url='http://localhost:5000/api/comments'
   pollInterval={2000} />,
 document.getElementById('root')
);
