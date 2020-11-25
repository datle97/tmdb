import {
  Typography,
  TableContainer,
  Table,
  TableBody,
  Paper,
} from "@material-ui/core";
import Row from "./Row";

const CreditTable = ({ department, credits }) => {
  return (
    <div>
      <Typography
        variant="subtitle1"
        gutterBottom
        style={{ textTransform: "capitalize" }}
      >
        {department}
      </Typography>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableBody>
            {[...credits]
              .sort((a, b) =>
                // sắp xếp phim không có release_date trước
                !a.release_date
                  ? -1
                  : // sắp xếp theo năm ra mắt giảm dần
                    new Date(b.release_date) - new Date(a.release_date)
              )
              .map((credit, index) => (
                <Row key={credit.credit_id + index} row={credit} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CreditTable;
