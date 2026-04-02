'use client'

import { registerValidations } from "@/lib/validations";
import { register } from "@/services/authService";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Link from "next/link";
import { useRouter } from "next/navigation";

const RegisterView = () => {
	const router = useRouter()
	return (
		<div className='flex flex-col md:flex-row min-h-screen m-2 md:m-5 bg-white rounded-lg'>
			<div className="w-full md:w-1/2 flex items-center justify-center p-6">
				<div className="w-full max-w-sm">
					<h1 className="text-2xl mb-4 text-center md:text-left">CREA UNA CUENTA</h1>
					<Formik
						initialValues={{ email: '', password: '', name: '', address: '', phone: '' }}
						validate={registerValidations}
						onSubmit={ async (values) => {
							await register(values)
							router.push("/login")
						}}
					>
						{({ isSubmitting }) => (
							<Form className='flex flex-col gap-3'>
								<Field id='email' type="email" name="email" placeholder=" email" className="border p-2 rounded-full border-gray-300" />
								<ErrorMessage name="email" component="div" className='text-orange-700'/>
								<Field id='password' type="password" name="password" placeholder=" contraseña" className="border p-2 rounded-full border-gray-300"/>
								<ErrorMessage name="password" component="div" className='text-orange-700'/>
								<Field id='name' type="name" name="name" placeholder=" nombre" className="border p-2 rounded-full border-gray-300" />
								<ErrorMessage name="name" component="div" className='text-orange-700'/>
								<Field id='address' type="address" name="address" placeholder=" direccion" className="border p-2 rounded-full border-gray-300"/>
								<ErrorMessage name="address" component="div" className='text-orange-700'/>
								<Field id='phone' type="phone" name="phone" placeholder=" telefono" className="border p-2 rounded-full border-gray-300"/>
								<ErrorMessage name="phone" component="div" className='text-orange-700'/>
								<button type="submit" disabled={isSubmitting} className="bg-black text-white font-bold py-2 rounded-full mt-2 hover:bg-white border-black border-1 hover:text-black">
									ENVIAR
								</button>
								<span className='text-gray-500'>Ya tienes una cuenta? <Link href={'/login'} className='text-black underline'>INICIA SESION</Link></span>
							</Form>
						)}
					</Formik>
				</div>
			</div>
			<div className="hidden md:flex w-1/2 h-64 md:h-auto">
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img src={'https://rembeauty.com/cdn/shop/files/brand_founders_vision_04b688f1-f217-47bb-9674-98b2fe3dea44.jpg?v=1744742084&width=960'} className='w-full h-full object-cover'></img>
			</div>
		</div>
	)
}

export default RegisterView;