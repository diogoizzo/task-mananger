import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

interface Form {
   name: string;
   email: string;
   password: string;
}

export default function SignUp() {
   const [form, setForm] = useState<Form>({
      name: '',
      email: '',
      password: ''
   });

   const registerUser = async (event: any) => {
      event.preventDefault();
      const res = await axios.post('/api/register', form);
      const { email, password } = form;
      if (res.status === 200) {
         signIn('credentials', {
            email,
            password,
            callbackUrl: '/',
            redirect: true
         });
      }
   };
   return (
      <div className="h-[100vh] flex items-center justify-center bg-indigo-100 relative overflow-hidden">
         <img
            className="absolute top-0 right-0 w-2/3 md:h-full"
            src="/img/pattern-smash-dots-indigo-right.svg"
            alt=""
         />
         <img
            className="absolute top-0 left-0 w-1/3 md:h-full"
            src="/img/pattern-two-smashes-indigo-left.svg"
            alt=""
         />
         <div className="container px-4 mx-auto relative">
            <div className="py-12 px-6 md:p-16 border-3 border-indigo-900 shadow bg-white rounded-2xl max-w-2xl mx-auto">
               <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-extrabold mb-2">
                     Crie sua conta
                  </h2>
                  <p className="text-lg font-extrabold leading-7 text-indigo-500">
                     e obtenha acesso imediato à todas as nossas funcionalidades
                  </p>
               </div>
               <form onSubmit={registerUser}>
                  <div className="mb-6">
                     <label className="block mb-2 font-extrabold" htmlFor="">
                        Nome
                     </label>
                     <input
                        className="inline-block w-full p-4 leading-6 text-lg font-extrabold placeholder-indigo-900 bg-white shadow border-2 border-indigo-900 rounded"
                        type="text"
                        placeholder="Seu nome"
                        value={form.name}
                        onChange={(e) =>
                           setForm({ ...form, name: e.target.value })
                        }
                     />
                  </div>
                  <div className="mb-6">
                     <label className="block mb-2 font-extrabold" htmlFor="">
                        Email
                     </label>
                     <input
                        className="inline-block w-full p-4 leading-6 text-lg font-extrabold placeholder-indigo-900 bg-white shadow border-2 border-indigo-900 rounded"
                        type="email"
                        placeholder="seuemail@gmail.com"
                        value={form.email}
                        onChange={(e) =>
                           setForm({ ...form, email: e.target.value })
                        }
                     />
                  </div>
                  <div className="mb-6">
                     <label className="block mb-2 font-extrabold" htmlFor="">
                        Senha
                     </label>
                     <input
                        className="inline-block w-full p-4 leading-6 text-lg font-extrabold placeholder-indigo-900 bg-white shadow border-2 border-indigo-900 rounded"
                        type="password"
                        placeholder="**********"
                        value={form.password}
                        onChange={(e) =>
                           setForm({ ...form, password: e.target.value })
                        }
                     />
                  </div>
                  <button
                     type="submit"
                     className="inline-block w-full py-4 px-6 mb-6 text-center text-lg leading-6 text-white font-extrabold bg-indigo-800 hover:bg-indigo-900 border-3 border-indigo-900 shadow rounded transition duration-200"
                  >
                     Criar conta
                  </button>

                  <p className="text-center font-extrabold">
                     Já possui uma conta?{' '}
                     <Link
                        href={'/auth/signin'}
                        className="text-indigo-500 hover:underline"
                     >
                        Entrar
                     </Link>
                  </p>
               </form>
            </div>
         </div>
      </div>
   );
}
