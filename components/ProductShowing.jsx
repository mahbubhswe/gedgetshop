import React, { useContext, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Rating,
  CardActionArea,
  Snackbar,
  Alert,
} from "@mui/material";
import { contextStore } from "../utils/Store";
import NextLink from "next/link";
import Image from "next/image";
export default function ProductShowing({ product }) {
  const [show, setShow] = useState(false);
  const { dispatch } = useContext(contextStore);
  const AddToCart = (item) => {
    item.qty = 1;
    dispatch({ type: "ADD_TO_CART", payload: item });

    setShow(true);
  };

  return (
    <>
      <Grid item width={"280px"}>
        <Card variant="outlined" sx={{ background: "#ECECEE" }}>
          <NextLink href={`/products/${product.slug}`} passHref>
            <CardActionArea>
              <Image
                src={product.img}
                alt={product.name}
                width={280}
                height={280}
                quality={100}
              />
            </CardActionArea>
          </NextLink>

          <CardContent>
            <Typography component={"p"}>{product.name} </Typography>
            <Typography component={"span"}>Price:{product.price}tk</Typography>
            <Typography component={"span"}>
              {"  "}Reviews({product.numOfReviews})
            </Typography>
            <Rating name="no-value" value={product.rating} />
          </CardContent>
          <CardActions>
            <Button
              variant="outlined"
              size="small"
              fullWidth
              sx={{ background: "#0A1929", color: "#F2D000" }}
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
          </CardActions>
        </Card>
      </Grid>
      <Snackbar
        open={show}
        autoHideDuration={5000}
        onClose={() => setShow(!show)}
      >
        <Alert
          severity="success"
          sx={{ width: "100%", background: "#0A1929", color: "#F2D000" }}
        >
          Added to your cart!
        </Alert>
      </Snackbar>
    </>
  );
}
