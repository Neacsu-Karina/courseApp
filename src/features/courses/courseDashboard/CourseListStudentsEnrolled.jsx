import React from 'react';
import { List, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function CourseListStudentsEnrolled({enrolledStudent}) {
    return (
        <List.Item as={Link} to={`/profile/${enrolledStudent.id}`}>
            <Image size='mini' circular src={enrolledStudent.photoURL} />
        </List.Item>
    )
}