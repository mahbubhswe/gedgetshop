import {
  Dialog,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
  TextField,
} from "@mui/material";
import axios from "axios";
import FileBase64 from "react-file-base64";
import Image from "next/image";
import React, { useState } from "react";
import Admin from "..";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function ManageProducts({ products }) {
  const [open, setOpen] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [slug, setSlug] = useState();
  const [category, setCategory] = useState();
  const [brand, setBrand] = useState();
  const [des, setDes] = useState();
  const [img, setImg] = useState();
  const [price, setPrice] = useState();
  const [stock, setStock] = useState();
  const [msg, setMsg] = useState();
  const [err, setErr] = useState();
  const update = (product) => {
    setMsg("");
    setOpen(true);
    setId(product._id);
    setName(product.name);
    setSlug(product.slug);
    setCategory(product.category);
    setBrand(product.brand);
    setDes(product.des);
    setImg(product.img);
    setPrice(product.price);
    setStock(product.stock);
  };

  const deleteProduct = async (id) => {
    if (confirm("Want to delete this product?") === true) {
      const { data } = await axios.delete(
        `/api/admin/product/delete?_id=${id}`
      );
      alert(data);
      window.location.reload();
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.target.reset();

    try {
      setShowLoading(true);
      const { data } = await axios.put(`/api/admin/product/update?_id=${id}`, {
        name: name,
        slug: slug,
        category: category,
        brand: brand,
        des: des,
        img: img,
        price: price,
        stock: stock,
      });
      setShowLoading(false);
      setMsg(data);
      setOpen(false);
      window.location.reload();
    } catch (error) {
      setErr(error.message);
      setShowLoading(false);
    }
  };
  return (
    <Admin pageTitle={"Manage products"}>
      <TableContainer>
        <Table>
          <TableHead sx={{ background: "#0A1929" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>Img</TableCell>
              <TableCell sx={{ color: "white" }}>Name</TableCell>
              <TableCell sx={{ color: "white" }}>Price</TableCell>
              <TableCell sx={{ color: "white" }}>Stock</TableCell>
              <TableCell sx={{ color: "white" }}>Brand</TableCell>
              <TableCell sx={{ color: "white" }}>Category</TableCell>
              <TableCell sx={{ color: "white" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products
              ? products.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>
                      <Image
                        src={product.img}
                        height={50}
                        width={50}
                      quality={100}
                      alt={product.name}
                      />
                    </TableCell>

                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>{product.brand}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => update(product)}>
                        <EditIcon></EditIcon>
                      </IconButton>
                      <IconButton onClick={() => deleteProduct(product._id)}>
                        <DeleteIcon></DeleteIcon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <Paper variant="outlined">
          <form onSubmit={handleSubmit}>
            <Stack spacing={2} p={3}>
              <Typography variant="bold" component={"h1"} align="center">
                Update Product
              </Typography>
              <Typography
                component={"span"}
                align="center"
                sx={{ color: msg ? "green" : "red" }}
              >
                {msg ? msg : err ? err : null}
              </Typography>

              <TextField
                size="small"
                id="outlined-basic"
                color="secondary"
                label="Name"
                variant="outlined"
                placeholder="Type name"
                required
                type={"text"}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                size="small"
                id="outlined-basic"
                color="secondary"
                label="Slug"
                variant="outlined"
                placeholder="Type slug"
                required
                type={"text"}
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
              <Stack direction={"row"} spacing={2}>
                <FormControl sx={{ width: "50%" }}>
                  <InputLabel id="demo-simple-select-label">Brand</InputLabel>
                  <Select
                    size="small"
                    value={brand}
                    color="secondary"
                    label="Brand"
                    onChange={(e) => setBrand(e.target.value)}
                  >
                    <MenuItem value={"apple"}>Apple</MenuItem>
                    <MenuItem value={"samsung"}>Samsung</MenuItem>
                    <MenuItem value={"xiaomi"}>Xiaomi</MenuItem>
                    <MenuItem value={"nokia"}>Nokia</MenuItem>
                    <MenuItem value={"realme"}>Realme</MenuItem>
                    <MenuItem value={"infinix"}>Infinix</MenuItem>
                    <MenuItem value={"tecno"}>Tecno</MenuItem>
                    <MenuItem value={"walton"}>Walton</MenuItem>
                    <MenuItem value={"sony"}>Sony</MenuItem>
                    <MenuItem value={"oneplus"}>Oneplus</MenuItem>
                    <MenuItem value={"motorola"}>Motorola</MenuItem>
                    <MenuItem value={"oppo"}>Oppo</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ width: "50%" }}>
                  <InputLabel id="demo-simple-select-label">
                    Category
                  </InputLabel>

                  <Select
                    size="small"
                    value={category}
                    color="secondary"
                    label="Category"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <MenuItem value={"mobile"}>Mobile</MenuItem>
                    <MenuItem value={"desktop"}>Desktop</MenuItem>
                    <MenuItem value={"laptop"}>Laptop</MenuItem>
                    <MenuItem value={"tablat"}>Tablat</MenuItem>
                    <MenuItem value={"accessory"}>Accessory</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
              <Stack direction={"row"} spacing={2}>
                <TextField
                  size="small"
                  color="secondary"
                  label="Price"
                  variant="outlined"
                  placeholder="Price"
                  required
                  value={price}
                  type={"number"}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <TextField
                  size="small"
                  color="secondary"
                  label="Stock"
                  variant="outlined"
                  placeholder="Stock"
                  required
                  type={"number"}
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </Stack>
              <Stack direction={"row"}>
                <FileBase64 onDone={(e) => setImg(e.base64)} />
                {img ? (
                  <Image
                    src={img}
                    alt="photo"
                    height={50}
                    width={50}
                    quality={100}
                  />
                ) : null}
              </Stack>

              <TextField
                label="Descriotion"
                multiline
                rows={4}
                size="small"
                color="secondary"
                variant="outlined"
                placeholder="Product descriotion"
                required
                value={des}
                type={"text"}
                onChange={(e) => setDes(e.target.value)}
              />
              <Stack direction={"row"} spacing={2}>
                <Button
                  variant="outlined"
                  sx={{ background: "red", color: "black" }}
                  type="button"
                  onClick={() => setOpen(false)}
                >
                  Cancle
                </Button>
                <Button
                  variant="outlined"
                  sx={{ background: "#0A1929", color: "#F2D000" }}
                  type="submit"
                >
                  {showLoading ? <CircularProgress size={30} /> : "Update"}
                </Button>
              </Stack>
            </Stack>
          </form>
        </Paper>
      </Dialog>
    </Admin>
  );
}

export async function getServerSideProps() {
  const { data } = await axios.get(`${process.env.url}/api/products`);
  return { props: { products: data } };
}
