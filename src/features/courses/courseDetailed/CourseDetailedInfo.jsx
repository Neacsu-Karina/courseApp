import React from 'react';
import {Segment, Grid, Icon} from 'semantic-ui-react';
import {format} from 'date-fns';


export default function CourseDetailedInfo({course}) {
    
    return (
        <Segment.Group>
        <Segment attached="top">
            <Grid>
                <Grid.Column width={1}>
                    <Icon size="large" color="teal" name="info"/>
                </Grid.Column>
                <Grid.Column width={15}>
                    <p>{course.description}</p>
                </Grid.Column>
            </Grid>
        </Segment>
        <Segment attached>
            <Grid verticalAlign="middle">
                <Grid.Column width={1}>
                    <Icon name="calendar" size="large" color="teal"/>
                </Grid.Column>
                <Grid.Column width={15}>
                    <span>{format(course.date, 'MMMM d, yyyy h:mm a')}</span>
                </Grid.Column>
            </Grid>
        </Segment>
        <Segment attached>
            <Grid verticalAlign="middle">
            </Grid>
        </Segment>
    </Segment.Group>
    
    )
}