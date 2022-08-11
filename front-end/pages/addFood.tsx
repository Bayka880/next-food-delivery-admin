import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import React, { Key } from "react";

export default function addFood({ catgories }: any) {
  const [catId, setCat] = React.useState("");
  const router = useRouter();
  const handleChange = (event: SelectChangeEvent) => {
    console.log(event);
    setCat(event.target.value);
  };
  const addFood = (e: any) => {
    e.preventDefault();
    const stringToNumber = parseInt(catId);
    axios
      .post("http://localhost:3001/foods/addfood", {
        name: e.target.name.value,
        price: e.target.price.value,
        ingredients: e.target.ingredients.value,
        stock: e.target.stock.value,
        categoryID: stringToNumber,
        discount: e.target.discount.value,
        image: e.target.image.value,
        portion: e.target.portion.value,
        thumb_image: e.target.thumbImage.value,
      })
      .then((res) => {
        if (res.statusText == "OK") {
          console.log("add food success");
          router.push("/foods");
        }
      })
      .catch((err) => console.error(err));
  };
  return (
    <>
      <div style={{ color: "black" }}>addFood</div>
      <Box
        component="form"
        onSubmit={(e: any) => addFood(e)}
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div style={{ textAlign: "center" }}>
          <TextField
            id="filled-basic"
            label="Name"
            variant="standard"
            name="name"
          />
          <TextField
            id="standard-basic"
            label="Price"
            variant="standard"
            name="price"
          />
          <TextField
            id="standard-basic"
            label="Ingredients"
            variant="standard"
            name="ingredients"
          />
          <TextField
            id="standard-basic"
            label="Stock"
            variant="standard"
            name="stock"
          />
          <InputLabel id="demo-simple-select-autowidth-label">
            Choose category
          </InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={catId}
            onChange={handleChange}
            style={{ color: "black", width: "200px" }}
          >
            {catgories.map((cat: any, i: Key) => {
              return (
                <MenuItem key={i} value={cat.id}>
                  {cat.name}
                </MenuItem>
              );
            })}
          </Select>
          <TextField
            id="standard-basic"
            label="Discount"
            variant="standard"
            name="discount"
          />
          <TextField
            id="standard-basic"
            label="Image"
            variant="standard"
            name="image"
          />
          <TextField
            id="standard-basic"
            label="Portion"
            variant="standard"
            name="portion"
          />
          <TextField
            id="standard-basic"
            label="Thumb Image"
            variant="standard"
            name="thumbImage"
          />
          <Button type="submit">Add Food</Button>
        </div>
      </Box>
    </>
  );
}
export async function getStaticProps() {
  const cat = await axios.get("http://localhost:3001/category");
  const json = await cat.data.data;
  return {
    props: { catgories: json },
  };
}
