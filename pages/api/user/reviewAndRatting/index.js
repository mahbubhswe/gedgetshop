import Product from "../../../../model/productModel";
import connectMongo from "../../../../utils/connectMongo.js";
import nextConnect from "next-connect";
const handler = nextConnect();
handler.post(async (req, res, next) => {
  try {
    await connectMongo();
    await Product.updateOne(
      { _id: req.body.id },
      {
        $set: {
          numOfReviews: req.body.numOfReviews,
          rating: req.body.rating,
        },
        $push: {
          reviews: {
            name: req.body.name,
            rating: req.body.rating,
            comments: req.body.comment,
          },
        },
      }
    );
    res.send("Thank you for your review!");
  } catch (error) {
    res.send(error.message);
  }
});

export default handler;
