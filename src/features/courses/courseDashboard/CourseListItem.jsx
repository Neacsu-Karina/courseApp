import React from 'react';
import { Segment, Item, Icon, List, Button } from 'semantic-ui-react';
import CourseListAttendee from './CourseListAttendee';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {deleteCourse} from '../courseActions';
import {format} from 'date-fns';

export default function CourseListItem({ course}) {
  const dispatch = useDispatch();

  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size='tiny' circular src={course.domainPhotoURL} />
            <Item.Content>
              <Item.Header content={course.title} />
              <Item.Description>Teached by {course.teacher}</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name='clock' /> {format(course.date, 'MMMM d, yyyy h:mm a')}
        </span>
      </Segment>
      <Segment secondary>
        <List horizontal>
          {course.enrolledStudents.map((attendee) => (
            <CourseListAttendee key={attendee.id} attendee={attendee} />
          ))}
        </List>
      </Segment>
      <Segment clearing>
        <div>{course.description}</div>
        <Button
          onClick={() => dispatch(deleteCourse(course.id))}
          color='red'
          floated='right'
          content='Delete'
        />
        <Button
          as={Link} to={`/courses/${course.id}`}
          color='teal'
          floated='right'
          content='View'
        />
      </Segment>
    </Segment.Group>
  );
}
