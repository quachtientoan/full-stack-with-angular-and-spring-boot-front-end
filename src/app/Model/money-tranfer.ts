export interface MoneyTranfer{
    id : number,
    moneyTranferDate : Date,
    sourceAccountId : number,
    recipientAccountId : number,
    receivingBank : number,
    amount : number,
    content : string,
    payer : string
}