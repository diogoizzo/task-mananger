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
         const deletedProject = await prisma.projeto.delete({
            where: {
               id: String(id)
            }
         });
         if (deletedProject) {
            res.status(200).json(deletedProject);
         } else {
            res.status(404).json({ error: 'Not Found' });
         }
      } else {
         res.status(401).send({ message: 'Unauthorized' });
      }
   } else if (req.method === 'PUT') {
      if (token) {
         const updatedProject = await prisma.projeto.update({
            where: {
               id: String(id)
            },
            data: {
               ...req.body,
               startDate: new Date(req.body.startDate),
               dueDate: new Date(req.body.dueDate)
            }
         });
         if (updatedProject) {
            res.status(200).json(updatedProject);
         } else {
            res.status(404).json({ error: 'Not Found' });
         }
      } else {
         res.status(401).send({ message: 'Unauthorized' });
      }
   } else if (req.method === 'PATCH') {
      if (token) {
         const completedProject = await prisma.projeto.update({
            where: {
               id: String(id)
            },
            data: {
               startDate: undefined,
               dueDate: undefined,
               title: undefined,
               description: undefined,
               dueAt: new Date(Date.now())
            }
         });
         if (completedProject) {
            res.status(200).json(completedProject);
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
