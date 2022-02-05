const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

export const useUSDFormat = (value: number) => formatter.format(value || 0).split('.')[0];

