import * as React from "react";
import { Button, Container } from "@mui/material";
import axios from "axios";
import type { NextPage } from "next";
import Foodtable from "../components/foodtable";
import { useRouter } from "next/router";
interface Props {
  foods?: {
    FoodId: Number;
    FoodName: String;
    foodPrice: String;
    foodIngredients: String;
    foodStock: Number;
    foodDiscount: Number;
    foodImage: String;
    foodPortion: Number;
    foodThumbImage: String;
    categoryId: Number;
    categoryName: String;
    categoryColor: String;
  };
}
const foods: NextPage<Props> = ({ foods }) => {
  const router = useRouter();
  return (
    <Container maxWidth="xl">
      <h1 style={{ color: "black" }}> Foods page</h1>
      <Button variant="outlined" onClick={() => router.push("/category")}>
        Category page
      </Button>
      <Foodtable foods={foods} />
    </Container>
  );
};
export default foods;

foods.getInitialProps = async (ctx: any) => {
  const res = await axios.get("http://localhost:3001/foods");
  const json = await res.data.data;
  console.log(json);
  return { foods: json };
};
