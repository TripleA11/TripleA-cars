
import DefaultLayout from '../components/DefaultLayout'
import { useParams } from 'react-router-dom';
import { getAllCars } from '../redux/actions/carsActions'
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row, Divider, DatePicker, Checkbox, Modal } from 'antd'
import moment from 'moment'
import { bookCar } from '../redux/actions/bookingActions';
import StripeCheckout from 'react-stripe-checkout';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles


const { RangePicker } = DatePicker
function BookingCar({ match }) {
    const { carid } = useParams();
    const { cars } = useSelector(state => state.carsReducer)
    const [car, setcar] = useState({})
    const dispatch = useDispatch()
    const [from, setFrom] = useState()
    const [to, setTo] = useState()
    const [totalHours, setTotalHours] = useState(0)
    const [driver, setdriver] = useState(false)
    const [totalAmount, setTotalAmount] = useState(0)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        dispatch(getAllCars())
        if (cars.length > 0) {
            setcar(cars.find(o => o._id == carid))
        }
    }, [cars, carid, dispatch])

    useEffect(() => {

        setTotalAmount((totalHours * car.rentPerHour))
        if (driver) {
            setTotalAmount(totalAmount + (30 * totalHours))
        }

    }, [driver, totalHours])

    function selectTimeSlots(values) {
        setFrom(values[0].toDate())
        setTo(values[1].toDate())
        setTotalHours(values[1].diff(values[0], 'hours'))
    }


    function onToken(token){
        const reqObj = {
            token,
            user: JSON.parse(localStorage.getItem('user'))._id,
            car: car._id,
            totalHours,
            totalAmount,
            driverRequired: driver,
            bookedTimeSlots: {
                from: moment(from).format('MMM DD YYYY HH:mm'),
                to: moment(to).format('MMM DD YYYY HH:mm')
            }


        }
        dispatch(bookCar(reqObj))
    }

    return (
        <DefaultLayout>
            <Row justify='center' className='d-flex align-items-center' style={{ minHeight: '90vh' }}>
                <Col lg={10} sm={24} xs={24}>
                    <img src={car.image} className="carimg2 bs1" data-aos='flip-left' data-aos-duration='1000' />

                </Col>
                <Col lg={10} sm={24} xs={24} className="text-right">
                    <Divider type='horizontal' dashed={true} className="custom-divider">Car Info</Divider>
                    <div style={{ textAlign: 'right' }}>
                        <p>{car.name}</p>
                        <p>{car.rentPerHour} Rent Per hour /-</p>
                        <p>Fuel Type: {car.fuelType}</p>
                        <p>Max Persons : {car.capacity}</p>
                    </div>
                    <Divider type='horizontal' dashed={true} className="custom-divider">Select Time Slots</Divider>
                    <RangePicker showTime={{ format: 'HH:mm' }} format='MMM DD YYYY HH:mm' onChange={selectTimeSlots} />
                    <br />
                    <button className='btn1 mt-2' onClick={() => { setShowModal(true) }}>See Booked Slots</button>
                    <div>
                        <p>Total Hours : <b>{totalHours}</b></p>
                        <p>Rent Per Hour :<b>{car.rentPerHour}</b></p>
                        <Checkbox onChange={(e) => {
                            if (e.target.checked) {
                                setdriver(true);

                            }
                            else {
                                setdriver(false)
                            }
                        }}>Driver Required </Checkbox>

                        <h3>Total Amount : {totalAmount} </h3>

                        <StripeCheckout
                            shippingAddress
                            token={onToken}
                            amount={totalAmount * 100}
                            stripeKey="pk_test_51OFepRKMehIhE73GAwPQzQlNYAaV1RussxgezAi7IeP1VnAMnmoI2Rh946ldjok2LBBpeUlXe1vJL7ibLwcpmjmV00xgLZYvbp"
                        >
                             <button className='btn1'>Book now</button>
                             </StripeCheckout>
                       </div>



                </Col>
            </Row>

            <Modal visible={showModal} closable={false} footer={false} title='Booked time slots '>

                {car && (<div className='p-2'>

                    {car.bookedTimeSlots && car.bookedTimeSlots.map(slot => {
                        return <button className='btn1 mt-2'>{slot.from} - {slot.to}</button>
                    })}

                    <div className='text-right mt-5'>

                        <button className='btn1' onClick={() => { setShowModal(false) }}>CLOSE</button>
                    </div>


                </div>)}

            </Modal>
        </DefaultLayout>

    )

}
export default BookingCar