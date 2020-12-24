import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = (props) => {
    return(
     <div id="overlay">
       <Spinner animation="border" variant="primary" />
     </div>)
    
}

export default Loader