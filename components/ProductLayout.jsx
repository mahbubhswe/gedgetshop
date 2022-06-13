import React, { useState } from "react";
import Layout from "./Layout";
import {
  Grid,
  Stack,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Container,
  Select,
  MenuItem,
  Divider,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";
import HashLoader from "react-spinners/HashLoader";
import ProductSlider from "../components/ProductSlider";
import ProductShowing from "../components/ProductShowing";
import Footer from "./Footer";
import { Wave } from "react-animated-text";
export default function ProductLayout({ data }) {
  const [products, setProducts] = useState(data);
  const [sortValue, setSortValue] = useState("");
  //products filtering
  const filterProducts = (brand) => {
    if (brand === "") {
      setProducts(data);
    } else {
      const filteredProducts = data.filter((x) => x.brand === brand);
      setProducts(filteredProducts);
    }
  };

  //sorting by price
  const sortProducts = (sort) => {
    setSortValue(sort);
    if (sort === "") {
      setProducts(data);
    } else {
      const sortedProducts = data
        .slice()
        .sort((a, b) =>
          sort === "lowest"
            ? a.price > b.price
              ? 1
              : -1
            : sort === "heighest"
            ? a.price < b.price
              ? 1
              : -1
            : a.id < b.id
            ? 1
            : -1
        );
      setProducts(sortedProducts);
    }
  };

  return (
    <Layout>
      <Container>
        <Stack direction={"row"} mt={8} mb={20}>
          <Box sx={{ width: "250px", display: { xs: "none", md: "block" } }}>
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText>Sort By Brand</ListItemText>
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Checkbox onChange={() => filterProducts("")}></Checkbox>
                  </ListItemIcon>
                  <ListItemText>All</ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Checkbox
                      onChange={() => filterProducts("apple")}
                    ></Checkbox>
                  </ListItemIcon>
                  <ListItemText>Apple</ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Checkbox
                      onChange={() => filterProducts("samsung")}
                    ></Checkbox>
                  </ListItemIcon>
                  <ListItemText>Samsung</ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Checkbox
                      onChange={() => filterProducts("samsung")}
                    ></Checkbox>
                  </ListItemIcon>
                  <ListItemText>Oppo</ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Checkbox
                      onChange={() => filterProducts("xiaomi")}
                    ></Checkbox>
                  </ListItemIcon>
                  <ListItemText>Xiaomi</ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Checkbox
                      onChange={() => filterProducts("nokia")}
                    ></Checkbox>
                  </ListItemIcon>
                  <ListItemText>Nokia</ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Checkbox
                      onChange={() => filterProducts("realme")}
                    ></Checkbox>
                  </ListItemIcon>
                  <ListItemText>Realme</ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Checkbox
                      onChange={() => filterProducts("infinix")}
                    ></Checkbox>
                  </ListItemIcon>
                  <ListItemText>Infinix</ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Checkbox
                      onChange={() => filterProducts("tecno")}
                    ></Checkbox>
                  </ListItemIcon>
                  <ListItemText>Tecno</ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Checkbox
                      onChange={() => filterProducts("sony")}
                    ></Checkbox>
                  </ListItemIcon>
                  <ListItemText>Sony</ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Checkbox
                      onChange={() => filterProducts("oneplus")}
                    ></Checkbox>
                  </ListItemIcon>
                  <ListItemText>Oneplus</ListItemText>
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText>Sort By Price</ListItemText>
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Checkbox
                      onChange={() => sortProducts("lowest")}
                    ></Checkbox>
                  </ListItemIcon>
                  <ListItemText>Low to High</ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Checkbox
                      onChange={() => sortProducts("heighest")}
                    ></Checkbox>
                  </ListItemIcon>
                  <ListItemText>High to Low</ListItemText>
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
          <Box flex={1}>
            <div style={{ textAlign: "center" }}>
              <FormControl size="small" sx={{ m: 1, minWidth: 300 }}>
                <InputLabel>Sort By Price</InputLabel>
                <Select
                  value={sortValue}
                  label="Sort By Price"
                  onChange={(e) => sortProducts(e.target.value)}
                >
                  <MenuItem value="">
                    <em>Select</em>
                  </MenuItem>
                  <MenuItem value={"lowest"}>Low to high</MenuItem>
                  <MenuItem value={"heighest"}>High to Low</MenuItem>
                </Select>
              </FormControl>
            </div>

            <Grid
              container
              spacing={2}
              justifyContent={"center"}
              sx={{ marginTop: "20px" }}
            >
              {products ? (
                products.map((product) => (
                  <ProductShowing
                    key={product._id}
                    product={product}
                  ></ProductShowing>
                ))
              ) : (
                <HashLoader size={50} />
              )}
            </Grid>
          </Box>
        </Stack>
        <Typography variant="bold" component="h1" textAlign="center" py="40px">
        <Wave text="New Collections" effect="stretch" effectChange={2} />
        </Typography>
        <ProductSlider></ProductSlider>
      </Container>
      <Divider sx={{marginTop:"200px"}}></Divider>
      <Footer></Footer>
    </Layout>
  );
}
