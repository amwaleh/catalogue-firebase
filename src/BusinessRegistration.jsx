import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Paper from "@material-ui/core/Paper";
import app from "./base.js";

const useStyles = makeStyles((theme) => ({
  formBody: {
    display: "flex"
    // minHeight: "100vh"
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
  },
  formSpacing: { marginTop: "2rem" }
}));
const Fields = [
  {
    name: "business_name",
    label: "Business Name",
    required: true
  },
  {
    name: "website",
    label: "Link to website",
    required: true
  },
  {
    name: "Country",
    label: "Where are you base of",
    required: true
  }
];
export default function BasicTextFields() {
  const classes = useStyles();
  const niche = [
    "Home Furnishing",
    "Jewelery",
    "Textiles",
    "Apparel",
    "Furniture",
    "Lamps & lighting",
    "Serveware",
    "Art & painting",
    "Decor Objects",
    "Rugs & Carpets"
  ];
  const defaultNiche = niche.reduce((obj, n) => {
    obj[n] = false;
    return obj;
  }, {});
  const [values, setValue] = React.useState({});
  const [nichen, setNiche] = React.useState({ ...defaultNiche });
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValues = { ...values, [name]: value };
    setValue(newValues);
  };
  const handleNiche = (e) => {
    const { name } = e.target;
    const newNiche = {
      ...nichen,
      [name]: !nichen[name]
    };

    setNiche(newNiche);
  };
  const handleSubmit = React.useCallback(async (event) => {
    const red = app.firestore().collection("business");

    try {
      await red.add(values)
      red.onSnapshot((querySnapShot) => {
        const items = [];
        querySnapShot.forEach((doc) => {
          items.push(doc.data());
        });
        console.log({ items });
      });
    } catch (error) {
      alert(error);
    }
  }, []);

  return (
    <Container maxWidth="md">
      <Grid
        container
        className={classes.formBody}
        justify="center"
        alignItems="center"
      >
        <Grid
          conatiner
          item
          md="10"
          sm="12"
          justify="center"
          component={Paper}
          spacing="4"
          style={{ padding: "20px" }}
        >
          <Paper className={classes.header} elevation="0">
            <Typography variant="h6"> Business Information Form</Typography>
          </Paper>
          <form autoComplete="off" onSubmit={handleSubmit}>
            <Grid container spacing={4} justify="center" sm="12">
              {Fields.map((field) => (
                <Grid item sm={10}>
                  <TextField
                    required={field?.required}
                    name={field.name}
                    label={field.label}
                    type={field?.type}
                    fullWidth
                    onChange={handleChange}
                  />
                </Grid>
              ))}
              <Grid container item md={10} direction="row-reverse">
                <Grid item md={12}>
                  <TextField
                    required
                    name="experience"
                    label={"How many Years have you been in business"}
                    fullWidth
                    onChange={handleChange}
                  />
                </Grid>
                {/* What product category do yoiu operate in? (Check all that
                  apply)? */}
                <Grid item md={12} className={classes.formSpacing}>
                  <FormControl
                    component="fieldset"
                    className={classes.formControl}
                  >
                    <FormLabel component="legend">
                      What product category do yoiu operate in? (Check all that
                      apply)?
                    </FormLabel>
                    <Grid
                      component={FormGroup}
                      container
                      sm={12}
                      style={{ flexFlow: "row", flexWrap: "wrap" }}
                    >
                      {niche.map((n, idx) => (
                        <Grid
                          component={FormControlLabel}
                          style={{ marginRight: 0 }}
                          item
                          sm={6}
                          id={idx}
                          control={
                            <Checkbox
                              value={nichen[n]}
                              checked={nichen[n]}
                              onChange={handleNiche}
                              name={n}
                            />
                          }
                          label={n}
                        />
                      ))}
                    </Grid>
                  </FormControl>
                </Grid>

                <Grid item md={12} className={classes.formSpacing}>
                  <TextField
                    required
                    name="Craft_technique"
                    label={"What crafts and techniques do you work in?"}
                    fullWidth
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item md={12} className={classes.formSpacing}>
                  <FormControl component="fieldset">
                    {/* Are you a  */}
                    <FormLabel component="legend">Are you a </FormLabel>
                    <RadioGroup
                      className={classes.formBody}
                      aria-label="Wholesale_retailer"
                      name="Wholesale_retailer"
                      value={values["Wholesale_retailer"] || ""}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="Wholesale Producer"
                        control={<Radio />}
                        label="Wholesale Producer"
                      />
                      <FormControlLabel
                        value="Retailer"
                        control={<Radio />}
                        label="Retailer"
                      />
                      <FormControlLabel
                        value="Both"
                        control={<Radio />}
                        label="Both"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>

                {values?.Wholesale_retailer &&
                  values?.Wholesale_retailer !== "Wholesale Producer" && (
                    <Grid item md={12}>
                      <FormControl component="fieldset">
                        {/* Are you a /an */}
                        <FormLabel component="legend">Are you a /an</FormLabel>
                        <RadioGroup
                          className={classes.formBody}
                          aria-label="scale"
                          name="scale"
                          value={values["scale"] || ""}
                          onChange={handleChange}
                        >
                          <FormControlLabel
                            value="Independent Designer"
                            control={<Radio />}
                            label="Independent Designer"
                          />
                          <FormControlLabel
                            value="Small scale retailer"
                            control={<Radio />}
                            label="Small scale retailer"
                          />
                          <FormControlLabel
                            value="Large Scale retailer"
                            control={<Radio />}
                            label="Large Scale retailer"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                  )}
                {/* Do you have in-house designer or design team */}

                <Grid container item md={12} direction="column">
                  <FormControl component="fieldset">
                    <FormLabel component="legend">
                      Do you have in-house designer or design team{" "}
                    </FormLabel>
                    <RadioGroup
                      className={classes.formBody}
                      aria-label="Design"
                      name="in_house_design_team"
                      value={values["in_house_design_team"]}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="Yes"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="No"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                {/* Is your manufacturing done in-house or is it out sourced */}
                <Grid item md={12}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">
                      Is your manufacturing done in-house or is it out sourced?{" "}
                    </FormLabel>
                    <RadioGroup
                      className={classes.formBody}
                      aria-label="Design"
                      name="Manufacturing"
                      value={values["Manufacturing"]}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="In-house"
                        control={<Radio />}
                        label="In-house"
                      />
                      <FormControlLabel
                        value="Outsourced"
                        control={<Radio />}
                        label="Outsourced"
                      />
                      <FormControlLabel
                        value="Both"
                        control={<Radio />}
                        label="Both"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>

                {/* Export experience */}
                <Grid container>
                  <Grid item>
                    <Grid item md={12}>
                      {/* Do you have experience exporting */}
                      <FormControl component="fieldset">
                        <FormLabel component="legend">
                          Do you have experience exporting{" "}
                        </FormLabel>
                        <RadioGroup
                          className={classes.formBody}
                          aria-label=""
                          name="Export_experience"
                          value={values["Export_experience"]}
                          onChange={handleChange}
                        >
                          <FormControlLabel
                            value="Yes"
                            control={<Radio />}
                            label="Yes"
                          />
                          <FormControlLabel
                            value="No"
                            control={<Radio />}
                            label="No"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                  </Grid>

                  {values?.Export_experience === "Yes" && (
                    <>
                      <Grid item sm={12}>
                        <FormControl component="fieldset">
                          {/* Are you a /an */}
                          <FormLabel component="legend">Are you a </FormLabel>
                          <RadioGroup
                            className={classes.formBody}
                            aria-label="scale"
                            name="Exporter"
                            value={values["Exporter"]}
                            onChange={handleChange}
                          >
                            <FormControlLabel
                              value="Mainstream Exporter"
                              control={<Radio />}
                              label="Mainstream Exporter"
                            />
                            <FormControlLabel
                              value="Small scale Exporter"
                              control={<Radio />}
                              label="Small scale exporter"
                            />
                            <FormControlLabel
                              value="Large Scale Exporter"
                              control={<Radio />}
                              label="Large Scale exporter"
                            />
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                      <Grid item sm={12}>
                        <TextField
                          name="brands_exported"
                          label={
                            "Please share names of brands you have exported in the past"
                          }
                          fullWidth
                          onChange={handleChange}
                        />
                      </Grid>
                    </>
                  )}
                </Grid>
              </Grid>
              <Grid container item md={8} direction="row-reverse">
                <Button color="primary" variant="contained" type="submit">
                  Submit{" "}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}
