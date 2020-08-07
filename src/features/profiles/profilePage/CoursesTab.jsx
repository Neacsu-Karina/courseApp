import React, { useState } from 'react';
import { Grid, Header, Tab, Card, Image } from 'semantic-ui-react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import useFirestoreCollection from '../../../app/hooks/useFirestoreCollection';
import { getUserCoursesQuery } from '../../../app/firestore/firestoreService';
import { listenToUserCourses } from '../profileActions';

export default function CoursesTab({ profile }) {
  const dispatch = useDispatch();
  const [activeTab] = useState(0);
  const { profileCourses } = useSelector((state) => state.profile);
  const { loading } = useSelector((state) => state.async);

  useFirestoreCollection({
    query: () => getUserCoursesQuery(activeTab, profile.id),
    data: (courses) => dispatch(listenToUserCourses(courses)),
    deps: [dispatch, activeTab, profile.id],
  });

  // const panes = [
  //   { menuItem: 'Future Courses', pane: { key: 'future' } },
  //   { menuItem: 'Past Courses', pane: { key: 'past' } },
  //   { menuItem: 'Teaching', pane: { key: 'teaching' } },
  // ];
  return (
    <Tab.Pane loading={loading}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated='left' icon='calendar' content='Courses' />
        </Grid.Column>
        <Grid.Column width={16}>
          {/* <Tab
            onTabChange={(e, data) => setActiveTab(data.activeIndex)}
            panes={panes}
            menu={{ secondary: true, pointing: true }}
          /> */}
          <Card.Group itemsPerRow={5} style={{ marginTop: 10 }}>
            {profileCourses.map((course) => (
              <Card as={Link} to={`/courses/${course.id}`} key={course.id}>
                <Image
                  src={`/assets/domainImages/${course.domain}.jpg`}
                  style={{ minHeight: 100, objectFit: 'cover' }}
                />
                <Card.Content>
                  <Card.Header content={course.title} textAlign='center' />
                  <Card.Meta textAlign='center'>
                    <div>{format(course.date, 'dd MMM yyyy')}</div>
                    <div>{format(course.date, 'hh:mm a')}</div>
                  </Card.Meta>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
}