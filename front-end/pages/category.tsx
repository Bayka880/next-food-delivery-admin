import * as React from "react";
import Button from "@mui/material/Button";
import CategotyTable from "../components/CatgoryTable";
import { Container } from "@mui/material";
import axios from "axios";
import type { NextPage } from "next";
import { useRouter } from "next/router";
interface Props {
  categoriesdata?: {
    id: Number;
    name: String;
    color: String;
  };
}
const category: NextPage<Props> = ({ categoriesdata }) => {
  const router = useRouter();
  return (
    <Container maxWidth="lg">
      <h1>All categories page</h1>
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
