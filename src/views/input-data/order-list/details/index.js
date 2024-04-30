import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Divider, Box, Grid, Tab, Tabs, Alert, Typography, CardActions, Button } from '@mui/material';

import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
// project imports
import useConfig from 'hooks/useConfig';
import { gridSpacing } from 'store/constant';
import SubCard from 'ui-component/cards/SubCard';

// Services 
import StaticDataService from 'services/staticData.service';
import { GroupDataPackageList, GroupItemsData } from 'services/function.service';

// assets 
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import CreditCardTwoToneIcon from '@mui/icons-material/CreditCardTwoTone';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocalShippingTwoToneIcon from '@mui/icons-material/LocalShippingTwoTone';
import OrderDetailTable from '../view/table';
import EmptyOrderList from '../view/EmptyOrderList';
import WarehouseForm2 from '../../warehouse/WarehouseForm2';
import OrderService from 'services/order.service';

const DetailHeaders = StaticDataService.DetailHeaders;
const PackageListHeaders = StaticDataService.PackageListHeaders;

// tab content
function TabPanel({ children, value, index, ...other }) {
    return (<div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
    >
        {value === index && (
            <Box
                sx={{
                    p: 0
                }}
            >
                {children}
            </Box>
        )}
    </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`
    };
}

function MonthOrderDetail() {
    const theme = useTheme();
    const navigate = useNavigate();
    const { borderRadius } = useConfig();
    const location = useLocation();
    const [orderList, setOrderList] = useState({});
    const [orderDetails, setOrderDetail] = useState(null);
    const [mainOrderPackageList, setMainOrderPackageList] = useState(null);
    const [month, setMonths] = useState('');
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const BindOrderData = (OrderList) => {
        const items = [];
        const packages = [];
        OrderList?.orders?.forEach(element => {
            element.menuItems.sort((a, b) => (a.group > b.group) ? 1 : -1);
            element.menuItems.forEach(a => items.push(a));
        });
        const copiedItems = JSON.parse(JSON.stringify(items));
        const groupedItems = GroupItemsData(items);
        copiedItems?.forEach(e => { e.packaging.forEach(i => packages.push(i)); });
        const groupedItemsByPackage = GroupDataPackageList(packages);
        groupedItemsByPackage.sort((a, b) => (a.name > b.name) ? 1 : -1);


        setOrderDetail({ menuItems: groupedItems });
        setMainOrderPackageList({ menuItems: [{ packaging: groupedItemsByPackage }] });
    }

    const GetStatsData = (OrderList) => {
        setMonths(OrderList?.month);
    }

    const GetMonthStockTrackingData = async (month) => {
        const MasterOrderList = await OrderService.GetMonthStockTracking(month);
        setOrderList(MasterOrderList);
    }

    useEffect(() => {
        if (location.state !== null) {
            BindOrderData(location.state);
            GetStatsData(location.state);
            GetMonthStockTrackingData(location.state.month);

        }
    }, [location]);


    return (<div>
        {/* <Grid container spacing={gridSpacing}>
            <Grid item xs={12} sm={2} md={1}>
                <Alert variant="outlined" icon={false}>
                    <ArrowBackIcon onClick={() => (navigate("/input-data/monthly-order-list"))} />
                </Alert>
            </Grid>
        </Grid> */}

        <CardActions>
            <Grid container justifyContent="space-between" spacing={0}>
                <Grid item>
                    <Button variant="outlined" size="large" icon={<ArrowBackIcon />} onClick={() => (navigate("/input-data/monthly-order-list"))}>
                        Back
                    </Button>
                </Grid>
                {/* <Grid item>
                    <Button variant="contained" size="large">
                        Continue
                    </Button>
                </Grid> */}
            </Grid>
        </CardActions>

        <Grid container spacing={gridSpacing}>
            <Grid item xs={12} sm={4} md={3}>
                <SubCard title={
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <CalendarMonthRoundedIcon />
                        </Grid>
                        <Grid item xs zeroMinWidth>
                            <Typography align="left" variant="subtitle1">
                                {month}
                            </Typography>
                            <Typography align="left" variant="subtitle2">
                                UI/UX Designer/ TODO
                            </Typography>
                        </Grid>
                    </Grid>
                }
                    contentSX={{ textAlign: 'center' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" align='left'>
                                Total KG{' '}
                                <Typography component="span" variant="caption">
                                    | 4351| TODO
                                </Typography>{' '}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" align='left'>
                                Total Learners{' '}
                                <Typography component="span" variant="caption">
                                    | 4351 | TODO
                                </Typography>{' '}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        orientation="vertical"
                        variant="scrollable"
                        sx={{
                            '& .MuiTabs-flexContainer': {
                                borderBottom: 'none'
                            },
                            '& button': {
                                borderRadius: `${borderRadius}px`,
                                color: theme.palette.mode === 'dark' ? theme.palette.grey[600] : theme.palette.grey[600],
                                minHeight: 'auto',
                                minWidth: '100%',
                                py: 1.5,
                                px: 2,
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'flex-start',
                                textAlign: 'left',
                                justifyContent: 'flex-start'
                            },
                            '& button.Mui-selected': {
                                color: theme.palette.primary.main,
                                background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50]
                            },
                            '& button > svg': {
                                marginBottom: '0px !important',
                                marginRight: 1.25,
                                marginTop: 1.25,
                                height: 20,
                                width: 20
                            },
                            '& button > div > span': {
                                display: 'block'
                            },
                            '& > div > span': {
                                display: 'none'
                            }
                        }}
                    >
                        <Tab
                            icon={<DescriptionTwoToneIcon />}
                            label={
                                <Grid container direction="column" sx={{ alignContent: 'center' }}>
                                    <Typography variant="subtitle1" color="inherit">
                                        Master Order List
                                    </Typography>
                                </Grid>
                            }
                            {...a11yProps(0)}
                        />
                        <Tab
                            icon={<LocalShippingTwoToneIcon />}
                            label={
                                <Grid container direction="column">
                                    <Typography variant="subtitle1" color="inherit">
                                        Order List
                                    </Typography>
                                </Grid>
                            }
                            {...a11yProps(1)}
                        />
                        <Tab
                            icon={<CreditCardTwoToneIcon />}
                            label={
                                <Grid container direction="column">
                                    <Typography variant="subtitle1" color="inherit">
                                        Order Intake
                                    </Typography>
                                </Grid>
                            }
                            {...a11yProps(2)}
                        />
                    </Tabs>
                </SubCard>
            </Grid>
            <Grid item xs={12} sm={8} md={9}>
                <TabPanel value={value} index={0}>
                    {orderDetails !== null ?
                        <OrderDetailTable HeaderColumns={DetailHeaders} Items={orderDetails} Type="OrderDetails" /> :
                        <EmptyOrderList Month={month} />}
                </TabPanel>
                <TabPanel value={value} index={1}>
                    {mainOrderPackageList !== null ?
                        <OrderDetailTable HeaderColumns={PackageListHeaders} Items={mainOrderPackageList} Type="PackagingList" /> :
                        <EmptyOrderList Month={month} />}
                </TabPanel>
                <TabPanel value={value} index={2}>
                    {orderList !== null ? <WarehouseForm2 orderList={orderList} updateOrderlist={null} /> :
                        <EmptyOrderList Month={month} />}
                </TabPanel>
            </Grid>
        </Grid>
    </div>);
}

export default MonthOrderDetail;