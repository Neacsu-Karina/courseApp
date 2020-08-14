import React, { useEffect, useState } from "react";
import { Grid, Loader, Tab } from "semantic-ui-react";
import CourseList from "./CourseList";
import { useSelector, useDispatch } from "react-redux";
import CourseListItemPlaceholder from "./CourseListItemPlaceholder";
import CourseFilters from "./CourseFilters";

import { fetchCourses } from "../courseActions";
import { RETAIN_STATE } from "../courseConstants";

export default function CourseDashboard() {
  const limit = 2;
  const dispatch = useDispatch();
  const {
    courses,
    moreCourses,
    filter,
    startDate,
    lastVisible,
    retainState,
  } = useSelector((state) => state.course);
  const { loading } = useSelector((state) => state.async);

  const [loadingInitial, setLoadingInitial] = useState(false);

  useEffect(() => {
    if (retainState) return;
    setLoadingInitial(true);
    dispatch(fetchCourses(filter, startDate, limit)).then((lastVisible) => {
      setLoadingInitial(false);
    });
    return () => {
      dispatch({ type: RETAIN_STATE });
    };
  }, [dispatch, filter, startDate, retainState]);

  function handleFetchNextCourses() {
    dispatch(fetchCourses(filter, startDate, limit, lastVisible));
  }

  return (
    <Grid >
      <Grid.Column  width={10}>
         {loadingInitial && (
          <>
            <CourseListItemPlaceholder />
            <CourseListItemPlaceholder />
          </>
        )} 
        <Grid.Row>
        <CourseList
          courses={courses}
          getNextCourses={handleFetchNextCourses}
          loading={loading}
          moreCourses={moreCourses}
        />
        </Grid.Row>
      </Grid.Column>

      <Grid.Column width={6}>                  
        <CourseFilters loading={loading} />
      </Grid.Column>
     
      <Grid.Column width={10}>
        <Loader active={loading} />
      </Grid.Column>
    </Grid>
  );
}