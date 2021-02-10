import React, { useState } from 'react';
import { LoadingScreen } from 'components/index';
import { Container, Grid, Card, Avatar, CardContent, Typography, useTheme } from '@material-ui/core';
import { ElementHelper } from 'helpers/index';

const TeamMemberCard = (props) => {
  const theme = useTheme();
  let member = (
    <Grid item xs={12} md={6}>
      <Card>
        <CardContent>
          <Grid container spacing={0}>
            <Grid item xs={3}>
              <Avatar
                style={{
                  width: theme.spacing(10),
                  height: theme.spacing(10),
                }}
                src={props.member.image}
                alt={props.member.name}
              />
            </Grid>
            <Grid item xs={9}>
              <h2>{props.member.name}</h2>
              <p className="title">{props.member.position}</p>
              <p>{props.member.description}</p>
              <p>{props.member.email}</p>
            </Grid>

          </Grid>

        </CardContent>
      </Card>

    </Grid>
  );
  return member;
};

export const Team = () => {
  const [teamMembers] = useState([{
    name: 'John Doe',
    position: 'Leader',
    description: 'Important Asset to company',
    email: 'johndoe@company.com',
    image: 'https://themes.themewaves.com/nuzi/wp-content/uploads/sites/4/2013/05/Team-Member-3.jpg'
  },
  {
    name: 'John Doe',
    position: 'Leader',
    description: 'Important Asset to company',
    email: 'johndoe@company.com',
    image: 'https://themes.themewaves.com/nuzi/wp-content/uploads/sites/4/2013/05/Team-Member-3.jpg'
  },
  {
    name: 'John Doe',
    position: 'Leader',
    description: 'Important Asset to company',
    email: 'johndoe@company.com',
    image: 'https://themes.themewaves.com/nuzi/wp-content/uploads/sites/4/2013/05/Team-Member-3.jpg'
  }
  ]);

  console.log('Team Loaded');

  if (teamMembers === undefined) return <LoadingScreen />;

  let content = (
    <Container style={{ marginTop: ElementHelper.isItDesktop() ? '10%' : '20%' }}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant='h3' style={{ color: 'white' }}>
            Our Team
          </Typography>
        </Grid>
        {
          teamMembers.map((member, i) => <TeamMemberCard member={member} key={`member${i}`} />)
        }
      </Grid>
    </Container>
  );

  return content;
};