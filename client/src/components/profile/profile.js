import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import config from "../../environments/main";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(12, 4),
  },
  profile: {
    display: "flex",
    flexDirection: "row",
    padding: "20px",
    margin: "auto",
    justifyContent: "center",
  },
  card: {
    height: "400px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "1px solid black",
    borderRadius: "5px",
    textAlign: "center",
  },
  title: {
    padding: theme.spacing(2),
  },
  featureList: {
    padding: theme.spacing(2),
  },
  media: {
    height: 140,
    paddingTop: "56.25%", // 16:9,
    marginTop: "30",
  },
}));

export default function Profile({ users }) {
  const classes = useStyles();

  return (
    <div className={classes.profile}>
      <Container component="section" maxWidth="lg" className={classes.root}>
        <Grid container spacing={3} alignItems="stretch">
          {users.map((user) => (
            <Grid item xs={12} sm={4} key={users.indexOf(user)}>
              <Card>
                {user?.profile_picture && (
                  <CardMedia
                    className={classes.media}
                    image={`${config.baseUrl}uploads/${user?.profile_picture}`}
                    title={`${user?.name.split(" ")[0]}`}
                  />
                )}
                <CardContent>
                  <Typography
                    variant="h5"
                    component="h3"
                    className={classes.title}
                  >
                    {user?.name.split(" ")[0]}
                  </Typography>
                  <Typography className={classes.featureList}>
                    Email: {user?.email}
                  </Typography>
                  <Typography className={classes.featureList}>
                    Phone: {user?.phone}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
