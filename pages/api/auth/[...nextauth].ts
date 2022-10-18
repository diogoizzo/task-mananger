import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '../../../lib/prisma';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

export default NextAuth({
   adapter: PrismaAdapter(prisma),
   providers: [
      CredentialsProvider({
         id: 'credentials',
         name: 'credentials',
         credentials: {
            email: {
               label: 'Email',
               type: 'email',
               placeholder: 'john@example.com'
            },
            password: { lable: 'Senha', type: 'password' }
         },
         authorize: async (credentials: any) => {
            //função que verifica a existencia do usuário informado nas credenciais, se encontado, compara a senha passada em credencias com a senha do bd, atraves do bcrypt. Tal função deve retnorar o usuário, caso a senha esteja correta, ou null caso incorreta ou o usuário não encontrado.
            try {
               const user = await prisma.user.findFirst({
                  where: {
                     email: credentials?.email
                  }
               });
               if (user !== null) {
                  if (
                     await bcrypt.compare(credentials.password, user.password)
                  ) {
                     return user;
                  } else {
                     console.log('Hash not matched logging in');
                     return null;
                  }
               } else {
                  return null;
               }
            } catch (err) {
               console.log('Authorize error:', err);
               return null;
            }
         }
      })
   ],
   callbacks: {
      jwt: async ({ token, user }) => {
         //esse Callback server para incluir o id do usuario no jwt, posso usar para incluir as informaçoes que eu desejar
         if (user) {
            token.id = user.id;
         }

         return token;
      },
      session: ({ session, token }) => {
         //essa callback inclui a informação desejada na seção do usuário e fica acessível pela useSession()
         if (token) {
            session.id = token.id;
         }
         return session;
      }
   },
   pages: {
      signIn: '/auth/signin',
      signOut: '/auth/signout'
   },
   secret: process.env.SECRET,
   session: { strategy: 'jwt' }
});
