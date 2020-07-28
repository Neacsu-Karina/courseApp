import React from 'react';
import { Segment, Header, Button } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function ErrorComponent(){
    const {error} = useSelector((state) => state.async);

    return(
        <Segment placeholder>
            <Header textAlign='center' content ={error?.message || 'We have an error'} />
            <Button as={Link} to='/courses' primary style={{marginTop: 20}} content='Return to courses page'/>
        </Segment>
    )
    
}