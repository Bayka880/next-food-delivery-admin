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
import { useRouter } from "next/router";

type Category = {
  id: Number;
  name: String;
  color: String;
};

export default function BasicTable({ categoriesdata }: any) {
  const [categories, setGategories] = useState<Category[]>([]);
  console.log(categories);
  useEffect(() => {
    setGategories(categoriesdata);
  }, []);
  const router = useRouter();
  const deleteCategory = (idNumber: Number) => {
    axios
      .delete("http://localhost:3001/category/delete", {
        data: { id: idNumber },
      })
      .then((res) => {
        if (res.statusText == "OK") {
          axios
            .get("http://localhost:3001/category")
            .then((res) => res.data.data)
            .then((data) => setGategories(data))
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getId = (rowid: Number) => {
    router.push(`/category/edit/${rowid}`);
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
              <Link href="/addCategory">Add category</Link>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categoriesdata &&
            categoriesdata.map((row: any, i: number) => (
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
                  <Button variant="outlined" onClick={() => getId(row.id)}>
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
