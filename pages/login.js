import Link from 'next/link';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout';
import { signIn, useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { getError } from '../utils/error';
import { useRouter } from 'next/router';

const LoginScreen = () => {
  const { data: session } = useSession();

  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }, [redirect, router, session?.user]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ email, password }) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Login">
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="mx-auto lg:w-[30%] border py-12 px-5"
      >
        <h1 className="mb-4 text-xl font-[600]">Login</h1>
        <div className="mb-4">
          <label htmlFor="email" className="text-sm text-gray-600">
            Email
          </label>
          <input
            {...register('email', {
              required: 'Please enter email',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: 'Please enter valid email',
              },
            })}
            type="email"
            id="email"
            className="w-full"
            autoFocus
          />
          {errors.email && (
            <div className="text-red-500 text-sm">{errors.email.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="text-sm text-gray-600">
            Password
          </label>
          <input
            {...register('password', {
              required: 'Please enter password',
              minLength: { value: 6, message: 'password is more than 5 chars' },
            })}
            type="password"
            id="password"
            className="w-full"
            autoFocus
          />
          {errors.password && (
            <div className="text-red-500 text-sm">
              {errors.password.message}
            </div>
          )}
        </div>
        <div>
          <button className="primary-button">Login</button>
        </div>
        <div className="mt-4 text-sm">
          Don&apos;t have an account? &nbsp;
          <Link
            href={`/register?redirect=${redirect || '/'}`}
            className="text-sm font-semibold hover:underline"
          >
            Register
          </Link>
        </div>
      </form>
    </Layout>
  );
};

export default LoginScreen;
