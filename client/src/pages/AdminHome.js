import React, { useState, useEffect } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { useSelector, useDispatch } from 'react-redux'
import { deleteCar, getAllCars } from '../redux/actions/carsActions'
import { Col, Row, Divider, DatePicker, Checkbox, Edit } from 'antd'
import { Link } from 'react-router-dom'
import Spinner from '../components/Spinner';
import moment from 'moment'
import { isWithinInterval } from 'date-fns'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, message, Popconfirm } from 'antd'


const { RangePicker } = DatePicker



function AdminHome() {
    const { cars } = useSelector(state => state.carsReducer)
    const dispatch = useDispatch()
    const [totalCars, setTotalcars] = useState([])

    useEffect(() => {

        dispatch(getAllCars())

    }, [dispatch])

    useEffect(() => {

        setTotalcars(cars)

    }, [cars])

    return (
        <DefaultLayout>


            <Row justify='center' gutter={16} className='mt-2' >
                <Col lg={20} sm={24} >
                    <div className='d-flex justify-content-between align-items-center'>
                        <h3 className='mt-1'>Admin Panel</h3>
                        <button className="btn1"><a href="/addcar">ADD CAR</a></button>
                    </div>
                </Col>
            </Row>
            <Row justify='center' gutter={16} >
                {totalCars.map(car => {
                    return <Col lg={5} sm={24} xs={24}>
                        <div className='car p-2 bs1 '>

                            <img src={car.image} className='carimg' />

                            <div className='car-content d-flex align-items-center justify-content-between'>

                                <div>
                                    <p>{car.name}</p>
                                    <p> Rent Per Hour {car.rentPerHour} /-</p>
                                </div>


                                <div className='mr-4'>
                                    <Link to={`/editcar/${car._id}`}><EditOutlined className='mr-3' style={{ color: 'green', cursor: 'pointer' }} /></Link>

                                    <Popconfirm
                                        title="Delete the task"
                                        description="Are you sure to delete this car?"
                                        onConfirm={()=>{dispatch(deleteCar({carid: car._id}))}}
                                        
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <DeleteOutlined style={{ color: 'red', cursor: 'pointer' }} />
                                    </Popconfirm>
                                    

                                </div>
                            </div>
                        </div>

                    </Col>

                })}
            </Row>
        </DefaultLayout>

    )

}
export default AdminHome