import React from 'react';
import { Table, Container, Placeholder, CardText } from 'react-bootstrap';

const PlaceHolder = () => {
  return (
    <Container className="table-container">
      <Table striped responsive className="border mt-1">
        <thead>
          <tr>
            <th>
              <Placeholder as={CardText} animation="glow">
                <Placeholder xs={8} />
              </Placeholder>
            </th>
            <th>
              <Placeholder as={CardText} animation="glow">
                <Placeholder xs={8} />
              </Placeholder>
            </th>
            <th>
              <Placeholder as={CardText} animation="glow">
                <Placeholder xs={8} />
              </Placeholder>
            </th>
            <th>
              <Placeholder as={CardText} animation="glow">
                <Placeholder xs={8} />
              </Placeholder>
            </th>
            <th>
              <Placeholder as={CardText} animation="glow">
                <Placeholder xs={8} />
              </Placeholder>
            </th>
            <th>
              <Placeholder as={CardText} animation="glow">
                <Placeholder xs={8} />
              </Placeholder>
            </th>
            <th>
              <Placeholder as={CardText} animation="glow">
                <Placeholder xs={8} />
              </Placeholder>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default PlaceHolder;
