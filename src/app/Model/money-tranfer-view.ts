export interface MoneyTranferView{
    id : number,
    moneyTranferDate : Date,
    sourceAccountName : string,
    recipientAccountName : string,
    receivingBank : string,
    amount : number,
    content : string,
    payer : string
}