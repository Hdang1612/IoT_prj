import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import formatDate from "../utils/date.js";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getSensorData } from "../redux/data/DataSlice.js";

function TableData({ columns, data }) {
  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState(null);
  const [sortType, setSortType] = useState("ASC");
  const handleSort = (columnId) => {
    // Nếu click cùng một cột, đổi ASC ↔ DESC
    const newSortType =
      sortBy === columnId && sortType === "ASC" ? "DESC" : "ASC";

    setSortBy(columnId);
    setSortType(newSortType);

    // Dispatch action gọi API với sortBy & sortType
    dispatch(getSensorData({ orderBy: columnId, orderType: newSortType }));
  };
  return (
    <TableContainer
      component={Paper}
      className="shadow-md rounded-xl overflowY-auto"
      sx={{ maxHeight: "40rem" }}
    >
      <Table stickyHeader>
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
                  cursor: "pointer",
                }}
                onClick={() => handleSort(column.id)}
              >
                {column.label}{" "}
                <span
                  style={{
                    display: "inline-block",
                    width: 30,
                    textAlign: "center",
                  }}
                >
                  {sortBy === column.id && (
                    <ArrowDropUpRoundedIcon
                      sx={{
                        fontSize: 40,
                        transform:
                          sortType === "DESC" ? "rotate(180deg)" : "none",
                        transition: "transform 0.2s ease-in-out",
                      }}
                    />
                  )}
                </span>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody className="table_body">
          {data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                sx={{
                  textAlign: "center",
                  fontSize: "1.4rem",
                  color: "#888",
                  py: 3,
                }}
              >
                No data available
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, index) => (
              <TableRow
                key={index}
                className="hover:bg-gray-100 transition duration-300"
              >
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    sx={{
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      textAlign: "center",
                      color: "#000",
                      py: 2,
                    }}
                  >
                    {column.id === "timestamp"
                      ? formatDate(row[column.id]) // Định dạng nếu là timestamp
                      : row[column.id]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableData;
