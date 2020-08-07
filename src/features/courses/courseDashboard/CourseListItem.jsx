import React from 'react';
import { Segment, Item, Icon, List, Button } from 'semantic-ui-react';
import CourseListStudentsEnrolled from './CourseListStudentsEnrolled';
import { Link } from 'react-router-dom';


import {format} from 'date-fns';
import { deleteCourseinFirestore } from '../../../app/firestore/firestoreService';

export default function CourseListItem({ course}) {


  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size='tiny' circular src={course.teacherPhotoURL} />
            <Item.Content>
              <Item.Header content={course.title} />
              <Item.Description>Teached by <Link to={`/profile/${course.teacherUid}`}>{course.teacher}</Link></Item.Description>
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
          {course.enrolledStudents.map((enrolledStudent) => (
            <CourseListStudentsEnrolled key={enrolledStudent.id} enrolledStudent={enrolledStudent} />
          ))}
        </List>
      </Segment>
      <Segment clearing>
        <div>{course.description}</div>
        <Button
          onClick={() => deleteCourseinFirestore(course.id)}
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
