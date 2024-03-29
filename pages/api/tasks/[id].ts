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
         const deletedTask = await prisma.task.delete({
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
         let updatedTask;
         if (req.body.hasOwnProperty('newDependencies')) {
            const { newDependencies } = req.body;
            updatedTask = await prisma.task.update({
               where: {
                  id: String(id)
               },
               data: {
                  dependencies: {
                     set: newDependencies
                  }
               },
               include: {
                  dependencies: true,
                  isDependencyOf: true
               }
            });
         } else {
            const { project, ...form } = req.body;
            const hasProject =
               project === 'Não pertence a nenhum projeto' || project === ' '
                  ? null
                  : String(project);

            updatedTask = await prisma.task.update({
               where: {
                  id: String(id)
               },
               data: {
                  ...form,
                  projectId: hasProject,
                  startDate: new Date(req.body.startDate),
                  dueDate: new Date(req.body.dueDate)
               }
            });
         }
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
         const { status } = req.body;
         const completedTask = await prisma.task.update({
            where: {
               id: String(id)
            },
            data: {
               startDate: undefined,
               dueDate: undefined,
               title: undefined,
               description: undefined,
               status: status ? status : 'concluida',
               dueAt: new Date(Date.now())
            },
            include: {
               dependencies: true,
               isDependencyOf: {
                  include: {
                     dependencies: true
                  }
               }
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
