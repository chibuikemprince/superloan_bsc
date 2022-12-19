enum STATUSCODE_ENUM {
    UNKNOWN_ERROR,
    FORM_REQUIREMENT_ERROR,
    PAGE_NOT_FOUND, 
    RESOURCE_NOT_FOUND, 
    RESOURCE_ALREADY_EXIST,
    SUCCESS,
    LOAN_PAID,
    LOAN_NOT_PAID,
    NO_LOAN_OWED,
    NO_BANK_ACCOUNT,
    LOW_CREDIT_SCORE
  }
  
  export type RESPONSE_TYPE = {
    message: string;
    data: any[];
    statusCode: STATUSCODE;
    status: number;
  };
  
 

  export type categoryData = { 
    name:string
    
  
  }

export type categoryUpdateSkillAction = "add" | "remove"
  export type  VettingTestFeedBack = {
    status:"FAILED" | "PASSED", 
  retake_days?:number
};
  export type STATUSCODE = keyof typeof STATUSCODE_ENUM;
  