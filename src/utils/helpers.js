// Utility function to extract key metrics from the CrUX response
export const extractMetrics = (record) => {
  const metrics = record?.metrics || {};
  const result = [];

  for (const [key, value] of Object.entries(metrics)) {
    const p75 = value?.percentiles?.p75 ?? null;
    const histogram = value?.histogram ?? null;
    const fractions = value?.fractions ?? null;
    if (p75 !== null || histogram || fractions) {
      result.push({ key, p75, histogram, fractions });
    }
  }

  return result;
};
