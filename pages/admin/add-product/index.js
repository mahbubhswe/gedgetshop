import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import Admin from "..";
import FileBase64 from "react-file-base64";
import Image from "next/image";
export default function AddProduct() {
  const [showLoading, setShowLoading] = useState(false);
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.target.reset();
    setImg("");
    try {
      setShowLoading(true);
      const { data } = await axios.post("/api/admin/product/create", {
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
    } catch (error) {
      setErr(error.message);
      setShowLoading(false);
    }
  };
  return (
    <Admin pageTitle={"Add product"}>
      <Paper
        variant="outlined"
        sx={{
          width: { xs: "100%", sm: "90%", md: "50%", margin: "auto" },
        }}
      >
        <form onSubmit={handleSubmit}>
          <Stack spacing={2} p={3}>
            <Typography variant="bold" component={"h1"} align="center">
              Add Product
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
                <InputLabel id="demo-simple-select-label">Category</InputLabel>

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
              type={"text"}
              onChange={(e) => setDes(e.target.value)}
            />

            <Button
              variant="outlined"
              fullWidth
              sx={{ background: "#0A1929", color: "#F2D000" }}
              type="submit"
            >
              {showLoading ? <CircularProgress size={30} /> : "add"}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Admin>
  );
}
