/**
 *  this is an object returned from the IssLocation api
 */
  export interface issNow {
    timestamp?: number;
    iss_position?: IssPosition;
    message?:string;
    note?:string
  } 
  export interface IssPosition {
    longitude?: string;
    latitude?: string;
  }
 
