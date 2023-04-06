import { signIn } from 'next-auth/react';
import Link from 'next/link';
import router from 'next/router';
import { FormEvent, useState } from 'react';

interface Form {
   email: string;
   password: string;
}

export default function SignIn() {
   const [form, setForm] = useState<Form>({
      email: '',
      password: ''
   });

   async function handleSubmit(e: any) {
      e.preventDefault();
      e.stopPropagation();
      const { email, password } = form;
      const restul = await signIn('credentials', {
         email,
         password,
         callbackUrl: '/',
         redirect: true
      });
   }

   return (
      <main className="h-[100vh] flex justify-center items-center bg-indigo-100 relative overflow-hidden">
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
                     Entrar
                  </h2>
                  <p className="text-lg font-extrabold leading-7 text-indigo-500">
                     Preencha as informações abaixo para entrar na sua conta.
                  </p>
               </div>
               <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                     <label className="block mb-2 font-extrabold">Email</label>
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
                  <button className="inline-block w-full py-4 px-6 mb-6 text-center text-lg leading-6 text-white font-extrabold bg-indigo-800 hover:bg-indigo-900 border-3 border-indigo-900 shadow rounded transition duration-200">
                     Entrar
                  </button>
                  <p className="text-center font-extrabold">
                     Ainda não possui uma conta?{' '}
                     <Link
                        href={'/auth/signup'}
                        className="text-indigo-500 hover:underline"
                     >
                        Cadastre-se
                     </Link>
                  </p>
               </form>
            </div>
         </div>
      </main>
   );
}
