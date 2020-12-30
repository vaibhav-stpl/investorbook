export const numberWithCommas = (x) =>  {
    return x?.toFixed(2)?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",") || 0;
}