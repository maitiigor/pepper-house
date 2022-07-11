import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'
import { orderDetailProps } from './order_detail';
import { userProps } from './user';
import Timestamp = firebase.firestore.Timestamp;

export interface orderProps {
    id: string,
    order_details: Array<orderDetailProps>,
    is_fufilled: boolean,
    payment_reference: string
    total_amount: string,
    created_at: Timestamp,
    updated_at: Timestamp,
    user_id: userProps
}