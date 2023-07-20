import * as yup from 'yup';

export const stockMarketAnalysisValidationSchema = yup.object().shape({
  analysis: yup.string().required(),
  analyst_id: yup.string().nullable(),
});
