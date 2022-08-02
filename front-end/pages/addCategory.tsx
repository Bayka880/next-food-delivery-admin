import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import axios from "axios";

export default function addcategory() {
  const addCategory = (e: any) => {
    e.preventDefault();
    const targetName = e.target[0].value;
    const targerColor = e.target[1].value;
    axios
      .post("http://localhost:3001/category/add", {
        name: targetName,
        color: targerColor,
      })
      .then((res) => console.log(res.status))
      .catch((err) => console.log(err));
  };
  return (
    <Box
      component="form"
      onSubmit={(e: any) => addCategory(e)}
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="filled-basic" label="Name" variant="filled" />
      <TextField id="standard-basic" label="Color" variant="standard" />
      <Button type="submit">Add category</Button>
    </Box>
  );
}
