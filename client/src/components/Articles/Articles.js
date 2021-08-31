import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import CardActions from "@material-ui/core/CardActions";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import {
  getAllArticles,
  addArticle,
  deleteArticle,
} from "../../services/ArticleService";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(12, 4),
  },
  articles: {
    display: "flex",
    flexDirection: "row",
    padding: "20px",
    margin: "auto",
    justifyContent: "center",
  },
  addPost: {
    display: "flex",
    flexDirection: "column",
    padding: "30px",
    margin: "auto",
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
  },
  card: {
    height: "100%",
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
  button: {
    margin: theme.spacing(1),
    marginLeft: theme.spacing(3),
  },
  pos: {
    marginBottom: 12,
    marginLeft: 15,
  },
  flexBottom: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  date: {
    marginTop: theme.spacing(3),
    marginRight: theme.spacing(3),
  },
}));

const Articles = ({ user }) => {
  const classes = useStyles();

  const title = React.useRef(null);
  const content = React.useRef(null);
  const [articles, setArticle] = useState([]);
  useEffect(() => {
    getAllArticlesForCards();
  }, []);

  const getAllArticlesForCards = async () => {
    const response = await getAllArticles();
    setArticle(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const date = new Date();
    const data = {
      title: title.current.value,
      content: content.current.value,
      created_at: date.toString(),
      author_id: user.id,
      author_name: user.name,
    };

    try {
      const response = await addArticle(data);
      if (response.success) {
        getAllArticlesForCards();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return new Date(dateString).toLocaleDateString(options);
  };

  const deleteArticleByUser = async (id) => {
    const response = await deleteArticle(id);
    console.log(response);
    if (response.success) {
      getAllArticlesForCards();
    }
  };

  return (
    <div>
      <div className={classes.addPost}>
        <form key={"haha"} className={classes.form} onSubmit={handleSubmit}>
          <h2>Add a new blog post</h2>
          <TextField
            variant="outlined"
            margin="dense"
            size="small"
            required
            fullWidth
            id="title"
            label="Blog title"
            name="title"
            autoComplete="title"
            inputRef={title}
          />
          <TextField
            variant="outlined"
            margin="dense"
            multiline
            minRows={3}
            required
            fullWidth
            id="content"
            label="Blog content"
            name="content"
            autoComplete="content"
            inputRef={content}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Post
          </Button>
        </form>
      </div>
      <div className={classes.articles}>
        <Container component="section" maxWidth="lg" className={classes.root}>
          <Grid container spacing={3} alignItems="stretch">
            {articles
              .slice(0)
              .reverse()
              .map((article) => (
                <Grid item xs={12} sm={4} key={articles.indexOf(article)}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography
                        variant="h5"
                        component="h3"
                        className={classes.title}
                      >
                        {article.title}
                      </Typography>
                      <Typography className={classes.pos} color="textSecondary">
                        {article.author_name}
                      </Typography>
                      <Typography className={classes.featureList}>
                        {article.content}
                      </Typography>
                    </CardContent>
                    <div className={classes.flexBottom}>
                      <CardActions>
                        <Button
                          variant="contained"
                          color="secondary"
                          className={classes.button}
                          startIcon={<DeleteIcon />}
                          onClick={() => deleteArticleByUser(article.id)}
                          disabled={user.id !== article.author_id}
                        >
                          Delete
                        </Button>
                      </CardActions>
                      <Typography className={classes.date}>
                        {formatDate(article.created_at)}
                      </Typography>
                    </div>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Container>
      </div>
    </div>
  );
};
export default Articles;
