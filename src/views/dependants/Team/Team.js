import React, { useState, useEffect } from 'react';
import { LoadingScreen } from 'components/index';
import { Container, Grid, Card, Avatar, CardContent, Typography, useTheme, useMediaQuery, Divider } from '@material-ui/core';
import { API } from 'helpers';


const TeamMemberCard = (props) => {
  const theme = useTheme();
  let member = (
    <Grid item xs={12} md={6}>
      <Card style={{
        width: '100%',
        height: '100%',
        overflow: 'auto'
      }}>
        <CardContent>
          <Grid container spacing={1}>
            <Grid item xs={2}>
              <Avatar
                style={{
                  width: theme.spacing(10),
                  height: theme.spacing(10),
                }}
                src={props.member.photo}
                alt={props.member.name}
              />
            </Grid>
            <Grid item xs={10}>
              <h2>{props.member.name}</h2>
              <p className="title">{props.member.position}</p>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="textSecondary" component="p" dangerouslySetInnerHTML={{ __html: props.member.description }} />
            </Grid>
          </Grid>

        </CardContent>
      </Card>

    </Grid>
  );
  return member;
};

export const Team = () => {
  const [teamMembers, setTeamMembers] = useState();
  let isItDesktop = useMediaQuery('(min-width:600px) and (min-height:600px)');
  useEffect(() => {
    API.getTeamMembers((response) => {
      setTeamMembers(response);
    });
  }, []);

  if (teamMembers === undefined) return <LoadingScreen />;

  let content = (
    <Container style={{ marginTop: isItDesktop ? '7%' : '20%', marginBottom: isItDesktop ? '10%' : '20%' }}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant='h3' style={{ color: 'white' }}>
            Our Team
          </Typography>
        </Grid>
        {
          teamMembers.filter(member => member.isProject !== true).map((member, i) => <TeamMemberCard member={member} key={`member${i}`} />)
        }
        {teamMembers.filter(member => member.isProject === true).length > 0 &&
          <Grid item xs={12}>
            <Typography variant='h3' style={{ color: 'white' }}>
              Our Project Partners
            </Typography>
          </Grid>
        }
        {
          teamMembers.filter(member => member.isProject === true).map((member, i) => <TeamMemberCard member={member} key={`project${i}`} />)
        }
      </Grid>
    </Container>
  );

  return content;
};