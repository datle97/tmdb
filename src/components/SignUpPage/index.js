import { Container, Grid } from "@material-ui/core";

import Benefits from "./Benefits";
import SignUpForm from "./SignUpForm";

const SignUpPage = () => {
  return (
    <Container>
      <Grid container spacing={3}>
        <Benefits />
        <SignUpForm />
      </Grid>
    </Container>
  );
};

export default SignUpPage;
