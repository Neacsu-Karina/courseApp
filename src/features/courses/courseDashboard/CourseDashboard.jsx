import React from 'react';
import { Grid } from 'semantic-ui-react';
import CourseList from './CourseList';
import { useSelector, useDispatch } from 'react-redux';
import CourseListItemPlaceholder from './CourseListItemPlaceholder';
import CourseFilters from './CourseFilters';
import { listenToCoursesFromFirestore } from '../../../app/firestore/firestoreService';
import { listenToCourses } from '../courseActions';
import useFirestoreCollection from '../../../app/hooks/useFirestoreCollection';

export default function CourseDashboard() {
  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state.course);
  const { loading } = useSelector((state) => state.async);

useFirestoreCollection({
  query: () => listenToCoursesFromFirestore(),
  data: courses => dispatch(listenToCourses(courses)),
  deps:[dispatch]
})

  return (
    <Grid>
      <Grid.Column width={10}>
        {loading &&
          <>
            <CourseListItemPlaceholder />
            <CourseListItemPlaceholder />
          </>
        }
        <CourseList courses={courses} />
      </Grid.Column>
      <Grid.Column width={6}>
        <CourseFilters />
      </Grid.Column>
    </Grid>
  );
}
