import axios from "axios";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductSkeleton from "../components/ProductSkeleton";
import useSWR from "swr";
import ProductShowing from "./ProductShowing";
const getAllProduct = (url) => axios.get(url).then((res) => res.data);
export default function ProductSlider() {
  const { data, err } = useSWR("/api/products", getAllProduct);
  if (!data) {
    return <ProductSkeleton></ProductSkeleton>;
  }
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <Carousel
      swipeable={false}
      draggable={false}
      showDots={false}
      responsive={responsive}
      ssr={false} // means to render carousel on server-side.
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={1000}
      keyBoardControl={true}
      customTransition="all .5"
      transitionDuration={500}
      removeArrowOnDeviceType={["tablet", "mobile"]}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
    >
      {data.map((product) => (
        <ProductShowing key={product._id} product={product}></ProductShowing>
      ))}
    </Carousel>
  );
}
