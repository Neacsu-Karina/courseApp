import React from 'react';
import CourseListItem from './CourseListItem';
import InfiniteScroll from 'react-infinite-scroller';

export default function CourseList({ courses, getNextCourses, loading, moreCourses }) {
  return (
    <>
    {courses.length !==0 &&(
      <InfiniteScroll
      pageStart={0}
      loadMore={getNextCourses}
      hasMore={!loading && moreCourses}
      initialLoad={false}
      >
        {courses.map((course) => (
        <CourseListItem course={course} key={course.id} />
      ))}
      </InfiniteScroll>
    )}
     
    </>
  );
}
