import { useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import ProductItem from '../components/ProductItem';
import Product from '../models/Product';
import db from '../utils/db';
import { Store } from '../utils/Store';

export default function Home({ products }) {
  const { dispatch } = useContext(Store);

  useEffect(() => {
    dispatch({ type: 'GET_PRODUCTS', payload: { products } });
  }, []);

  return (
    <Layout title="Home Page">
      <div>
        <h1 className="text-center text-5xl my-4">JIGIT+</h1>
        <p className="text-[12px] text-gray-600 px-4 my-10">
          JIGIT has an ongoing commitment to its customers around the world in
          providing an excellent customer experience to all. As part of these
          efforts, we are committed to providing a website that is accessible to
          the widest possible audience, regardless of technology or ability.
          JIGIT is committed to aligning its website and its operations in
          substantial conformance with generally-recognized and accepted
          guidelines and/or standards for website accessibility (as these may
          change from time to time). To assist in these efforts, JIGIT has
          partnered with experienced internationally reputable consultants and
          is working to increase the accessibility and usability of our website.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductItem key={product.slug} product={product} />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
