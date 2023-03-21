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
         const deletedTask = await prisma.tarefa.delete({
            where: {
               id: String(id)
            }
         });
         if (deletedTask) {
            res.status(200).json(deletedTask);
         } else {
            res.status(404).json({ error: 'Not Found' });
         }
      } else {
         res.status(401).send({ message: 'Unauthorized' });
      }
   } else if (req.method === 'PUT') {
      if (token) {
         const updatedTask = await prisma.tarefa.update({
            where: {
               id: String(id)
            },
            data: {
               ...req.body,
               startDate: new Date(req.body.startDate),
               dueDate: new Date(req.body.dueDate)
            }
         });
         if (updatedTask) {
            res.status(200).json(updatedTask);
         } else {
            res.status(404).json({ error: 'Not Found' });
         }
      } else {
         res.status(401).send({ message: 'Unauthorized' });
      }
   } else if (req.method === 'PATCH') {
      if (token) {
         const completedTask = await prisma.tarefa.update({
            where: {
               id: String(id)
            },
            data: {
               startDate: undefined,
               dueDate: undefined,
               title: undefined,
               description: undefined,
               status: 'concluida',
               dueAt: new Date(Date.now())
            }
         });
         if (completedTask) {
            res.status(200).json(completedTask);
         } else {
            res.status(404).json({ error: 'Not Found' });
         }
      } else {
         res.status(401).send({ message: 'Unauthorized' });
      }
   } else {
      res.status(405).send({ message: 'Method not supported' });
   }
}
