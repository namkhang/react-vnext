import { Input } from '@components/index';
import { IHomePageProps, IHomePage } from '@interfaces/pages/home';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Stack } from 'react-bootstrap';
import Img from 'react-cool-img';
import { images } from '@utils/constants';
import Loader from '../components/layouts/Loader'
import { actionLoadMoreData, actionSearchData, setLoader } from '@redux/actions/api';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxStates } from '@redux/reducers';

interface Params {
    search: string;
}

const HomePage: IHomePage<IHomePageProps> = () => {
    const [step, setStep] = useState(1);
    const [load , setLoad] = useState(false)
    const [search, setSearch] = useState<string>('');
    const dispatch = useDispatch()
    const { findData } = useSelector((states: ReduxStates) => states);


    const handleOnChange = async (field: string, value: string) => {
        setSearch(value);
        dispatch(setLoader(true))
        await dispatch(actionSearchData(value))
        dispatch(setLoader(false))
        
  


    };



    const handleScroll = (e : any)=> {
            if(window.innerHeight + e.target.documentElement.scrollTop + 1 >= e.target.documentElement.scrollHeight){
                 setLoad(true)
                 
                    
            }
            
    }

    useEffect(()=> {
        async function loadData(){
            if(load){
                dispatch(setLoader(true))  
                await dispatch(actionLoadMoreData(search , step))
                setStep(step + 1)
                setLoad(false)
                dispatch(setLoader(false))
            }
        }
        loadData()
            
    } , [load])

    useEffect(() => {
            window.addEventListener('scroll' , handleScroll)
    } , [])


    return (
        <>
        <Loader></Loader>
     
        <Container className="pages__home container">
            <Row>
                <Col>
                    <h1>Movie</h1>
                    <Stack className="p-0">
                        <Input
                            name="search"
                            type="text"
                            value={search || ''}
                            placeholder="Enter name"
                            onChange={(value: string) => handleOnChange('search', value)}
                        />
                    </Stack>
                </Col>
                <Row>
                    {findData?.map((item : any, index: number) => {
                        return (
                            <>
                                <Col xs={3} key={index}>
                                    <div className="card mt-3">
                                        <Img src={images.API_IMG + item.poster_path} />
                                        <h6>{item.name}</h6>
                                    </div>
                                </Col>
                            </>
                        );
                    })}
                </Row>
            </Row>
        </Container>
        </>
    );
};

export default HomePage;
