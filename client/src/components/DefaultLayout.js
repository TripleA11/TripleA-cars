import React from 'react'
import { Button, Dropdown, Space,Row,Col } from 'antd';

function DefaultLayout(props) {
    const user=JSON.parse(localStorage.getItem('user'))

    const items = [
        {
            key: '1',
            label: (
                <a href="/">
                    Home
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a  href="/userbookings">
                    Bookings
                </a>
            ),
        },
        {
            key: '3',
            label: (
                <a  href="/admin">
                    Admin
                </a>
            ),
        },
        {
            key: '4',
            label: (
              <li onClick={() => {
                localStorage.removeItem('user');
                window.location.href = '/login';
              }}>
                 Logout
              </li>
            ),
          }
          
    ];

    return (
        <div>
            <div className="header bs1">
                <Row gutter={16} justify='center'>
                    <Col lg={20} sm={24} xs={24}>
                    <div className="d-flex justify-content-between">
                    <h1>TripleACars</h1>

                    <Dropdown
                        menu={{
                            items,
                        }}
                        placement="bottomLeft"
                    >
                        <Button>{user.username}</Button>
                    </Dropdown>

                </div>
                    </Col>
                </Row>
               

            </div>
            <div className="content">
                {props.children}
            </div>

            <div className='footer text-center'>
            <hr/>
                <p>Designed and Developed By </p>

                
                <p>Anthony Abou Ali</p>

            </div>
        </div>

    )

}
export default DefaultLayout