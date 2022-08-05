import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import React from "react";

export default function food({ foods, cat }: any) {
  console.log(foods);
  console.log(cat);
  const updateFood = (e: any) => {};
  return (
    <>
      <h1 style={{ color: "black" }}>Food</h1>cat
      <div></div>
      <Box
        component="form"
        onSubmit={(e: any) => updateFood(e)}
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
          //   defaultValue={category[0].name}
        />
        <TextField
          id="standard-basic"
          label="Price"
          variant="standard"
          name="price"
          //   defaultValue={category[0].color}
        />
        <TextField
          id="standard-basic"
          label="Ingredients"
          variant="standard"
          name="ingredients"
          //   defaultValue={category[0].color}
        />
        <TextField
          id="standard-basic"
          label="Stock"
          variant="standard"
          name="stock"
          //   defaultValue={category[0].color}
        />
        <TextField
          id="standard-basic"
          label="discount"
          variant="standard"
          name="discount"
          //   defaultValue={category[0].color}
        />
        <TextField
          id="standard-basic"
          label="Image"
          variant="standard"
          name="ingredients"
          //   defaultValue={category[0].color}
        />
        <TextField
          id="standard-basic"
          label="Portion"
          variant="standard"
          name="portion"
          //   defaultValue={category[0].color}
        />
        <TextField
          id="standard-basic"
          label="Thumb-image"
          variant="standard"
          name="thumb"
          //   defaultValue={category[0].color}
        />
        <TextField
          id="standard-basic"
          label="CategoryID"
          variant="standard"
          name="catId"
          //   defaultValue={category[0].color}
        />
        <TextField
          id="standard-basic"
          label="Category name"
          variant="standard"
          name="catname"
          //   defaultValue={category[0].color}
        />
        <TextField
          id="standard-basic"
          label="Category color"
          variant="standard"
          name="catcolor"
          //   defaultValue={category[0].color}
        />
        <Button type="submit">Add category</Button>
      </Box>
    </>
  );
}

const callCategories = axios.get("http://localhost:3001/category");
const callFoods = axios.get("http://localhost:3001/foods");

export async function getStaticPaths() {
  const [cats, foods] = await Promise.all([callCategories, callFoods]);
  console.log(cats.data);
  return {
    fallback: false,
    paths: foods.data.data.map((food: any) => ({
      params: {
        id: food.FoodId.toString(),
      },
    })),
  };
}
export async function getStaticProps({ params }: any) {
  const food = await axios.get(`http://localhost:3001/foods/${params.id}`);
  const cat = await axios.get("http://localhost:3001/category");
  const [cats, foodIdData] = await Promise.all([cat, food]);
  return {
    props: { foods: foodIdData.data.data, cat: cats.data.data },
  };
}
