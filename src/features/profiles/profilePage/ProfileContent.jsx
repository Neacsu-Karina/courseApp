import React from 'react';
import { Tab } from 'semantic-ui-react';
import AboutTab from './AboutTab';

export default function ProfileContent({profile, isCurrentUser}){
    const panes=[
    {menuItem: 'About', render: () => <AboutTab profile={profile} isCurrentUser={isCurrentUser}/>},
        {menuItem: 'Photos', render: () => <Tab.Pane>Photos</Tab.Pane>},
        {menuItem: 'Courses', render: () => <Tab.Pane>Courses</Tab.Pane>},
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