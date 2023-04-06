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
         const projects = await prisma.projeto.findMany({
            where: {
               userId: String(token.id)
            }
         });
         if (projects) {
            res.status(200).json(projects);
         } else {
            res.status(404).json({ error: 'Not Found' });
         }
      } else {
         res.status(401).send({ message: 'Unauthorized' });
      }
   } else if (req.method === 'POST') {
      const token = await getToken({ req });
      if (token) {
         const { title, description, startDate, dueDate } = req.body;
         const tarefa = await prisma.projeto.create({
            data: {
               title: title,
               description: description,
               startDate: new Date(startDate),
               dueDate: new Date(dueDate),
               userId: String(token.id)
            }
         });
         res.status(201).json(tarefa);
      } else {
         return res
            .status(405)
            .json({ error: 'Type of request not supported' });
      }
   }
}
