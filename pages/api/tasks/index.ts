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
         const tasks = await prisma.task.findMany({
            where: {
               userId: String(token.id)
            },
            include: {
               dependencies: true,
               isDependencyOf: true
            }
         });
         if (tasks) {
            res.status(200).json(tasks);
         } else {
            res.status(404).json({ error: 'Not Found' });
         }
      } else {
         res.status(401).send({ message: 'Unauthorized' });
      }
   } else if (req.method === 'POST') {
      const token = await getToken({ req });
      if (token) {
         const { title, description, status, startDate, dueDate, project } =
            req.body;
         const hasProject =
            project === 'Não pertence a nenhum projeto'
               ? null
               : String(project);
         const tarefa = await prisma.task.create({
            data: {
               title: title,
               description: description,
               status: status,
               startDate: new Date(startDate),
               dueDate: new Date(dueDate),
               userId: String(token.id),
               projectId: hasProject
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
