import { Col, Row } from "react-bootstrap"
import { StoreItem } from "../components/StoreItem"
import Items from "../data/items.json"

export function Store() {

    return (
        <>
            <h1>Store</h1>  

            <Row md={3} xs={2} lg={5} className="g-3" >
                {Items.map(item => (
                    <Col key={item.id}>
                        <StoreItem{...item} />
                    </Col>
                ))}
            </Row>
        </>
    )
}