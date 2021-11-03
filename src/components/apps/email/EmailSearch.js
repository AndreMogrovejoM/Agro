import React from "react";
import { emailSearch } from "../../../redux/email/Action";
import { useSelector, useDispatch } from "react-redux";
import { Box, Button } from "@material-ui/core";
import FeatherIcon from "feather-icons-react";

import { CustomTextField } from "../../forms/custom-elements/CustomTextField";

const EmailSearch = (props) => {
  const searchTerm = useSelector((state) => state.emailReducer.emailSearch);

  const dispatch = useDispatch();

  return (
    <Box display="flex" sx={{ p: 2 }}>
      <Button
        variant="contained"
        onClick={props.onClick}
        color="secondary"
        size="small"
        sx={{ mr: 1, display: { xs: "block", lineHeight: "10px", lg: "none" } }}
      >
        <FeatherIcon icon="menu" width="16" />
      </Button>
      <CustomTextField
        id="outlined-basic"
        inputProps={{ 'aria-label': 'Search emails' }}
        fullWidth
        size="small"
        value={searchTerm}
        placeholder="Search emails"
        variant="outlined"
        onChange={(e) => dispatch(emailSearch(e.target.value))}
      />
    </Box>
  );
};

export default EmailSearch;
