import { Container } from "@material-ui/core";
import Content from "./Content";
import LoginForm from "./LoginForm";

const LoginPage = () => {
  return (
    <Container>
      <Content />
      <LoginForm />
    </Container>
  );
};

export default LoginPage;
