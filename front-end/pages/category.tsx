import * as React from "react";
import Button from "@mui/material/Button";
import CategotyTable from "../components/CatgoryTable";
import { Container } from "@mui/material";
import axios from "axios";
import type { NextPage } from "next";
interface Props {
  categoriesdata?: {
    id: Number;
    name: String;
    color: String;
  };
}
const category: NextPage<Props> = ({ categoriesdata }) => {
  return (
    <Container maxWidth="lg">
      <h1>All categories page</h1>
      <Button variant="contained">Hello World</Button>
      <CategotyTable categoriesdata={categoriesdata} />
    </Container>
  );
};
export default category;
category.getInitialProps = async (ctx: any) => {
  const res = await axios.get("http://localhost:3001/category");
  const json = await res.data.data;
  console.log(json);
  return { categoriesdata: json };
};
