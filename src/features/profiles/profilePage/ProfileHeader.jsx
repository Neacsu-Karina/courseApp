import React from 'react';
import { Item, Grid, Segment, Header } from 'semantic-ui-react';
export default function ProfileHeader({profile}){
    return(
        <Segment>
            <Grid>
                <Grid.Column width={12}>
                    <Item.Group>
                        <Item>
                            <Item.Image avatar size='small' src={profile.photoURL || '/assets/user.png'} />
                            <Item.Content verticalAlign='middle'>
                                <Header as='h1' style={{display:'block', marginBottom:10}} 
                                content={profile.displayName} />

                            </Item.Content>
                        </Item>
                    </Item.Group>

                </Grid.Column>
            </Grid>
        </Segment>
    )
}