import axios from 'axios';
import queryString from 'query-string';
import { StockMarketAnalysisInterface, StockMarketAnalysisGetQueryInterface } from 'interfaces/stock-market-analysis';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getStockMarketAnalyses = async (
  query?: StockMarketAnalysisGetQueryInterface,
): Promise<PaginatedInterface<StockMarketAnalysisInterface>> => {
  const response = await axios.get('/api/stock-market-analyses', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createStockMarketAnalysis = async (stockMarketAnalysis: StockMarketAnalysisInterface) => {
  const response = await axios.post('/api/stock-market-analyses', stockMarketAnalysis);
  return response.data;
};

export const updateStockMarketAnalysisById = async (id: string, stockMarketAnalysis: StockMarketAnalysisInterface) => {
  const response = await axios.put(`/api/stock-market-analyses/${id}`, stockMarketAnalysis);
  return response.data;
};

export const getStockMarketAnalysisById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(
    `/api/stock-market-analyses/${id}${query ? `?${queryString.stringify(query)}` : ''}`,
  );
  return response.data;
};

export const deleteStockMarketAnalysisById = async (id: string) => {
  const response = await axios.delete(`/api/stock-market-analyses/${id}`);
  return response.data;
};
