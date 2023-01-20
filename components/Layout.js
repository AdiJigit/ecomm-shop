import Head from 'next/head';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Menu } from '@headlessui/react';
import 'react-toastify/dist/ReactToastify.css';
import { SlBag, SlClose } from 'react-icons/sl';
import { RxHamburgerMenu } from 'react-icons/rx';
import { motion } from 'framer-motion';
import { Store } from '../utils/Store';
import { signOut, useSession } from 'next-auth/react';
import DropDownLink from './DropDownLink';
import Cookies from 'js-cookie';

function Layout({ children, title }) {
  const { status, data: session } = useSession();
  const { state, dispatch } = useContext(Store);
  const { cart, productStore } = state;
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(0);


  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  const logoutClickHandler = () => {
    Cookies.remove('cart');
    dispatch({ type: 'CART_RESET' });
    signOut({ callbackUrl: '/login' });
  };

  return (
    <>
      <Head>
        <title>{title ? title + ' - JIGIT' : 'JIGIT'}</title>
        <meta name="description" content="Ecommerce Website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer position="bottom-center" limit={1} />

      <div className="min-h-screen flex flex-col justify-between">
        <header className="fixed left-0 right-0">
          <nav className="h-20 px-4 flex justify-between items-center">
            <div className="flex">
              <div className="p-2">
                <RxHamburgerMenu
                  size={20}
                  onClick={() => setIsOpenMenu(!isOpenMenu)}
                  className="cursor-pointer"
                />
                {isOpenMenu === true && (
                  <motion.div
                    initial={{ opacity: 0, x: -200 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.0 }}
                    viewport={{ once: false }}
                    className="bg-white absolute top-0 left-0 h-screen w-[70%] sm:w-[50%] md:w-[30%]"
                  >
                    <SlClose
                      onClick={() => setIsOpenMenu(false)}
                      size={25}
                      className="mx-4 my-2 cursor-pointer"
                    />
                    <h1 className="mt-2 px-8 text-6xl font-[600] text-black">
                      JIGIT
                    </h1>
                    <motion.ul className="mt-5 py-5 text-[12px] bg-[#FFE800]">
                      <li className="pl-5 mb-4 pt-2 sm:text-[14px] tracking-widest">
                        <Link href="-trench">SALE</Link>
                      </li>
                      {productStore.products.map((product) => (
                        <li key={product.slug} className="pl-10">
                          <Link href={`/product/${product.slug}`}>
                            {product.categoryLink}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                    <p className="px-4 pt-4 text-[14px]">NEW COLLECTION</p>
                    <p className="px-4 text-[12px]">JOIN JIGIT+</p>
                  </motion.div>
                )}
              </div>
              <Link href="/" className="text-6xl font-bold">
                JIGIT
              </Link>
            </div>
            <div className="flex">
              {status === 'loading' ? (
                <p className="text-sm text-gray-600 mt-2">Loading</p>
              ) : session?.user ? (
                <Menu as="div" className="relative inline-block">
                  <Menu.Button className="text-gray-600">
                    <p className="p-2">{session.user.name}</p>
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white shadow-lg">
                    <Menu.Item>
                      <DropDownLink
                        className="dropdown-link"
                        href="/order-history"
                      >
                        Order History
                      </DropDownLink>
                    </Menu.Item>
                    <Menu.Item>
                      <Link
                        className="dropdown-link"
                        href="#"
                        onClick={logoutClickHandler}
                      >
                        Logout
                      </Link>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              ) : (
                <Link
                  href="/login"
                  className="p-2 text-[14px] text-gray-600 font-[600]"
                >
                  LOGIN
                </Link>
              )}

              <Link href="/cart" className="relative p-2">
                <SlBag size={25} />
                {cartItemsCount > 0 && (
                  <span className="absolute top-0 left-[20px] text-xs text-white px-2 py-1 bg-red-500 rounded-full">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
            </div>
          </nav>
        </header>
        <main className="container min-h-screen m-auto mt-24 px-4">
          {children}
        </main>
        <footer className="min-h-screen flex justify-center items-center p-14 mt-4">
          <div className="w-full flex flex-col justify-center items-center">
            <h1 className="text-center font-[600]">JOIN OUR NEWSLETTER</h1>
            <div className="flex flex-col sm:flex-row flex-wrap gap-5 mt-14 sm:mt-32 text-sm text-center">
              <p>TIKTOK</p>
              <p>INSTAGRAM</p>
              <p>FACEBOOK</p>
              <p>TWITTER</p>
              <p>PINTEREST</p>
              <p>YOUTUBE</p>
              <p>SPOTIFY</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-5 mt-14 sm:mt-32 text-center text-sm">
              <p className="uppercase">© Copyright JIGIT 2023</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Layout;
