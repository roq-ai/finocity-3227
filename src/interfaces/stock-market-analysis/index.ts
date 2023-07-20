import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface StockMarketAnalysisInterface {
  id?: string;
  analysis: string;
  analyst_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface StockMarketAnalysisGetQueryInterface extends GetQueryInterface {
  id?: string;
  analysis?: string;
  analyst_id?: string;
}
