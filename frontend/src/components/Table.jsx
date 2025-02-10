import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

function TableData({ columns, data }) {
  return (
    <TableContainer
      component={Paper}
      className="shadow-md rounded-xl overflow-hidden"
    >
      <Table>
        <TableHead>
          <TableRow className="bg-[#F7F1FF]">
            {columns.map((column) => (
              <TableCell
                key={column.id}
                sx={{
                    fontSize: "1.6rem",
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "#000",
                    py: 3,
                  }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={index}
              className="hover:bg-gray-100 transition duration-300"
            >
              {columns.map((column) => (
                <TableCell key={column.id} sx={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "#000",
                    py: 2,
                  }}>
                  {row[column.id]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableData;
