import React from 'react'
import { Icon, Label, Menu, Table } from 'semantic-ui-react'

const TableExamplePagination = () => (
  <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell> Transaction no.</Table.HeaderCell>
        <Table.HeaderCell> Seller Address</Table.HeaderCell>
        <Table.HeaderCell> Buyer Address</Table.HeaderCell>
        <Table.HeaderCell>Transaction size(in bytes)</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
      <Table.Cell>1</Table.Cell>
        <Table.Cell>
          bc1qwqdg6squsna38e467
        </Table.Cell>
        <Table.Cell>sdgfdln1232nv</Table.Cell>
        <Table.Cell> 64</Table.Cell>
      </Table.Row>
      <Table.Row>
      <Table.Cell>2</Table.Cell>
        <Table.Cell>saeeirnf343fj</Table.Cell>
        <Table.Cell>dggdogrjpr4tt4</Table.Cell>
        <Table.Cell>128</Table.Cell>
      </Table.Row>
      <Table.Row>
      <Table.Cell>3</Table.Cell>
        <Table.Cell>wqfsegngnb987</Table.Cell>
        <Table.Cell>edfgjffg03u4</Table.Cell>
        <Table.Cell>70</Table.Cell>
      </Table.Row>
    </Table.Body>

    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan='4'>
          <Menu floated='right' pagination>
            <Menu.Item as='a' icon>
              <Icon name='chevron left' />
            </Menu.Item>
            <Menu.Item as='a'>1</Menu.Item>
            <Menu.Item as='a'>2</Menu.Item>
            <Menu.Item as='a'>3</Menu.Item>
            <Menu.Item as='a'>4</Menu.Item>
            <Menu.Item as='a' icon>
              <Icon name='chevron right' />
            </Menu.Item>
          </Menu>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  </Table>
)

export default TableExamplePagination;