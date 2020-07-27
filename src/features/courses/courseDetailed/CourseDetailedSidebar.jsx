import React from 'react';
import { Segment, Item } from 'semantic-ui-react';

export default function CourseDetailedSidebar({ enrolledStudents }) {
  return (
    <>
      <Segment
        textAlign='center'
        style={{ border: 'none' }}
        attached='top'
        secondary
        inverted
        color='teal'
      >
        {enrolledStudents.length} {enrolledStudents.length > 1 ? 'People' : 'Person'} Going
      </Segment>
      <Segment attached>
        <Item.Group relaxed divided>
          {enrolledStudents.map((attendee) => (
            <Item key={attendee.id} style={{ position: 'relative' }}>
              <Item.Image
                size='tiny'
                src={attendee.photoURL || '/assets/user.png'}
              />
              <Item.Content verticalAlign='middle'>
                <Item.Header as='h3'>
                  <span>{attendee.displayName}</span>
                </Item.Header>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      </Segment>
    </>
  );
}
