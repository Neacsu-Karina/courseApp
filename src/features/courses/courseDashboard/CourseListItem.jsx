import React from "react";
import { Card, Image } from "semantic-ui-react";

import { Link } from "react-router-dom";

import { format } from "date-fns";

export default function CourseListItem({ course }) {
  return (
    <Card.Group itemsPerRow={1}>
      <Card as={Link} to={`/courses/${course.id}`} key={course.id}>
        <Image
          src={`/assets/domainImages/${course.domain}.jpg`}
          style={{ minHeight: 100, objectFit: "cover" }}
        />
        <Card.Content>
          <Card.Header content={course.title} textAlign="center" />
           <Card.Meta textAlign="center">
            <p> (Data cand a fost creat cursul)</p>
          </Card.Meta> 
        </Card.Content>
      </Card>
    </Card.Group>
  );
}
