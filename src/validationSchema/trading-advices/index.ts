import * as yup from 'yup';

export const tradingAdviceValidationSchema = yup.object().shape({
  advice: yup.string().required(),
  financial_advisor_id: yup.string().nullable(),
});
