import React from 'react';
import { Segment, Image, Item, Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import {format} from 'date-fns';

const courseImageStyle = {
  filter: 'brightness(30%)',
};

const courseImageTextStyle = {
  position: 'absolute',
  bottom: '5%',
  left: '5%',
  width: '100%',
  height: 'auto',
  color: 'white',
};

export default function courseDetailedHeader({course}) {
  return (
    <Segment.Group>
      <Segment basic attached='top' style={{ padding: '0' }}>
        <Image
          src={`/assets/domainImages/${course.domain}.jpg`}
          fluid
          style={courseImageStyle}
        />

        <Segment basic style={courseImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size='huge'
                  content={course.title}
                  style={{ color: 'white' }}
                />
                <p>{format(course.date, 'MMMM d, yyyy h:mm a')}</p>
                <p>
                  Teached by <strong>{course.teacher}</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment attached='bottom'>
        <Button>Cancel My Place</Button>
        <Button color='teal'>JOIN THIS COURSE</Button>

        <Button as={Link} to={`/manage/${course.id}`} color='orange' floated='right'>
          Manage Course
        </Button>
      </Segment>
    </Segment.Group>
  );
}
