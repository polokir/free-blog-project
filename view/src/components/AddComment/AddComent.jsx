import React from "react";

import styles from "./AddComent.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

export const AddComment = () => {
  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src="https://mui.com/static/images/avatar/5.jpg"
        />
        <div className={styles.form}>
          <TextField
            label="Залишити коментар"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
          />
          <Button variant="contained">Відправити</Button>
        </div>
      </div>
    </>
  );
};
export default AddComment;
