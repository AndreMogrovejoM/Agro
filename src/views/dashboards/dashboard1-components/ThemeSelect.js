import React from "react";
import { experimentalStyled as styled } from "@material-ui/core/styles";

import { Select, MenuItem, InputBase } from "@material-ui/core";
// na
const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "&  .MuiInputBase-root": {
    borderRadius: "5px",
  },
  "& .MuiInputBase-input": {
    backgroundColor:
      theme.palette.mode === "light"
        ? theme.palette.primary.light
        : theme.palette.grey.A400,
    borderRadius: 5,
    fontSize: 15,
    padding: "8px 33px 8px 16px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
  },
}));

const ThemeSelect = (props) => {
  const [age, setAge] = React.useState("10");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <>
      {props.clients ? (
        <div />
      ) : (
        <div>
          {props.showDate ? (
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              onChange={handleChange}
              input={<BootstrapInput />}
            >
              <MenuItem value={10}>March 2021</MenuItem>
              <MenuItem value={20}>April 2021</MenuItem>
              <MenuItem value={30}>May 2021</MenuItem>
            </Select>
          ) : (
            <div />
          )}
        </div>
      )}
    </>
  );
};

export default ThemeSelect;
