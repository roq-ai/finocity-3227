import axios from 'axios';
import queryString from 'query-string';
import { TradingAdviceInterface, TradingAdviceGetQueryInterface } from 'interfaces/trading-advice';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getTradingAdvices = async (
  query?: TradingAdviceGetQueryInterface,
): Promise<PaginatedInterface<TradingAdviceInterface>> => {
  const response = await axios.get('/api/trading-advices', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createTradingAdvice = async (tradingAdvice: TradingAdviceInterface) => {
  const response = await axios.post('/api/trading-advices', tradingAdvice);
  return response.data;
};

export const updateTradingAdviceById = async (id: string, tradingAdvice: TradingAdviceInterface) => {
  const response = await axios.put(`/api/trading-advices/${id}`, tradingAdvice);
  return response.data;
};

export const getTradingAdviceById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/trading-advices/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteTradingAdviceById = async (id: string) => {
  const response = await axios.delete(`/api/trading-advices/${id}`);
  return response.data;
};
