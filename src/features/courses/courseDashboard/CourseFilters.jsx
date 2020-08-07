import React from "react";
import { Menu, Header } from "semantic-ui-react";
import { Calendar } from "react-calendar";

export default function CourseFilters({ setPredicate, predicate, loading }) {
  return (
    <>
      <Menu vertical size="large" style={{ width: "100%" }}>
        <Header icon="filter" attached color="teal" content="Filters" />
        <Menu.Item 
        content="All Courses"
        active={predicate.get('filter') === 'all'}
        onClick={()=> setPredicate('filter', 'all')}
        disabled={loading}
         />
        <Menu.Item 
        content="I'm going"
        active={predicate.get('filter') === 'isGoing'}
        onClick={()=> setPredicate('filter', 'isGoing')}
        disabled={loading}
         />
        <Menu.Item 
        content="I'm hosting"
        active={predicate.get('filter') === 'isTeacher'}
        onClick={()=> setPredicate('filter', 'isTeacher')}
        disabled={loading}
         />
      </Menu>
      <Header icon="calendar" attached color="teal" content="Select date" />
      <Calendar 
      onChange={date=> setPredicate('startDate', date)}
      value={predicate.get('startDate') || new Date()}
      tileDisabled={()=> loading}
      />
    </>
  );
}
