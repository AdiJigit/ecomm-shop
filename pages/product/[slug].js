import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import ChangeImage from '../../components/ChangeImage';
import Layout from '../../components/Layout';
import ProductItem from '../../components/ProductItem';
import { Store } from '../../utils/Store';
import db from '../../utils/db';
import Product from '../../models/Product';
import axios from 'axios';

function ProductScreen(props) {
  const { product, products } = props;
  const { state, dispatch } = useContext(Store);
  const [selectedImg, setSelectedImg] = useState('');
  const [show, setShow] = useState(false);
  const [toggleState, setToggleState] = useState(false);
  const [size, setSize] = useState('');
  const [color, setColor] = useState(product.slug);
  const router = useRouter();

  if (!product) {
    return <Layout title='Product Not Found'>Product Not Found</Layout>;
  }

  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);


    if (data.countInStock  < quantity) {
      alert('Sorry. Product is out of stock');
      return;
    }

      if (!size){
        alert('Please select size')
      } else {
        dispatch({
          type: 'CART_ADD_ITEM',
          payload: { ...product, quantity, color, size },
        });
        router.push('/cart');
      }
  };
  return (
    <Layout title={product.name}>
      <div className="px-2">
        <Link href="/" className="text-[12px] text-gray-600">
          Back to products
        </Link>
        <div className="flex flex-col lg:flex-row justify-between items-center">
          {product.descriptionTwo?.map((desc, i) => (
            <div key={i} className="lg:w-[30%] ">
              <div className="pr-4 h-[300px] mx-5 text-[12px] overflow-x-hidden overflow-scroll scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-[#000]/80">
                <h3 className="font-[500] mb-8">MATERIALS AND CARE</h3>
                <p className="font-[500] mb-4">MATERIALS</p>
                <p className="text-gray-600 mb-4">{desc.materialsTextOne}</p>
                <p className="mb-4 text-gray-600">{desc.materialsTextTwo}</p>
                &nbsp;
                <p
                  onClick={() => setToggleState(true)}
                  className={`${
                    toggleState === true && 'hidden'
                  } underline text-gray-600 cursor-pointer`}
                >
                  View more
                </p>
                {toggleState ? (
                  <>
                    {desc.outerShell ? (
                      <p className="font-[500]">OUTERSHELL</p>
                    ) : (
                      ''
                    )}
                    <p className="text-[12px] text-gray-600 mb-4">
                      {desc.outerShell}
                    </p>
                    {desc.lining ? <p className="font-[500]">LINING</p> : ''}
                    <p className="text-[12px] text-gray-600 mb-4">
                      {desc.lining}
                    </p>
                    <p className="font-[500]">CARE</p>
                    <p className="text-[12px] text-gray-600 mb-4">
                      {desc.careTextOne}
                    </p>
                    <p className="text-[12px] text-gray-600 mb-6">
                      {desc.careTextTwo}
                    </p>
                    <p className="text-[12px] text-gray-600 mb-1">
                      {desc.careTextThree}
                    </p>
                    <p className="text-[12px] text-gray-600 mb-1">
                      {desc.careTextFour}
                    </p>
                    <p className="text-[12px] text-gray-600 mb-1">
                      {desc.careTextFive}
                    </p>
                    <p className="text-[12px] text-gray-600 mb-1">
                      {desc.careTextSix}
                    </p>
                    <p className="text-[12px] text-gray-600 mb-6">
                      {desc.careTextSeven}
                    </p>
                    <p
                      onClick={() => setToggleState(false)}
                      className="underline cursor-pointer"
                    >
                      View less
                    </p>
                  </>
                ) : (
                  ''
                )}
              </div>
            </div>
          ))}

          {/* Display images with function of changing images */}
          <ChangeImage
            src={
              show
                ? product.imagesDifColor[selectedImg] ||
                  product.imagesDifColor[0]
                : product.imagesColor[selectedImg] || product.imagesColor[0]
            }
            selectedImg={selectedImg}
            images={show ? product.imagesDifColor : product.imagesColor}
            setSelectedImg={setSelectedImg}
          />

          <div className="lg:w-[20%] lg:mr-20 mt-20">
            <div>
              <div className="flex lg:justify-center items-center gap-5">
                <h1 className="text-[18px] font-[500]">{product.name}</h1>
              </div>
              <p className="mt-4 text-[12px] text-gray-600">
                {product.descriptionOne}
              </p>
              <div className="flex gap-4 mt-4">
                {product.colors.map((item) => (
                  <>
                    <div
                      key={item.title}
                      className={`${item.title ? 'inline-block' : 'hidden'}`}
                      onClick={() => setColor(show ? product.slug : product.no)}
                    >
                      <button
                        type="button"
                        onClick={() => setShow(!show)}
                        style={{ backgroundColor: `${item.title}` }}
                        className="p-2 rounded-full"
                        value={item.title}
                      ></button>
                    </div>
                  </>
                ))}
              </div>
              <p className="mt-5 text-gray-600 text-[12px]">
                {show ? product.no : product.slug}
              </p>
              <p className="mt-4 text-gray-600 text-[12px]">
                {product.price.toFixed(2)} EUR
              </p>
              <div className="input-sizes flex flex-col my-4 border-t border-b border-black">
                {product.sizes.map((size) => (
                  <>
                    <input
                      key={size.title}
                      onClick={(e) => setSize(e.target.value)}
                      type="radio"
                      id={size.title}
                      name="size"
                      value={size.title}
                    />
                    <label
                      className="cursor-pointer text-[12px] text-gray-600 my-1 hover:bg-gray-700/20"
                      htmlFor={size.title}
                    >
                      {size.title}
                    </label>
                  </>
                ))}
              </div>
              <p className="text-gray-600 text-[12px] mt-2">SIZE GUIDES</p>
              <div className="mt-2 flex justify-between text-[12px] text-gray-600">
                <p>Status</p>
                <p>{product.countInStock > 0 ? 'In stock' : 'Unavailable'}</p>
              </div>
              <button
                onClick={addToCartHandler}
                className="w-full mt-5 py-[7px] text-[12px] font-[600] bg-black text-white tracking-widest cursor-pointer hover:scale-[1.02] duration-300"
              >
                ADD TO BAG
              </button>
            </div>
          </div>
        </div>

        <h1 className="text-lg font-[500] mt-40 mb-10">RELATED PRODUCTS</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductItem key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default ProductScreen;

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  const products = await Product.find({
    category: product.category,
  }).lean();
  await db.disconnect();
  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
      products: products.map(db.convertDocToObj),
    },
  };
}
