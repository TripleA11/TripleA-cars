import React ,{useEffect ,useState} from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { Col ,Row, Form ,Input } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { addCar, editCar, getAllCars } from '../redux/actions/carsActions'
import { useParams } from 'react-router-dom';

function EditCar({match}){

    const {cars}=useSelector(state=> state.carsReducer)
    const dispatch=useDispatch()
    const [car,setcar ]=useState()
    const [totalcars ,settotalcars]=useState([])
    const { carid } = useParams();
     
 

    useEffect(() => {
        console.log('useEffect triggered');
        console.log('carid:', carid);
        console.log('cars:', cars);
        if (cars.length === 0) {
            dispatch(getAllCars());
        }
        else{
            settotalcars(cars)
            const foundCar = cars.find((o)=>o._id==carid);
            console.log('foundCar:', foundCar);
            setcar(foundCar);
        }
    }, [cars]);
    
    console.log('car:', car);
    

    function onFinish(values){
        values._id=car._id
        dispatch(editCar(values))
        console.log(values)
    }
    return(
        <DefaultLayout>

            <Row justify='center mt-5'>
                <Col lg={12} sm={24} xs={24}>
                    
                    {totalcars.length>0 && car &&   (<Form initialValues={car} className='bs1 p-2' layout='vertical' onFinish={onFinish}>
                        <h3>Edit Car</h3>
                        

                        <hr/>
                        <Form.Item name='name' label='Car name ' rules={[{required:true}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name='image' label='Image url ' rules={[{required:true}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name='rentPerHour' label='Rent per hour' rules={[{required:true}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name='capacity' label='Capacity' rules={[{required:true}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name='fuelType' label='Fuel Type ' rules={[{required:true}]}>
                            <Input/>
                        </Form.Item>

                        <button className='btn1'>EDIT CAR</button>
                    </Form>)}
                </Col>
            </Row>
        </DefaultLayout>
    )
}

export default EditCar