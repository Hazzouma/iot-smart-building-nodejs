import React from "react";
import { Container, Row, Col, Breadcrumb, BreadcrumbItem } from "reactstrap";

function BreadCrumb(props) {
  return (
    <>
      <Container>
        <div className="page-title">
          <Row>
            <Col xs="6">
              <h2 className="m-0">{props.main}</h2>
            </Col>
            <Col xs="6">
              <Breadcrumb>
                {props.time && <BreadcrumbItem>{props.time}</BreadcrumbItem>}
                <BreadcrumbItem>{props.main}</BreadcrumbItem>
                <BreadcrumbItem active>{props.child}</BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
}

export default BreadCrumb;
