import { Button, Offcanvas, OffcanvasTitle, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import storeItems from "../data/items.json"
import { CartItem } from "./CartItem";
import { useContext, useEffect, useState } from "react";
import { AlertContext } from "../utilities/AlertContext";

import {
    PAYMENT_STATUS // export enum PAYMENT_STATUS {SUCCESS = "SUCCESS"}
} from "../constants";

type ShoppingCartProps = {
    isOpen: boolean
}
export function ShoppingCart({ isOpen }: ShoppingCartProps) {
   
    const { setAlert } = useContext(AlertContext);
    const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
     const { closeCart, cartItems} = useShoppingCart()
     const [totalPrice, setTotalPrice] = useState<number>(0)

    const checkout =  () => {
			debugger;
        setIsCheckingOut(true);
        const paymentStatus = makePayment();
        if (paymentStatus == PAYMENT_STATUS.FAILURE) {
            setAlert("error", "Payment failed. Please try again.");
            setIsCheckingOut(false);
            return;
        }

    };
    const makePayment = () => {
        // TODO (#50): Replace with actual payflow
        setAlert("success", `Payment confirmed!`);
        return PAYMENT_STATUS.SUCCESS;
    };
/**
 * Junaid Added this code
 */
    useEffect(()=>{
       const sum:number = formatCurrency(
            cartItems.reduce((total, CartItem) => {
                const item = storeItems.find(i => i.id === CartItem.id)
                const cartTotal = total + (item?.price || 0) * CartItem.quantity
                return cartTotal
                
            }, 0)
        );

        setTotalPrice(sum)
    },[cartItems])

    return (
        <Offcanvas show={isOpen} onHide={closeCart} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
            <Stack gap={3}>
                    {cartItems.map(item => (
                        <CartItem key={item.id} {...item} />
                    ))}
                    <div className="ms-auto fw-bold fs-5">
                        Total {" "}
                        {totalPrice}
                    </div>     
                </Stack>

                <Button
                        variant="contained"
                        color="primary"
                        onClick={checkout}
                        className="checkoutBtn"
												>
                        Checkout
                    </Button>
            </Offcanvas.Body>
        </Offcanvas>
    )
}
