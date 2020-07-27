import React from 'react';
import CourseListItem from './CourseListItem';

export default function CourseList({ courses }) {
  return (
    <>
      {courses.map((course) => (
        <CourseListItem course={course} key={course.id} />
      ))}
    </>
  );
}
