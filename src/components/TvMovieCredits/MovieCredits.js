import React from "react";
import { Container, Grid, Typography } from "@material-ui/core";

import PersonCard from "./PersonCard";

const MovieCredits = ({ cast, crew }) => {
  return (
    <Container>
      <Grid container>
        <Grid item md={6} xs={12}>
          <Typography variant="h6" gutterBottom>
            Cast
          </Typography>
          {cast.map((person) => (
            <PersonCard key={person.name} person={person} />
          ))}
        </Grid>
        <Grid item md={6} xs={12}>
          <Typography variant="h6" gutterBottom>
            Crew
          </Typography>
          {crew.map((person) => (
            <React.Fragment key={person.department}>
              <Typography>
                <b>{person.department}</b>
              </Typography>
              {person.data.map((person, index) => (
                <PersonCard
                  key={person.id + index}
                  person={{ ...person, character: person.job }}
                />
              ))}
            </React.Fragment>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default MovieCredits;
