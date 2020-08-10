import React, { useEffect, useState } from "react";
import { Grid,  Loader } from "semantic-ui-react";
import CourseList from "./CourseList";
import { useSelector, useDispatch } from "react-redux";
import CourseListItemPlaceholder from "./CourseListItemPlaceholder";
import CourseFilters from "./CourseFilters";
import {  fetchCourses, clearCourses} from "../courseActions";


export default function CourseDashboard() {
  const limit = 2;
  const dispatch = useDispatch();
  const { courses, moreCourses } = useSelector((state) => state.course);
  const { loading } = useSelector((state) => state.async);
  const [lastDocSnapshot, setLastDocSnapshot]=useState(null);
  const [loadingInitial, setLoadingInitial]=useState(false);
  const [predicate, setPredicate] = useState(
    new Map([
      ["startDate", new Date()],
      ["filter", "all"],
    ])
  );

  function handleSetPredicate(key, value) {
    dispatch(clearCourses());
    setLastDocSnapshot(null);
    setPredicate(new Map(predicate.set(key, value)));
  }

  useEffect(() => {
    setLoadingInitial(true);
    dispatch(fetchCourses(predicate, limit)).then((lastVisible)=>{
      setLastDocSnapshot(lastVisible);
      setLoadingInitial(false);

    });
    return()=>{
      dispatch(clearCourses())
    }
    
  }, [dispatch, predicate])

  function handleFetchNextCourses(){
    dispatch(fetchCourses(predicate, limit, lastDocSnapshot)).then((lastVisible) => {
      setLastDocSnapshot(lastVisible);
    })
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        {loadingInitial && (
          <>
            <CourseListItemPlaceholder />
            <CourseListItemPlaceholder />
          </>
        )}
        <CourseList courses={courses} getNextCourses={handleFetchNextCourses} loading={loading} moreCourses={moreCourses}/>
        
      
      </Grid.Column>
      <Grid.Column width={6}>
        <CourseFilters
          predicate={predicate}
          setPredicate={handleSetPredicate}
          loading={loading}
        />
      </Grid.Column>
        <Grid.Column width={10}>
          <Loader active={loading} />
        </Grid.Column>
    </Grid>
  );
}
