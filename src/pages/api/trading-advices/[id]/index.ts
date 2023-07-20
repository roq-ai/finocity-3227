import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { tradingAdviceValidationSchema } from 'validationSchema/trading-advices';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.trading_advice
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getTradingAdviceById();
    case 'PUT':
      return updateTradingAdviceById();
    case 'DELETE':
      return deleteTradingAdviceById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getTradingAdviceById() {
    const data = await prisma.trading_advice.findFirst(convertQueryToPrismaUtil(req.query, 'trading_advice'));
    return res.status(200).json(data);
  }

  async function updateTradingAdviceById() {
    await tradingAdviceValidationSchema.validate(req.body);
    const data = await prisma.trading_advice.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteTradingAdviceById() {
    const data = await prisma.trading_advice.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
