import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Input } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
export default function cat({ category }: any) {
  const router = useRouter();

  function addCategory(e: any) {
    e.preventDefault();
    const catId = category[0].id;
    const targetName = e.target.name.value;
    const targerColor = e.target.color.value;
    console.log(targerColor);
    axios
      .put("http://localhost:3001/category/update", {
        id: catId,
        name: targetName,
        color: targerColor,
      })
      .then((res) => {
        if (res.statusText == "OK") {
          router.push("/category");
        }
      })
      .catch((err) => console.log(err));
  }
  return (
    <>
      <h1 style={{ color: "black" }}>One category</h1>
      <Box
        component="form"
        onSubmit={(e: any) => addCategory(e)}
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="standard-basic"
          label="Name"
          variant="standard"
          name="name"
          defaultValue={category[0].name}
        />
        <TextField
          id="standard-basic"
          label="Color"
          variant="standard"
          name="color"
          defaultValue={category[0].color}
        />
        <Button type="submit">Add category</Button>
      </Box>
    </>
  );
}
export async function getStaticPaths() {
  const res = await axios.get("http://localhost:3001/category");
  return {
    fallback: false,
    paths: res.data.data.map((category: any) => ({
      params: {
        id: category.id.toString(),
      },
    })),
  };
}
export async function getStaticProps({ params }: any) {
  const res = await axios.get(`http://localhost:3001/category/${params.id}`);
  return {
    props: { category: res.data.data },
  };
}
