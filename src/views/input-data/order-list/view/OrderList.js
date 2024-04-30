import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Grid,
    IconButton,
    Stack,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Typography
} from '@mui/material';

// assets  
// import Chip from 'ui-component/extended/Chip';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SyncIcon from '@mui/icons-material/Sync';

// Services 
import StaticDataService from 'services/staticData.service';
import OrderService from 'services/order.service';
import SchoolService from 'services/school.service';

const months = StaticDataService.Months;

const OrderList2 = () => {
    const navigate = useNavigate();
    const [noSecLearners, setNoSecLearners] = useState(0);
    const [noPriLearners, setNoPriLearners] = useState(0);
    const [FeedingDays, setFeedingDays] = useState([]);
    const [orderList, setorderList] = useState([]);

    const GetMonthOrderList = async () => {
        const promises = months.map(month =>
            OrderService.GetMonthOrderList({ month: `${month} ${new Date().getFullYear()}`, level: "Primary" })
        );
        const orderList = await Promise.all(promises);

        setorderList(orderList);
    }

    const GetSchools = async () => {
        const SchoolList = await SchoolService.GetAllSchools();
        setNoPriLearners(SchoolList.filter(i => i.level === 'Primary')?.reduce((accumulator, school) => accumulator + school.learners, 0));
        setNoSecLearners(SchoolList.filter(i => i.level === 'Secondary')?.reduce((accumulator, school) => accumulator + school.learners, 0));
    }

    const GetFeedingDays = async () => {
        const promises = months.map(month =>
            OrderService.GetFeedingSchoolDay(`${month} ${new Date().getFullYear()}`)
        );

        const feedingDays = await Promise.all(promises);
        const feedingDaysData = feedingDays.map((days, index) => ({
            month: months[index],
            days,
        }));
        setFeedingDays(feedingDaysData);
    };

    function HandleViewMonthOrder(month) {
        const order = orderList.find(i => i.month === `${month} ${new Date().getFullYear()}`);
        navigate("/input-data/month-order-detail", { state: order });
    }

    function HandleCreateMonthOrder(month) {
        navigate("/input-data/create-order-detail", { state: month });
    }

    useEffect(() => {
        GetMonthOrderList();
        GetSchools();
        GetFeedingDays();
    }, []);

    return (<TableContainer>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Month</TableCell>
                    <TableCell>Secondary Learners</TableCell>
                    <TableCell>Primary Learners</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="center" sx={{ pr: 3 }}>
                        Actions
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {orderList.length > 0 && months?.map((row, index) => (
                    <TableRow>
                        <TableCell>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs zeroMinWidth>
                                    <Typography align="left" variant="subtitle1" component="div">
                                        {row}{' '}   <CheckCircleIcon sx={{ color: 'success.dark', width: 14, height: 14 }} />
                                    </Typography>
                                    <Typography align="left" variant="subtitle2" noWrap>
                                        {FeedingDays?.find(i => i.month === row)?.days} Feeding Days
                                    </Typography>
                                </Grid>
                            </Grid>
                        </TableCell>
                        <TableCell>{noSecLearners}</TableCell>
                        <TableCell>{noPriLearners}</TableCell>
                        <TableCell> 
                            <Chip variant="outlined" color="warning" label="Created" size="small" />
                        </TableCell>
                        <TableCell align="center" sx={{ pr: 3 }}>
                            {orderList.find(i => i.month === `${row} ${new Date().getFullYear()}`) !== undefined ?
                                <Button size="small" variant="outlined" color='info' endIcon={<VisibilityIcon />}
                                    onClick={() => HandleViewMonthOrder(row)}>View</Button> :
                                <Button size="small" variant="outlined" color='inherit' endIcon={<AddIcon />}
                                    onClick={() => HandleCreateMonthOrder(row)}>Create</Button>}
                        </TableCell>
                    </TableRow>))}
            </TableBody>
        </Table>
    </TableContainer>)
}

export default OrderList2;
