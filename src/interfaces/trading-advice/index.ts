import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface TradingAdviceInterface {
  id?: string;
  advice: string;
  financial_advisor_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface TradingAdviceGetQueryInterface extends GetQueryInterface {
  id?: string;
  advice?: string;
  financial_advisor_id?: string;
}
