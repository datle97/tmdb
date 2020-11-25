import { Box, CircularProgress } from "@material-ui/core";

const Loading = () => {
  return (
    <Box
      display="flex"
      height="90vh"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress />
    </Box>
  );
};

export default Loading;
