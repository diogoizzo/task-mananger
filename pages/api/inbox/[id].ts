import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import prisma from '../../../lib/prisma';

export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse
) {
   const token = await getToken({ req });
   const { id } = req.query;

   if (req.method === 'DELETE') {
      if (token) {
         const deletedInbox = await prisma.inbox.delete({
            where: {
               id: String(id)
            }
         });
         if (deletedInbox) {
            res.status(200).json(deletedInbox);
         } else {
            res.status(404).json({ error: 'Not Found' });
         }
      } else {
         res.status(401).send({ message: 'Unauthorized' });
      }
   } else if (req.method === 'PUT') {
      const { data } = req.body;
      if (token) {
         const updatedInbox = await prisma.inbox.update({
            where: {
               id: String(id)
            },
            data: data
         });
         if (updatedInbox) {
            res.status(200).json(updatedInbox);
         } else {
            res.status(404).json({ error: 'Not Found' });
         }
      } else {
         res.status(401).send({ message: 'Unauthorized' });
      }
   } else {
      res.status(401).send({ message: 'Method not supported' });
   }
}
