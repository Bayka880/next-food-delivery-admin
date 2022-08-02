import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Input } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

type Category = {
  id: Number;
  name: String;
  color: String;
};
export default function updatecategory() {
  const [data, setData] = useState<Category>();

  useEffect(() => {
    {
      setData(JSON.parse(localStorage.getItem("id") || ""));
    }
  }, []);
  console.log(data);
  const updateCategory = (e: any) => {
    e.preventDefault();
    console.log(e);
    // const targetName = e.target[0].value;
    // const targerColor = e.target[1].value;
    // // axios
    //   .put("http://localhost:3001/category/add", {
    //     name: targetName,
    //     color: targerColor,
    //   })
    //   .then((res) => res.statusText)
    //   .catch((err) => console.log(err));
  };
  function updateName(e: any) {
    e.target.value.remove();
  }
  return (
    <>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        onSubmit={updateCategory}
        autoComplete="off"
      >
        <TextField
          label="Gategory name"
          color="secondary"
          focused
          value={data?.name || ""}
          onChange={(e) => {
            updateName(e);
          }}
        />

        <TextField
          label="Color"
          color="secondary"
          focused
          value={data?.color || ""}
        />
        <Button type="submit">update category</Button>
      </Box>
    </>
  );
}
