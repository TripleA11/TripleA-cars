import React, { useState, useEffect } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { useSelector, useDispatch } from 'react-redux'
import { getAllCars } from '../redux/actions/carsActions'
import { Col, Row, Divider, DatePicker, Checkbox } from 'antd'
import { Link } from 'react-router-dom'
import Spinner from '../components/Spinner';
import moment from 'moment'
import { isWithinInterval } from 'date-fns'

const { RangePicker } = DatePicker



function Home() {
    const { cars } = useSelector(state => state.carsReducer)
    const dispatch = useDispatch()
    const [totalCars, setTotalcars] = useState([])

    useEffect(() => {

        dispatch(getAllCars())

    }, [dispatch])

    useEffect(() => {

        setTotalcars(cars)

    }, [cars])
    function setFilter(values){
        var selectedFrom = moment(values[0].$d);
        var selectedTo = moment(values[1].$d);
        var temp = [...cars]; // Add all cars to the temp array by default
        var carsToRemove = [];
    
        for(var car of cars){
            for(var booking of car.bookedTimeSlots){
                var bookingFrom = moment(booking.from, 'MMM DD yyyy HH:mm');
                var bookingTo = moment(booking.to, 'MMM DD yyyy HH:mm');
    
                console.log("Selected From: ", selectedFrom.format());
                console.log("Selected To: ", selectedTo.format());
                console.log("Booking From: ", bookingFrom.format());
                console.log("Booking To: ", bookingTo.format());
    
                var isOverlap = selectedFrom.isBetween(bookingFrom , bookingTo, null, '[]') ||
                                selectedTo.isBetween(bookingFrom , bookingTo, null, '[]') ||
                                bookingFrom.isBetween(selectedFrom , selectedTo, null, '[]') ||
                                bookingTo.isBetween(selectedFrom , selectedTo, null, '[]');
    
                console.log("Is Overlap: ", isOverlap);
    
                if(isOverlap)
                {
                    carsToRemove.push(car);
                    console.log("ANA");
                    break; // No need to check the rest of the bookings for this car
                }
            }
        }
    
        // Remove the cars that have overlapping bookings
        for(var car of carsToRemove){
            var index = temp.indexOf(car);
            if (index > -1) {
                temp.splice(index, 1);
            }
        }
    
        setTotalcars(temp);
    }
    return (
        <DefaultLayout>
            <Row className='mt-3' justify='center'>
                <Col lg={20} sm={24} className='d-flex justify-content-left'>

                    <RangePicker showTime={{ format: 'HH:mm' }} format='MMM DD YYYY HH:mm' onChange={setFilter} />
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
                                    <p> Rent Per Hour {car.rentPerHour}/-</p>
                                </div>


                                <div>
                                    <button className="btn1 mr-2"><Link to={`/booking/${car._id}`}>Book Now</Link></button>
                                </div>
                            </div>
                        </div>

                    </Col>

                })}
            </Row>
        </DefaultLayout>

    )

}
export default Home