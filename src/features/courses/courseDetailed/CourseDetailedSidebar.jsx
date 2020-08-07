import React from 'react';
import { Segment, Item, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function CourseDetailedSidebar({ enrolledStudents, teacherUid }) {
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
          {enrolledStudents.map((enrolledStudent) => (
            <Item as={Link} to={`/profile/${enrolledStudent.id}`} key={enrolledStudent.id} style={{ position: 'relative' }}>
              {teacherUid === enrolledStudent.id &&(
                <Label style={{position: 'absolute'}} color='orange' ribbon='right' content='Teacher' />
              )}
              <Item.Image
                size='tiny'
                src={enrolledStudent.photoURL || '/assets/user.png'}
              />
              <Item.Content verticalAlign='middle'>
                <Item.Header as='h3'>
                  <span>{enrolledStudent.displayName}</span>
                </Item.Header>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      </Segment>
    </>
  );
}
