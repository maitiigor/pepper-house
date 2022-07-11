import { Timestamp } from "firebase/firestore";

export interface userProps {
   id: string,
   email: string,
   full_name : string,
   address: string,
   phone_number: string,
   created_at: Timestamp,
   updated_at: Timestamp
 }