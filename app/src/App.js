import React, {Component, useState} from 'react';
import { Button, ButtonGroup, Navbar, Media, Container, Table, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import {connect} from 'react-redux';
import './App.css';
import { bindActionCreators } from 'redux';
import Moment from 'react-moment';

import {fetchOrders, filterByVendorNameAction } from './redux/actions';
import {getOrders, getFilteredOrders, getAllVendorName} from './redux/reducers';

class App extends Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state ={
      dropdownOpen: false,
      // dropdownValue: 'All Supplier',
    };
  }

  componentDidMount() {
    const {fetchOrders} = this.props;
    fetchOrders();
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen : !prevState.dropdownOpen
    }));
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    this.props.filterByVendorNameAction(value);
  }


  render() {

    const {orders, filteredOrders, vendorNames} = this.props;
    let displayOrders = filteredOrders ? filteredOrders : orders;

    const orderList = displayOrders.map(order => {
      let total = (order.total != null && order.total > 0) ? `$${order.total}` : '';
      return <tr key={order.id} >
        <td>{order.orderBuyerStatus}</td>
        <td>
          <Moment format="MMM. DD, YYYY">
            {order.deliveryDay}
          </Moment>
        </td>
        <td style={{whiteSpace: 'nowrap'}}>{order.vendorName}
          {order.isBYOS ? '' : 'Market'}
          {order.isPendingVendorOnboarding ? '1st' : ''}
        </td>
        <td>
          {total}
        </td>
      </tr>
    });

    const suppliersList = vendorNames.map(supplier => {
      return <DropdownItem key={supplier} onClick={this.handleChange} value={supplier} >{supplier}</DropdownItem>
    });

    return (
      <div className="App">
        <Navbar expand="md">
          <Media middle src="http://order.chefhero.com/static/chefhero/images/chefhero_logo_white.png" ></Media>
        </Navbar>
        <Container>
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret>
              All Suppliers
            </DropdownToggle>
            {/*<DropdownToggle>*/}
            {/*  {this.state.dropdownValue}*/}
            {/*</DropdownToggle>*/}
            <DropdownMenu>
              {suppliersList}
            </DropdownMenu>
          </Dropdown>

          <Button color="dark" onClick={this.handleChange}>x Reset Filters</Button>

        </Container>
        <Container>
          <Table className="mt-2">
            <thead>
              <tr>
                <th width="25%">STATUS</th>
                <th width="25%">DELIVERY DAY</th>
                <th width="25%">SUPPLIER</th>
                <th width="25%">TOTAL</th>
              </tr>
            </thead>
            <tbody>
            {orderList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }

}

const mapStateToProps = state => ({
  orders: getOrders(state),
  vendorNames: getAllVendorName(state),
  filteredOrders: getFilteredOrders(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchOrders: fetchOrders,
  filterByVendorNameAction: filterByVendorNameAction,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
