export const convertPLNToUSD = (PLN) => {

  
  if (typeof PLN === 'undefined') {
    return NaN;
  }
  else if (typeof PLN !== 'number' && typeof PLN !== 'string') {
    return 'Error';
  }
  else if (typeof PLN !== 'number') {
    return NaN;
  }
  
  const PLNtoUSD = Math.max(PLN / 3.5, 0);
  
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });
  
  return formatter.format(PLNtoUSD).replace(/\u00a0/g, ' ');
}