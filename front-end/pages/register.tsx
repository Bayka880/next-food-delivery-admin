import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Input,
  InputAdornment,
  TextField,
} from "@mui/material";
import axios from "axios";
import React from "react";

interface State {
  password: String;
  showPassword: boolean;
}
export default function register() {
  const [values, setValues] = React.useState<State>({
    password: "",
    showPassword: false,
  });
  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const addCustomer = (e: any) => {
    console.log(e.target.number.value);
    e.preventDefault();
    axios
      .post("http://localhost:3001/user/register", {
        firstName: e.target.firstName.value,
        lastName: e.target.lastName.value,
        email: e.target.email.value,
        address: e.target.address.value,
        phoneNumber: e.target.number.value,
        user_password: e.target.password.value,
      })
      .then((res) => {
        if (res.statusText == "OK") {
          console.log("success ");
          console.log(res);
        }
      })
      .catch((err) => console.error(err));
  };
  return (
    <Box
      component="form"
      onSubmit={(e: any) => addCustomer(e)}
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="filled-basic"
          label="First name"
          name="firstName"
          variant="standard"
        />
        <TextField
          id="standard-basic"
          label="Last name"
          name="lastName"
          variant="standard"
        />
        <TextField
          id="standard-basic"
          label="E-mail"
          name="email"
          variant="standard"
        />
        <TextField
          id="standart-basic"
          label="Address"
          name="address"
          variant="standard"
        ></TextField>
        <TextField
          id="standard-basic"
          label="Phone number"
          name="number"
          variant="standard"
        />
        <Input
          id="standard-adornment-password"
          type={values.showPassword ? "text" : "password"}
          value={values.password}
          name="password"
          onChange={handleChange("password")}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {values.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </div>
      <Button type="submit">Register</Button>
    </Box>
  );
}
