import React from 'react';
import { Menu, Header } from 'semantic-ui-react';
import {Calendar} from 'react-calendar';

export default function CourseFilters() {
    return (
        <>
            <Menu vertical size='large' style={{width: '100%'}}>
                <Header icon='filter' attached color='teal' content='Filters' />
                <Menu.Item content='All Courses' />
                <Menu.Item content="I'm going" />
                <Menu.Item content="I'm hosting" />
            </Menu>
            <Header icon='calendar' attached color='teal' content='Select date' />
            <Calendar />
        </>
    )
}