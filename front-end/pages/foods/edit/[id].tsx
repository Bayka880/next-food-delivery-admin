import {
  Box,
  Button,
  MenuItem,
  NativeSelect,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import React, { Key } from "react";

type Food = {
  name: String;
  price: Number;
  ingredients: String;
  stock: Number;
  discount: Number;
  image: String;
  portion: Number;
  thumb_image: String;
  catId: Number;
};
type Category = {
  id: string | number | readonly string[] | undefined;
  name: String;
  color: String;
};
export default function food({ foods, cat }: any) {
  const router = useRouter();
  const updateFood = (e: any) => {
    e.preventDefault();
    const cat = parseInt(e.target[8].value);
    console.log(typeof cat);

    axios
      .put("http://localhost:3001/foods/update", {
        id: foods[0].id,
        name: e.target.name.value,
        price: e.target.price.value,
        ingredients: e.target.ingredients.value,
        stock: e.target.stock.value,
        discount: e.target.discount.value,
        image: e.target.image.value,
        portion: e.target.portion.value,
        thumb_image: e.target.thumb.value,
        categoryID: cat,
      })
      .then((res) => {
        if (res.statusText == "OK") {
          console.log("update success");
          router.push("/foods");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h1 style={{ color: "black" }}>Food</h1>
      <Box
        component="form"
        onSubmit={(e: any) => updateFood(e)}
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <TextField
            id="standard-basic"
            label="Name"
            variant="standard"
            name="name"
            defaultValue={foods[0].name}
          />
          <TextField
            id="standard-basic"
            label="Price"
            variant="standard"
            name="price"
            defaultValue={foods[0].price}
          />
          <TextField
            id="standard-basic"
            label="Ingredients"
            variant="standard"
            name="ingredients"
            defaultValue={foods[0].ingredients}
          />
          <TextField
            id="standard-basic"
            label="Stock"
            variant="standard"
            name="stock"
            defaultValue={foods[0].stock}
          />
          <TextField
            id="standard-basic"
            label="discount"
            variant="standard"
            name="discount"
            defaultValue={foods[0].discount}
          />
          <TextField
            id="standard-basic"
            label="Image"
            variant="standard"
            name="image"
            defaultValue={foods[0].image}
          />
          <TextField
            id="standard-basic"
            label="Portion"
            variant="standard"
            name="portion"
            defaultValue={foods[0].portion}
          />
          <TextField
            id="standard-basic"
            label="Thumb-image"
            variant="standard"
            name="thumb"
            defaultValue={foods[0].thumb_image}
          />

          <NativeSelect
            defaultValue={foods[0].categoryID}
            name="categoryId"
            inputProps={{
              name: "category",
              id: "uncontrolled-native",
            }}
          >
            {cat.map((c: Category, i: Key) => {
              return (
                <option key={i} value={c.id}>
                  {c.name}
                </option>
              );
            })}
          </NativeSelect>
          <Button type="submit">Update food</Button>
        </div>
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
