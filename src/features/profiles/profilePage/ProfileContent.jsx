import React from 'react';
import { Tab } from 'semantic-ui-react';
import AboutTab from './AboutTab';
import PhotosTab from './PhotosTab';
import CoursesTab from './CoursesTab';

export default function ProfileContent({profile, isCurrentUser}){
    const panes=[
    {menuItem: 'About', render: () => <AboutTab profile={profile} isCurrentUser={isCurrentUser}/>},
    {menuItem: 'Photos', render: () => <PhotosTab profile={profile} isCurrentUser={isCurrentUser} />},
        {menuItem: 'Courses', render: () => <CoursesTab profile={profile}  />},
    ]
    return(
        <Tab
        //className='ui pointing secondary menu'
        menu={{fluid: true, vertical:true}}
        menuPosition='right'
        panes={panes}
       
        
        />
    )

    
}