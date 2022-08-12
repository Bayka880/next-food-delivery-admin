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
import { useRouter } from "next/router";
import React from "react";
interface State {
  password: String;
  showPassword: boolean;
}
export default function login() {
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
  const router = useRouter();
  const handleLogin = (e: any) => {
    e.preventDefault();
    console.log(e.target.email.value);
    axios
      .post("http://localhost:3001/user/login", {
        email: e.target.email.value,
        password: e.target.password.value,
      })
      .then((res) => {
        if (res.statusText == "OK") {
          const data = {
            email: res.data.data.email,
            firstName: res.data.data.firstName,
            address: res.data.data.address,
            phoneNumber: res.data.data.phoneNumber,
            token: res.data.token,
          };
          console.log(res);
          localStorage.setItem("user", JSON.stringify(data));
          router.push("foods");
        }
      });
  };
  return (
    <Box
      component="form"
      onSubmit={(e: any) => handleLogin(e)}
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="standard-basic"
          label="E-mail"
          name="email"
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
      <Button type="submit">Login</Button>
    </Box>
  );
}
