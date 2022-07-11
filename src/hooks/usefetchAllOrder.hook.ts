import { FC, useEffect, useState } from "react";
import { db } from "../config/firebase";
import { orderProps } from "../models/order";
import { userProps } from "../models/user";

const usefetchAllOrder = (): any => {
  const [orderList, setOrderList] = useState<Array<orderProps>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  var user: userProps;
  const userDetails = async (id: string): Promise<userProps> => {
    await db
      .collection("users")
      .doc(id)
      .get()
      .then((snapshot) => {
        user = {
          id: snapshot.id,
          address: snapshot.data()!.address,
          email: snapshot.data()!.email,
          created_at: snapshot.data()!.created_at,
          full_name: snapshot.data()!.full_name,
          phone_number: snapshot.data()!.phone_number,
          updated_at: snapshot.data()!.updated_at,
        };
      });
    return user;
  };

  useEffect(() => {
    db.collection("orders").onSnapshot((snapshot) => {
      console.log(snapshot.docs.length);
      var order: Array<orderProps> = [];
      snapshot.forEach(async (doc) =>
        order.push({
          id: doc.id,
          is_fufilled: doc.data().is_fufilled,
          payment_reference: doc.data().payment_reference,
          total_amount: doc.data().total_amount,
          created_at: doc.data().created_at,
          updated_at: doc.data().updated_at,
          user_id: await userDetails(doc.data()!.user_id),
          order_details: doc.data().order_details,
        })
      );
      setOrderList(order);
      setTimeout(() => {
        setIsLoading(false);
        setIsError(false);
      }, 500);
    });

    /* return () => {
      second
    } */
  }, []);

  return [orderList, isLoading, isError] as const;
};

export default usefetchAllOrder;
