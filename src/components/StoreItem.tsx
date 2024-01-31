import { Button, Card } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { formatCurrency } from "../utilities/formatCurrency"

type StoreItemProps = {
    id: number,
    name: string,
    EnglishName: string,
    price: number,
    barcode: string,
    imgUrl: string

}


export function StoreItem({ id, name, EnglishName, price, barcode, imgUrl }: StoreItemProps) {
    const { getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart } = useShoppingCart()
    const quantity = getItemQuantity(id)

    return (
        <Card style={{ width: "250px", height: "500px" }}>
        <div style={{ width: "100%", height: "60%", overflow: "hidden" }}>
          <Card.Img
            variant="top"
            src={imgUrl}
            className="card-img-top"
            style={{ objectFit: "contain", width: "100%", height: "100%" }}
          />
        </div>
        <div style={{ padding: "10px" }}>
          <Card.Title style={{ fontSize: "16px" }}>{EnglishName}</Card.Title>
          <Card.Title style={{ fontSize: "16px" }}>{formatCurrency(price)}</Card.Title>
          <Card.Text style={{ fontSize: "12px" }}>
            {name} <br />
            Barcode Number: {barcode} <br />
            Product Number: {id}
          </Card.Text>
        </div>
        <div style={{ position: "absolute", bottom: "10px", width: "100%", padding: "0 10px" }}>
          {quantity === 0 ? (
            <Button className="w-100" style={{ fontSize: "12px" }} onClick={() => increaseCartQuantity(id)}> + Add to Cart </Button>
          ) : (
            <div className="d-flex align-items-center justify-content-between" style={{ gap: ".5rem" }}>
              <div className="d-flex align-items-center" style={{ gap: ".5rem" }}>
                <Button onClick={() => decreaseCartQuantity(id)} style={{ fontSize: "12px" }}>-</Button>
                <div>
                  <span style={{ fontSize: "14px" }}>{quantity}</span> in Cart
                </div>
                <Button onClick={() => increaseCartQuantity(id)} style={{ fontSize: "12px" }}>+</Button>
              </div>
              <Button onClick={() => removeFromCart(id)} variant="danger" size="sm" style={{ fontSize: "12px" }}>
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card>
    )
}
