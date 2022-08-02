import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

type Category = {
  id: Number;
  name: String;
  color: String;
};

export default function BasicTable() {
  const [categories, setGategories] = useState<Category[]>([]);
  console.log(categories);
  useEffect(() => {
    axios
      .get("http://localhost:3001/category")
      .then((res) => res.data.data)
      .then((data) => setGategories(data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteCategory = (idNumber: Number) => {
    axios
      .delete("http://localhost:3001/category/delete", {
        data: { id: idNumber },
      })
      .then((res) => {
        if (res.statusText == "OK") {
          console.log("roj");
          setGategories([...categories]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getId = (rowid: Number, rowname: String, rowcolor: String) => {
    let obj = {
      id: rowid,
      name: rowname,
      color: rowcolor,
    };
    localStorage.setItem("id", JSON.stringify(obj));
    location.href = "http://localhost:3000/update";
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Color</TableCell>
            <TableCell align="right">
              <Link href="http://localhost:3000/addCategory">Add category</Link>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories &&
            categories.map((row, i) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.color}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    onClick={(id) => deleteCategory(row.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    onClick={() => getId(row.id, row.name, row.color)}
                  >
                    Update
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
