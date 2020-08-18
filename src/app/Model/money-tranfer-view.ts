import { Bank } from './bank';
import { RecipientAccount } from './recipient-account';
import { SourceAccount } from './source-account';
export interface MoneyTranferView{
    id : number,
    moneyTranferDate : Date,
    sourceAccountEntity : SourceAccount,
    recipientAccountEntity : RecipientAccount,
    bankEntity : Bank,
    amount : number,
    content : string,
    payer : string,
    moneyTranferDateStr : string,
    status : string
}