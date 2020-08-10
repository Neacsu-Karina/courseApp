import React from "react";
import { Grid } from "semantic-ui-react";
import CourseDetailedHeader from "./CourseDetailedHeader";
import CourseDetailedInfo from "./CourseDetailedInfo";
import CourseDetailedChat from "./CourseDetailedChat";
import CourseDetailedSidebar from "./CourseDetailedSidebar";
import { useSelector, useDispatch } from "react-redux";
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc";
import { listenToCourseFromFirestore } from "../../../app/firestore/firestoreService";

import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Redirect } from "react-router-dom";
import { listenToSelectedCourse } from "../courseActions";

export default function CourseDetailedPage({ match }) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const course = useSelector((state) => state.course.selectedCourse);
  const { loading, error } = useSelector((state) => state.async);
  const isTeacher = course?.teacherUid === currentUser.uid;
  const isEnrolled = course?.enrolledStudents?.some(
    (a) => a.id === currentUser.uid
  );

  useFirestoreDoc({
    query: () => listenToCourseFromFirestore(match.params.id),
    data: (course) => dispatch(listenToSelectedCourse((course))),
    deps: [match.params.id, dispatch],
  });

  if (loading || (!course && !error))
    return <LoadingComponent content="Loading event..." />;

  if (error) return <Redirect to="/error" />;
  return (
    <Grid>
      <Grid.Column width={10}>
        <CourseDetailedHeader
          course={course}
          isEnrolled={isEnrolled}
          isTeacher={isTeacher}
        />
        <CourseDetailedInfo course={course} />
        <CourseDetailedChat courseId={course.id} />
      </Grid.Column>
      <Grid.Column width={6}>
        <CourseDetailedSidebar
          enrolledStudents={course?.enrolledStudents}
          teacherUid={course.teacherUid}
        />
      </Grid.Column>
    </Grid>
  );
}
