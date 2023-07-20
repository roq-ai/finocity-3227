const mapping: Record<string, string> = {
  organizations: 'organization',
  'stock-market-analyses': 'stock_market_analysis',
  'trading-advices': 'trading_advice',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
