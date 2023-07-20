import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { stockMarketAnalysisValidationSchema } from 'validationSchema/stock-market-analyses';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.stock_market_analysis
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getStockMarketAnalysisById();
    case 'PUT':
      return updateStockMarketAnalysisById();
    case 'DELETE':
      return deleteStockMarketAnalysisById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getStockMarketAnalysisById() {
    const data = await prisma.stock_market_analysis.findFirst(
      convertQueryToPrismaUtil(req.query, 'stock_market_analysis'),
    );
    return res.status(200).json(data);
  }

  async function updateStockMarketAnalysisById() {
    await stockMarketAnalysisValidationSchema.validate(req.body);
    const data = await prisma.stock_market_analysis.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteStockMarketAnalysisById() {
    const data = await prisma.stock_market_analysis.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
