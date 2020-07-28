import React from "react";
import { Grid } from "semantic-ui-react";
import CourseDetailedHeader from "./CourseDetailedHeader";
import CourseDetailedInfo from "./CourseDetailedInfo";
import CourseDetailedChat from "./CourseDetailedChat";
import CourseDetailedSidebar from "./CourseDetailedSidebar";
import { useSelector, useDispatch } from "react-redux";
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc";
import { listenToCourseFromFirestore } from "../../../app/firestore/firestoreService";
import { listenToCourses } from "../courseActions";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Redirect } from "react-router-dom";

export default function CourseDetailedPage({ match }) {
  const dispatch = useDispatch();
  const course = useSelector((state) =>
    state.course.courses.find((e) => e.id === match.params.id)
  );
  const { loading, error} = useSelector((state) => state.async);

  useFirestoreDoc({
    query: () => listenToCourseFromFirestore(match.params.id),
    data: (course) => dispatch(listenToCourses([course])),
    deps: [match.params.id, dispatch],
  });

  if (loading || (!course && !error))
    return <LoadingComponent content="Loading event..." />;


  if(error) return <Redirect to='/error' />
  return (
    <Grid>
      <Grid.Column width={10}>
        <CourseDetailedHeader course={course} />
        <CourseDetailedInfo course={course} />
        <CourseDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <CourseDetailedSidebar enrolledStudents={course?.enrolledStudents} />
      </Grid.Column>
    </Grid>
  );
}
