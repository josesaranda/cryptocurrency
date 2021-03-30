export function wait(milliseconds: number): Promise<boolean> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(true);
        }, milliseconds);
    });
}

export function btcToDollars(btc: number, exchange: number): number{
    return btc * exchange;
}