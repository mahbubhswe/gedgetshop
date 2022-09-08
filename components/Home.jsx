import {
  Stack,
  Box,
  Container,
  Typography,
  CardContent,
  Card,
  Grid,
  Avatar,
  Rating,
  Button,
  Divider,
} from "@mui/material";
import React from "react";
import Link from "next/link";
import MobileStore from "./MobileStore";
import SocialMediaLink from "./SocialMediaLink";
import Footer from "../components/Footer";
import MessengerCustomerChat from "react-messenger-customer-chat";
import TextTransition, { presets } from "react-text-transition";
import ProductSlider from "../components/ProductSlider";
import Image from "next/image";
import { Wave } from "react-animated-text";
import sp1 from "../public/img/sp1.png";
import sp from "../public/img/sp.png";
import fd from "../public/img/fd.png";
import cs from "../public/img/cs.png";
import rp from "../public/img/rp.png";
export default function Home() {
  const [index, setIndex] = React.useState(0);
  const TEXTS = [
    "High quality product",
    "Easy return policy",
    "Secure payment",
    "Faster delivery system",
    "Be happy with us!",
  ];

  React.useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      2000 // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);
  return (
    <>
      <Box sx={{ background: "#ECECEE" }}>
        <Grid container sx={{ height: "500px" }}>
          <Grid
            item
            sx={{
              display: "grid",
              placeContent: "center",
              width: { xs: "100%", sm: "100%", md: "50%", lg: "50%" },
            }}
          >
            <Typography variant="bold" component={"h1"}>
              <TextTransition
                text={TEXTS[index % TEXTS.length]}
                springConfig={presets.slow}
              />
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{
                width: "50%",
                margin: "auto",
                marginTop: "20px",
                background: "#DB4040",
                padding: "15px 0px",
              }}
            >
              <Link href={"/your-cart"}>
                <a style={{ textDecoration: "none", color: "white" }}>
                  Shop Now
                </a>
              </Link>
            </Button>
          </Grid>
          <Grid
            item
            data-aos="zoom-in"
            data-aos-offset="0"
            data-aos-delay="0"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="false"
            data-aos-anchor-placement="top-center"
            sx={{
              display: { xs: "none", sm: "none", md: "grid", lg: "grid" },
              placeContent: "center",
              width: "50%",
              background: "#DB4040",
              borderTopLeftRadius: "200%",
            }}
          >
            <Image
              src={sp1}
              alt="Picture of the author"
              width={400}
              height={350}
              quality={100}
            />
          </Grid>
        </Grid>
      </Box>
      <Stack>
        <Box sx={{ paddingY: "60px" }}>
          <Container>
            <Typography variant="bold" component="h1" py="40px" align="center">
              <Wave text="New Collections" effect="stretch" effectChange={2} />
            </Typography>

              <ProductSlider></ProductSlider>
         
          </Container>
        </Box>
        <Box sx={{ minHeight: "600px", width: "100%" }}>
          <Container>
            <Typography
              variant="bold"
              component="h1"
              textAlign="center"
              py="40px"
            >
              Why Choice Us
            </Typography>
            <Grid container justifyContent={"center"}>
              <Grid
                item
                data-aos="fade-up-right"
                data-aos-offset="0"
                data-aos-delay="0"
                data-aos-duration="400"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true"
                data-aos-once="false"
                data-aos-anchor-placement="top-center"
              >
                <Image src={sp} alt="payment" quality={100} />
              </Grid>
              <Grid
                item
                data-aos="zoom-in"
                data-aos-offset="0"
                data-aos-delay="0"
                data-aos-duration="1000"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true"
                data-aos-once="false"
                data-aos-anchor-placement="top-center"
              >
                <Image src={fd} alt="delivery" quality={100} />
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Box sx={{ minHeight: "600px", width: "100%", background: "#F5F5F7" }}>
          <Container>
            <Typography
              variant="bold"
              component="h1"
              textAlign="center"
              py="40px"
            >
              Customer Support 24/7
            </Typography>
            <Grid container justifyContent={"center"} spacing={2}>
              <Grid item>
                <Typography>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Blanditiis impedit quo debitis, tempore recusandae asperiores.
                </Typography>
              </Grid>
              <Grid
                item
                data-aos="fade-up"
                data-aos-offset="0"
                data-aos-delay="0"
                data-aos-duration="1000"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true"
                data-aos-once="false"
                data-aos-anchor-placement="top-center"
              >
                <Image src={cs} alt="delivery" quality={100} />
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Box mb={5} sx={{ minHeight: "500px", width: "100%" }}>
          <Container>
            <Typography
              variant="bold"
              component="h1"
              textAlign="center"
              py="40px"
            >
              Customer Review
            </Typography>
            <Grid container justifyContent={"center"}>
              <Grid item mb={2}>
                <Card
                  variant="outlined"
                  sx={{ width: "250px", background: "#F5F5F7" }}
                >
                  <CardContent>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                    />
                    <Typography>Mahbub Hasan</Typography>
                    <Rating name="no-value" value={5} />
                    <Typography>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Blanditiis impedit quo debitis, tempore recusandae
                      asperiores.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item mx={3} mb={2}>
                <Card
                  variant="outlined"
                  sx={{ width: "250px", background: "#F5F5F7" }}
                >
                  <CardContent>
                    <Avatar
                      alt="Nahid Hasan"
                      src="/static/images/avatar/1.jpg"
                    />
                    <Typography>Mahbub Hasan</Typography>
                    <Rating name="no-value" value={5} />
                    <Typography>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Blanditiis impedit quo debitis, tempore recusandae
                      asperiores.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item>
                <Card
                  variant="outlined"
                  sx={{ width: "250px", background: "#F5F5F7" }}
                >
                  <CardContent>
                    <Avatar
                      alt="Mahbub Hasan"
                      src="/static/images/avatar/1.jpg"
                    />
                    <Typography>Mahbub Hasan</Typography>
                    <Rating name="no-value" value={5} />
                    <Typography>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Blanditiis impedit quo debitis, tempore recusandae
                      asperiores.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Box sx={{ minHeight: "400px", width: "100%", background: "#F5F5F7" }}>
          <Container>
            <Typography
              variant="bold"
              component="h1"
              textAlign="center"
              py="40px"
            >
              Return Policy
            </Typography>
            <Stack direction={{ xs: "column", sm: "row", md: "row" }}>
              <Grid
                data-aos="fade-up-right"
                data-aos-offset="0"
                data-aos-delay="0"
                data-aos-duration="400"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true"
                data-aos-once="false"
                data-aos-anchor-placement="top-center"
                p={{ xs: "5px", sm: "10", md: "20" }}
              >
                <Typography align="center">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex,
                  necessitatibus praesentium nostrum architecto libero nisi iure
                  cum voluptate natus dolorem vel, debitis repellendus quam!
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex,
                  necessitatibus praesentium nostrum architecto libero nisi iure
                  cum voluptate natus dolorem vel, debitis repellendus
                </Typography>
              </Grid>
              <Grid
                data-aos="fade-up-left"
                data-aos-offset="0"
                data-aos-delay="0"
                data-aos-duration="400"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true"
                data-aos-once="false"
                data-aos-anchor-placement="top-center"
                p={{ xs: "5px", sm: "10", md: "20" }}
              >
                <Image
                  src={rp}
                  alt="Picture of the author"
                  width={800}
                  height={400}
                  quality={100}
                />
              </Grid>
            </Stack>
          </Container>
        </Box>
        <Box sx={{ minHeight: "500px", width: "100%" }} mb={10}>
          <Container>
            <Typography
              data-aos="fade-down"
              data-aos-offset="0"
              data-aos-delay="0"
              data-aos-duration="400"
              data-aos-easing="ease-in-out"
              data-aos-mirror="true"
              data-aos-once="false"
              data-aos-anchor-placement="top-center"
              variant="bold"
              component="h1"
              textAlign="center"
              py="40px"
            >
              Our Business Policy
            </Typography>
            <Card
              variant="outlined"
              sx={{
                padding: { sx: "30px 10px", md: "50px 20px" },
                background: "#F5F5F7",
              }}
            >
              <CardContent>
                <Typography>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex,
                  necessitatibus praesentium nostrum architecto libero nisi iure
                  cum voluptate natus dolorem vel, debitis repellendus quam!
                  Autem omnis nulla officiis cum adipisci veniam doloribus magni
                  minus, unde magnam dolore ut debitis ducimus minima sint a
                  deserunt molestiae, vel, sit odit pariatur! Asperiores odit id
                  praesentium, porro minima illum ducimus eveniet sapiente. Illo
                  nam culpa magni, impedit animi esse facilis amet repellendus
                  exercitationem quos accusamus sapiente, aliquid est minima
                  molestiae dicta laboriosam repellat autem quia assumenda
                  doloremque eos neque, dolores necessitatibus.
                </Typography>
              </CardContent>
            </Card>
          </Container>
        </Box>
        <Box sx={{ minHeight: "500px", width: "100%", background: "#F5F5F7" }}>
          <Container>
            <Grid container spacing={2} mt={10}>
              <Grid
                item
                sx={{
                  display: "grid",
                  placeContent: "center",
                  width: { xs: "100%", sm: "100%", md: "50%", lg: "50%" },
                }}
              >
                <SocialMediaLink></SocialMediaLink>
              </Grid>
              <Grid
                item
                sx={{
                  display: "grid",
                  placeContent: "center",
                  width: { xs: "100%", sm: "100%", md: "50%", lg: "50%" },
                }}
              >
                <MobileStore></MobileStore>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Divider></Divider>
        <Footer></Footer>
        <MessengerCustomerChat
          pageId="103070385764123"
          appId="411472610987693"
        />
      </Stack>
    </>
  );
}
