import * as React from "react";
import Button from "@mui/material/Button";
import CategotyTable from "../components/CatgoryTable";
import { Container } from "@mui/material";
const category = () => {
  return (
    <Container maxWidth="lg">
      <h1>All categories page</h1>
      <Button variant="contained">Hello World</Button>
      <CategotyTable />
    </Container>
  );
};
export default category;
