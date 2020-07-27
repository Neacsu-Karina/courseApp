import React from 'react';
import { Grid } from 'semantic-ui-react';
import CourseDetailedHeader from './CourseDetailedHeader';
import CourseDetailedInfo from './CourseDetailedInfo';
import CourseDetailedChat from './CourseDetailedChat';
import CourseDetailedSidebar from './CourseDetailedSidebar';
import { useSelector } from 'react-redux';

export default function CourseDetailedPage({match}) {
    const course = useSelector(state => state.course.courses.find(e => e.id === match.params.id));
    return (
        <Grid>
            <Grid.Column width={10}>
                <CourseDetailedHeader course={course} />
                <CourseDetailedInfo course={course} />
                <CourseDetailedChat />
            </Grid.Column>
            <Grid.Column width={6}>
                <CourseDetailedSidebar enrolledStudents={course.enrolledStudents} />
            </Grid.Column>
        </Grid>
    )
}