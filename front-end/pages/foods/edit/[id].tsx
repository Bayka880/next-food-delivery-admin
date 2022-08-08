import { Box, Button, MenuItem, Select, TextField } from "@mui/material";
import axios from "axios";
import React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import { SelectChangeEvent } from "@mui/material/Select";

export default function food({ foods, cat }: any) {
  console.log(cat);
  const updateFood = (e: any) => {
    const name = e.target.name.value;
    console.log(name);
  };
  const [personName, setPersonName] = React.useState<string[]>([]);
  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
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
          {/* <Select labelId="label" id="select" value="20">
            {cat.map((c: any) => {
              return (
                <MenuItem key={c.id} value={c.id}>
                  {c.name}
                </MenuItem>
              );
            })}
          </Select> */}
          <Select
            multiple
            displayEmpty
            value={personName}
            onChange={handleChange}
            input={<OutlinedInput />}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <em>Placeholder</em>;
              }

              return selected;
            }}
            // MenuProps={MenuProps}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem disabled value="">
              <em>Placeholder</em>
            </MenuItem>
            {cat.map((c: any) => (
              <MenuItem
                key={c.id}
                value={c.id}
                // style={getStyles(name, personName, theme)}
              >
                {c.name}
              </MenuItem>
            ))}
          </Select>

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
