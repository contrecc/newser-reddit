import React from 'react';
import { Col, Card, CardImg, CardTitle, Row, CardBody } from 'reactstrap';

export default props => {
  const { data } = props;

  const dataCards = data.map(function(item) {
    return (
      <Col
        xs="12"
        sm="6"
        md="4"
        lg="3"
        key={item.permalink}
        style={{ marginBottom: '10px', marginTop: '10px' }}
      >
        <a
          href={item.permalink}
          style={{ color: 'inherit', textDecoration: 'none' }}
          target="_blank"
        >
          <Card
            style={{
              width: '240px',
              height: '160px'
            }}
            className="hover-border"
          >
            <CardImg
              style={{ width: '100%', height: '100%', overflow: 'hidden' }}
              src={item.image}
              alt="Image of New Subreddit Post"
            />
            <CardBody>{item.title}</CardBody>
          </Card>
        </a>
      </Col>
    );
  });

  return (
    <Row style={{ paddingTop: '20px' }} className="h-100">
      {dataCards}
    </Row>
  );
};
