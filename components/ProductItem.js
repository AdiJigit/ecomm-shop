/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';

function ProductItem({ product }) {
  return (
    <div className="card">
      <Link href={`/product/${product.slug}`}>
        <img
          src={product.imageIntro}
          alt={product.name}
          className="rounded shadow"
        />
      </Link>
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/product/${product.slug}`} className="w-full">
          <h2 className="text-[14px] ">{product.name}</h2>
        </Link>
        <div className="w-full flex justify-between items-center py-2 text-[12px] text-gray-600">
          <p>{product.price}</p>
          <p>EUR</p>
        </div>
        <Link href={`/product/${product.slug}`} passHref>
          <button className="primary-button w-full" type="button">
            View Product
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ProductItem;
