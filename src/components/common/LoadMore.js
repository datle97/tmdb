import { Box, Button, CircularProgress } from "@material-ui/core";

const LoadMore = ({ loading, handleClick }) => {
  return loading ? (
    <Box display="flex" justifyContent="center">
      <CircularProgress />
    </Box>
  ) : (
    <Button
      variant="contained"
      color="primary"
      size="large"
      fullWidth
      onClick={handleClick}
      // tránh lỗi đẩy content lên trên của bottom button
      style={{ overflowAnchor: "none" }}
    >
      Load More
    </Button>
  );
};

export default LoadMore;
