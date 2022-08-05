import React from "react";
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
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  foods: {
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
type Food = {
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
export default function Foodtable({ foods }: any) {
  const router = useRouter();
  const [foodsdata, setFoodsData] = useState<Food[]>([]);
  useEffect(() => {
    setFoodsData(foods);
  }, []);
  const deleteFood = (foodId: any) => {
    axios
      .delete("http://localhost:3001/foods/delete", {
        data: {
          id: foodId,
        },
      })
      .then((res) => {
        if (res.statusText == "OK") {
          axios
            .get("http://localhost:3001/foods")
            .then((res) => res.data.data)
            .then((data) => setFoodsData(data))
            .catch((err) => console.error(err));
        }
      })
      .catch((err) => console.error(err));
  };
  const getId = (e: any) => {
    router.push(`/foods/edit/${e}`);
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Id</TableCell>
            <TableCell align="right">Food name</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Ingredients</TableCell>
            <TableCell align="right">Stock</TableCell>
            <TableCell align="right">Discount</TableCell>
            <TableCell align="right">Image</TableCell>
            <TableCell align="right">Portion</TableCell>
            <TableCell align="right">Thumb-Image</TableCell>
            <TableCell align="right">Category Id</TableCell>
            <TableCell align="right">Category name</TableCell>
            <TableCell align="right">Category color</TableCell>
            <TableCell align="right">
              <Link href="/addCategory">Add category</Link>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {foodsdata &&
            foodsdata.map((row: any, i: number) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">{row.FoodId}</TableCell>
                <TableCell align="right">{row.FoodName}</TableCell>
                <TableCell align="right">{row.foodPrice}</TableCell>
                <TableCell align="right">{row.foodIngredients}</TableCell>
                <TableCell align="right">{row.foodStock}</TableCell>
                <TableCell align="right">{row.foodDiscount}</TableCell>
                <TableCell align="right">{row.foodImage}</TableCell>
                <TableCell align="right">{row.foodPortion}</TableCell>
                <TableCell align="right">{row.foodThumbImage}</TableCell>
                <TableCell align="right">{row.categoryId}</TableCell>
                <TableCell align="right">{row.categoryName}</TableCell>
                <TableCell align="right">{row.categoryColor}</TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="delete"
                    size="large"
                    onClick={(foodId) => deleteFood(row.FoodId)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  <Button variant="outlined" onClick={() => getId(row.FoodId)}>
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
