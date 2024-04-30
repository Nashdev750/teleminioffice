
import { useDispatch } from 'store';
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
// material-ui
import {
    Button,
    Grid,
    Stack,
    Alert
} from '@mui/material';
// project imports 
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { openSnackbar } from 'store/slices/snackbar';
import { gridSpacing } from 'store/constant';

import http from "../../../../http-commom";
// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';

// Services  
import OrderService from 'services/order.service';


const CreateOrder = () => {
    const navigate = useNavigate();
    const [feedingDays, setFeedingDays] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const dispatch = useDispatch();
    const location = useLocation();

    const formik = useFormik({
        initialValues: {
            month: ''
        },
        onSubmit: () => {
            const orderList = {
                school_id: [],
                month: `${selectedMonth} ${new Date().getFullYear()}`,
                level: "Primary",
                status: "Created"
            }
            try {
                http.post('/report/calculate', orderList).then((response) => {
                    if (response.status === 200) {
                        response.data?.orders?.forEach(element => {
                            element.menuItems.sort((a, b) => (a.group > b.group) ? 1 : -1);
                        })
                        dispatch(openSnackbar({
                            open: true,
                            message: 'Orders Calculated successfully',
                            variant: 'alert',
                            alert: {
                                color: 'success'
                            },
                            close: true
                        }));

                        navigate("/input-data/month-order-detail", { state: response.data?.orders });
                    }
                })
            } catch (e) {
                console.log(e)
            }
        }
    });

    const GetFeedingDay = async (month) => {
        const feedingDays = await OrderService.GetFeedingSchoolDay(`${month} ${new Date().getFullYear()}`);
        setFeedingDays(feedingDays);
        setSelectedMonth(month);
    }

    useEffect(() => {
        if (location.state !== null) {
            GetFeedingDay(location.state);
        }
    }, [location]);


    return (
        <MainCard>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={4}>
                        <Alert variant="outlined" severity="success">
                            <strong> Feeding days {feedingDays} in {selectedMonth} </strong>
                        </Alert>
                    </Grid>
                    <Grid item xs={4}>
                        <Stack direction="row" justifyContent="flex-end">
                            <AnimateButton>
                                <Button variant="contained" type="submit" disabled={feedingDays === 0}>
                                    Create
                                </Button>
                            </AnimateButton>
                        </Stack>
                    </Grid>
                </Grid>
            </form>
        </MainCard>
    )
}

export default CreateOrder;