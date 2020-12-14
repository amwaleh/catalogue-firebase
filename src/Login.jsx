import React, { useCallback, useContext } from "react";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { withRouter, Redirect } from "react-router";
import app from "./base.js";
import { AuthContext } from "./Auth.js";
import AppBar from "@material-ui/core/AppBar";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  formBody: {
    display: "flex",
    minHeight: "100vh"
  },
  field: {
    padding: "10px"
  },
  header: {
    backgroundColor: "#0c3c5a",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0.5rem",
    color: "#FFF",
    marginBottom: "1rem"
  }
}));
const Fields = [
  {
    name: "email",
    label: "Email",
    required: true
  },
  {
    name: "password",
    label: "password",
    type: "password",
    required: true
  }
];
const Login = (props) => {
  const classes = useStyles();

  const { history } = props;
  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  return (
    <Container maxWidth="md">
      <Grid
        container
        className={classes.formBody}
        justify="center"
        alignItems="center"
        
      >
        <Grid conatiner item md="6" sm="12" justify="center" component={Paper} spacing="4" style={{padding:"20px"}}>
          <Paper className={classes.header} elevation='0'>
            <Typography variant="h6"> Sign in</Typography>
          </Paper>
          <form
            noValidate
            autoComplete="off"
            // className={classes.formBody}
            onSubmit={handleSubmit}
          >
            <Grid container spacing={4} sm="12" >
              {Fields.map((field) => (
                <Grid item sm="12">
                  <TextField
                    required={field?.required}
                    name={field.name}
                    label={field.label}
                    type={field?.type}
                    fullWidth
                    // onChange={handleChange}
                  />
                </Grid>
              ))}
              <Grid container item md={12} direction="row-reverse" justify="space-between">
                <Button color="primary" variant="contained" type="submit">
                  Submit{" "}
                </Button>
                < Link href="/signup" >
                <Button  color="primary" >
                  Sign Up{" "}
                </Button>
</Link>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};
export default withRouter(Login);
