import { Col, Row } from "react-bootstrap"
import { StoreItem } from "../components/StoreItem"
import Items from "../data/items.json"

export function Store() {

    return (
        <>
            <h1>Product catalog</h1>

            <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-3">
                {Items.map(item => (
                    <Col key={item.id}>
                        <StoreItem {...item} />
                    </Col>
                ))}
            </Row>
        </>
    )
}