import {
  Alert,
  AlertTitle,
  Avatar,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Rating,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useState } from "react";
import Image from "next/image";
import { Wave } from "react-animated-text";
import { useLocalStorage } from "@rehooks/local-storage";
import { contextStore } from "../../utils/Store";
import { useRouter } from "next/router";
export default function Slug({ product }) {
  const [showSnkber, setShowSnkber] = useState(false);
  const [show, setShow] = useState(false);
  const [rating, setRating] = useState();
  const [comment, setComment] = useState();
  const [showLoading, setShowLoading] = useState(false);
  const [userInfo] = useLocalStorage("userInfo");
  const { dispatch } = useContext(contextStore);
  const router = useRouter();
  //reviews and  rating calculate
  let newReview = product.reviews.length;
  let count = product.reviews.reduce((a, c) => a + Number(c.rating), 0);

  //submit comment
  const submitRaview = async () => {
    let ratingCount = (count + rating) / (newReview + 1);
    let newRating = Math.floor(ratingCount);
    try {
      setShowLoading(true);
      const { data } = await axios.post("/api/user/reviewAndRatting", {
        id: product._id,
        rating: newRating,
        numOfReviews: newReview + 1,
        name: userInfo.name,
        rating: rating,
        comment: comment,
      });
      alert(data);
      window.location.reload();
    } catch (error) {
      setShowLoading(false);
    }
  };
  //add to cart

  const AddToCart = (item) => {
    item.qty = 1;
    dispatch({ type: "ADD_TO_CART", payload: item });

    setShowSnkber(true);
  };
  return (
    <Container sx={{ marginTop: "40px", marginBottom: "25px" }}>
      <Grid container spacing={2}>
        <Grid
          item
          sx={{
            width: { xs: "100%", sm: "60%", md: "70%" },
          }}
        >
          <Image
            src={product.img}
            alt={product.name}
            width={400}
            height={400}
            quality={100}
          />
        </Grid>
        <Grid
          item
          sx={{
            width: { xs: "100%", sm: "40%", md: "30%" },
          }}
        >
          <Card variant="outlined">
            <CardContent>
              <List dense={true}>
                <ListItem>
                  <ListItemText>
                    <strong>Name:</strong> {product.name}
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>
                    {" "}
                    <strong>Price:</strong> {"$" + product.price}
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>
                    <strong>Status:</strong>
                    {product.stock > 0 ? (
                      <Typography component={"span"} color="green">
                        {" "}
                        Stock in
                      </Typography>
                    ) : (
                      <Typography component={"span"} color="red">
                        Out of stock
                      </Typography>
                    )}
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>
                    {" "}
                    <strong>Description:</strong> {product.des}
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>
                    <Typography component={"span"}>
                      <strong>Rating:</strong> <Rating value={product.rating} />
                    </Typography>
                  </ListItemText>
                </ListItem>
              </List>
            </CardContent>
            <CardActions>
              {product.stock > 0 ? (
                <Button
                  sx={{ background: "#FFDA00", color: "#000000" }}
                  fullWidth
                  variant="outlined"
                  onClick={() =>
                    AddToCart({
                      name: product.name,
                      price: product.price,
                      qty: product.qty,
                      img: product.img,
                      product: product._id,
                    })
                  }
                >
                  Add to cart
                </Button>
              ) : (
                <Alert severity="info">
                  <AlertTitle>Info</AlertTitle>
                  We are working to get back this product in stock —{" "}
                  <strong>Thank you!</strong>
                </Alert>
              )}
              <Button
                sx={{ background: "#FFDA00", color: "#000000" }}
                fullWidth
                variant="outlined"
                onClick={() => router.push("/your-cart")}
              >
                View Cart
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <Stack spacing={3} paddingTop={15}>
        <Typography variant="bold" component="h1" textAlign="center" py="40px">
          <Wave text="Ratting and Reviews" effect="stretch" effectChange={2} />
        </Typography>
        {product.reviews.map((review) => (
          <Paper key={review._id} variant="outlined" sx={{ padding: "10px" }}>
            <Avatar alt={review.name} src="" />
            <Typography>{review.name}</Typography>
            <Rating name="no-value" value={review.rating} />
            <Typography>{review.comments}</Typography>
          </Paper>
        ))}

        <Button
          sx={{
            display: show ? "none" : "block",
            width: { xs: "100%", sm: "70%", md: "30%" },
            background: "#FFDA00",
            color: "#000000",
          }}
          variant="outlined"
          onClick={() => setShow(true)}
        >
          Add Review
        </Button>
      </Stack>

      <Stack spacing={2} sx={{ display: show ? "block" : "none" }} paddingY={8}>
        <Typography component="legend">Give Ratting</Typography>
        <Rating value={rating} onChange={(e) => setRating(e.target.value)} />
        {rating}
        <Typography component="legend">Add a comment</Typography>
        <TextField
          label="Comment"
          multiline
          rows={4}
          size="small"
          color="secondary"
          variant="outlined"
          fullWidth
          placeholder="Type your comment about this product"
          required
          type={"text"}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <ButtonGroup disableElevation variant="contained">
          <Button color="error" type="button" onClick={() => setShow(false)}>
            Cancle
          </Button>
          <Button
            type="button"
            onClick={submitRaview}
            disabled={rating ? false : true}
          >
            {showLoading ? <CircularProgress size={30} /> : "Submit"}
          </Button>
        </ButtonGroup>
      </Stack>
      <Snackbar
        open={showSnkber}
        autoHideDuration={5000}
        onClose={() => setShowSnkber(!show)}
      >
        <Alert
          severity="success"
          sx={{ width: "100%", background: "#0A1929", color: "#F2D000" }}
        >
          Added to your cart!
        </Alert>
      </Snackbar>
    </Container>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  try {
    // Fetch data from external API
    const { data } = await axios.get(
      `${process.env.url}/api/product?slug=${params.slug}`
    );

    // Pass data to the page via props
    return { props: { product: data } };
  } catch (error) {
    console.log(error.message);
  }
}
