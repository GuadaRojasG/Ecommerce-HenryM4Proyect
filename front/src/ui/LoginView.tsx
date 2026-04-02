'use client'
import { useAuth } from '@/context/AuthContext';
import { loginValidations } from '@/lib/validations';
import { login } from '@/services/authService';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const LoginView = () => {
  const router = useRouter()
  const {setUserData} = useAuth()
  return (
    <div className="flex flex-col md:flex-row min-h-screen m-2 md:m-5 bg-white rounded-lg">
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl mb-4 text-center md:text-left">INGRESA</h1>
          <Formik
            initialValues={{ email: '', password: '' }}
            validate={loginValidations}
            onSubmit={async (values) => {
              const response = await login(values)
              const {token, user} = response
              setUserData({token, user})
              router.push('/')
            }}
          >
            {({ isSubmitting }) => (
              <Form className='flex flex-col gap-3'>
                <Field id='email' type="email" name="email" placeholder=" email" className="border p-2 rounded-full border-gray-300" />
                <ErrorMessage name="email" component="div" className='text-orange-700'/>
                <Field id='password' type="password" name="password" placeholder=" contraseña" className="border p-2 rounded-full border-gray-300" />
                <ErrorMessage name="password" component="div" className='text-orange-700'/>
                <button type="submit" disabled={isSubmitting} className="bg-black text-white font-bold py-2 rounded-full mt-2 transition-colors hover:bg-white border-black border hover:text-black">
                  ENVIAR
                </button>
                <span className='text-gray-500'>No tienes una cuenta? <Link href={'/register'} className='text-black underline'>REGISTRATE</Link></span>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <div className="hidden md:flex w-1/2 h-64 md:h-auto">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={'https://rembeauty.com/cdn/shop/files/Login-Placeholder-Image.jpg?v=1734431111&width=800'} className='w-full h-full object-cover'></img>
      </div>
    </div>
  )

}

export default LoginView;