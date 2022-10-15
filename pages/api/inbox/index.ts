import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import prisma from '../../../lib/prisma';

export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse
) {
   if (req.method === 'GET') {
      const token = await getToken({ req });
      if (token) {
         const inbox = await prisma.inbox.findMany({
            where: {
               userId: String(token.id)
            }
         });
         if (inbox) {
            res.status(200).json(inbox);
         } else {
            res.status(404).json({ error: 'Not Found' });
         }
      } else {
         res.status(401).send({ message: 'Unauthorized' });
      }
   } else if (req.method === 'POST') {
      console.log('Entrei aqui');
      const token = await getToken({ req });
      if (token) {
         const { title } = req.body;
         const inbox = await prisma.inbox.create({
            data: {
               title: title,
               userId: String(token.id)
            }
         });
         console.log(inbox);
         res.status(201).json(inbox);
      } else {
         return res
            .status(405)
            .json({ error: 'Type of request not supported' });
      }
   }
}
