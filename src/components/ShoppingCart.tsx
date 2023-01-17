import { Button, Offcanvas, OffcanvasTitle, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import storeItems from "../data/items.json"
import { CartItem } from "./CartItem";
import { useContext, useState } from "react";
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

    const checkout = async () => {
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
                        {formatCurrency(
                            cartItems.reduce((total, CartItem) => {
                                const item = storeItems.find(i => i.id === CartItem.id)
                                const cartTotal = total + (item?.price || 0) * CartItem.quantity
                               console.log("This is carTotal value " + cartTotal) 
                                return cartTotal
                                
                            }, 0)
                        )}
                    </div>     
                </Stack>

                <Button
                        variant="contained"
                        color="primary"
                        onClick={checkout}
                        className="checkoutBtn"
                        disabled={cartItems.length == 0 || isCheckingOut}>
                        Checkout
                    </Button>
            </Offcanvas.Body>
        </Offcanvas>
    )
}
