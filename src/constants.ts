
export enum PAYMENT_STATUS {
  AWAITING = "AWAITING", // awaiting payment, not yet initiated
  SUBMITTED = "SUBMITTED", // pending transaction
  SUCCESS = "SUCCESS", // completed transaction
  FAILURE = "FAILURE",
}
