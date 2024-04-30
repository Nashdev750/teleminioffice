import PropTypes from 'prop-types';
// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { useDispatch } from 'store';
import React, { useEffect, useState } from "react";
// material-ui
import {
    Button,
    Grid,
    Stack,
    Select,
    InputLabel,
    MenuItem,
    FormControl, 
    Alert,
    Tab, Tabs, Box,
    Typography
} from '@mui/material';

// project imports 
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { openSnackbar } from 'store/slices/snackbar';
import { gridSpacing } from 'store/constant';

import http from "../../../../http-commom";
import EmptyOrderList from './EmptyOrderList'
import SchoolOrderTable from './SchoolOrderTable'
// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';

import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import LocalShippingTwoToneIcon from '@mui/icons-material/LocalShippingTwoTone';
import useConfig from 'hooks/useConfig';

// Services 
import StaticDataService from 'services/staticData.service'
import OrderService from 'services/order.service';
import { GroupDataPackageList, GroupItemsData } from 'services/function.service'
import OrderDetailTable from './table';

// assets  
const months = StaticDataService.Months;
const DetailHeaders = StaticDataService.DetailHeaders;
const PackageListHeaders = StaticDataService.PackageListHeaders;

/**
 * 'Enter your email'
 * yup.string Expected 0 arguments, but got 1 */
const validationSchema = yup.object({
    month: yup.string().required('Month is required')
});

const StyledTab = styled((props) => <Tab {...props} />)(({ theme, border, value }) => ({
    color: theme.palette.warning.dark,
    minHeight: 'auto',
    minWidth: 250,
    padding: 16,
    borderRadius: `${border}px`,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    textAlign: 'left',
    justifyContent: 'flex-start',
    '&:after': {
        backgroundColor: 'transparent !important'
    },
    '&.Mui-selected': {
        color: theme.palette.primary.main,
        background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50]
    },
    '& > svg': {
        marginBottom: '0px !important',
        marginRight: 10,
        marginTop: 2,
        height: 20,
        width: 20
    },
    [theme.breakpoints.down('md')]: {
        minWidth: '100%'
    }
}));

// tab content
function TabPanel({ children, value, index, ...other }) {
    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};


// ==============================|| FORM VALIDATION - LOGIN FORMIK  ||============================== //

// tabs option
const tabsOption = [
    {
        label: 'Master Order Details',
        icon: <DescriptionTwoToneIcon />,
        caption: 'Master Order Details'
    },
    {
        label: 'Master Delivery List',
        icon: <LocalShippingTwoToneIcon />,
        caption: 'Master Delivery List'
    }
    /* ,
    {
        label: 'Payment',
        icon: <ReceiptTwoToneIcon />,
        caption: 'School Order List'
    } */
];

const OrderForm = () => {
    const { borderRadius } = useConfig();
    const theme = useTheme();
    const dispatch = useDispatch();
    const [SchoolOrders, setSchoolOrders] = React.useState([]);
    const [feedingDays, setFeedingDays] = React.useState(0);
    const [mainOrder, setMainOrder] = React.useState(null);
    const [mainOrderPackageList, setMainOrderPackageList] = React.useState(null);
    const [tabValue, setTabValue] = useState(0);

    const formik = useFormik({
        initialValues: {
            month: ''
        },
        validationSchema,
        onSubmit: () => {
            const orderList = {
                school_id: [],
                month: `${formik.values.month} ${new Date().getFullYear()}`,
                level: "Primary"
            }
            try {
                http.post('/report/calculate', orderList).then((response) => {
                    if (response.status === 200) {
                        response.data?.orders?.forEach(element => {
                            element.menuItems.sort((a, b) => (a.group > b.group) ? 1 : -1);
                        })

                        setSchoolOrders(response.data);
                        dispatch(openSnackbar({
                            open: true,
                            message: 'Orders Calculated successfully',
                            variant: 'alert',
                            alert: {
                                color: 'success'
                            },
                            close: true
                        }));
                    }
                })
            } catch (e) {
                console.log(e)
            }
        }
    });

    const GetMonthOrderList = async () => {
        if (formik.values.month) {
            const orderListInput = {
                month: `${formik.values.month} ${new Date().getFullYear()}`,
                level: "Primary"
            }
            const OrderList = await OrderService.GetMonthOrderList(orderListInput);

            setSchoolOrders(OrderList);

            const items = [];
            const packages = [];
            OrderList?.orders?.forEach(element => {
                element.menuItems.sort((a, b) => (a.group > b.group) ? 1 : -1);
                element.menuItems.forEach(a => items.push(a));
            });

            const copiedItems = JSON.parse(JSON.stringify(items));
            const groupedItems = GroupItemsData(items);
            groupedItems.sort((a, b) => (a.group > b.group) ? 1 : -1);

            copiedItems?.forEach(e => {
                e.packaging.forEach(i => packages.push(i));
            })

            const groupedItemsByPackage = GroupDataPackageList(packages);
            groupedItemsByPackage.sort((a, b) => (a.name > b.name) ? 1 : -1);

            setMainOrder({ menuItems: groupedItems });
            setMainOrderPackageList({ menuItems: [{ packaging: groupedItemsByPackage }] });
        }
    }

    const GetFeedingDay = async () => {
        const month = `${formik.values.month} ${new Date().getFullYear()}`;
        const feedingDays = await OrderService.GetFeedingSchoolDay(month);
        setFeedingDays(feedingDays);
    }

    useEffect(() => {
        GetMonthOrderList();
        GetFeedingDay();
    }, [formik.values.month]);


    const handleTabChange = (newValue) => {
        setTabValue(newValue);
    };

    return (
        <MainCard>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={4}>
                        <FormControl sx={{ minWidth: '100%' }}>
                            <InputLabel id="month-select">Month</InputLabel>
                            <Select
                                labelId="month-select"
                                id="month"
                                name="month"
                                value={formik.values.month}
                                onChange={formik.handleChange}
                                label="Month"
                            >
                                {months.map((option, i) => (
                                    <MenuItem value={option} key={i}>{option}</MenuItem>
                                ))}
                            </Select> 
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <Alert variant="outlined" severity="success">
                            <strong> Feeding days {feedingDays} </strong>
                        </Alert>
                    </Grid>
                    <Grid item xs={4}>
                        <Stack direction="row" justifyContent="flex-end">
                            <AnimateButton>
                                {SchoolOrders?.orders !== undefined ? null : <Button variant="contained" type="submit">
                                    Create
                                </Button>}
                            </AnimateButton>
                        </Stack>
                    </Grid>
                </Grid>
            </form>
            <br />
            <hr />
            <Grid item sm={6} md={12}>
                {SchoolOrders?.orders?.length > 0 ?
                    <>
                        <Tabs
                            value={tabValue}
                            onChange={(e, newValue) => handleTabChange(newValue)}
                            aria-label="icon label tabs example"
                            variant="scrollable"
                            sx={{
                                '& .MuiTabs-flexContainer': {
                                    borderBottom: 'none'
                                },
                                '& .MuiTabs-indicator': {
                                    display: 'none'
                                },
                                '& .MuiButtonBase-root + .MuiButtonBase-root': {
                                    position: 'relative',
                                    overflow: 'visible',
                                    ml: 2,
                                    '&:after': {
                                        content: '""',
                                        bgcolor: '#ccc',
                                        width: 1,
                                        height: 'calc(100% - 16px)',
                                        position: 'absolute',
                                        top: 8,
                                        left: -8
                                    }
                                }
                            }}
                        >
                            {tabsOption.map((tab, index) => (
                                <StyledTab
                                    theme={theme}
                                    border={borderRadius}
                                    value={index}
                                    key={index}
                                    icon={tab.icon}
                                    label={
                                        <Grid container direction="column">
                                            <Typography variant="subtitle1" color="inherit">
                                                {tab.label}
                                            </Typography>
                                            <Typography component="div" variant="caption" sx={{ textTransform: 'capitalize' }}>
                                                {tab.caption}
                                            </Typography>
                                        </Grid>
                                    }
                                />
                            ))}
                        </Tabs>

                        <TabPanel value={tabValue} index={0}>
                            <OrderDetailTable HeaderColumns={DetailHeaders} Items={mainOrder} Type="OrderDetails" />
                        </TabPanel>
                        <TabPanel value={tabValue} index={1}>
                            <OrderDetailTable HeaderColumns={PackageListHeaders} Items={mainOrderPackageList} Type="PackagingList" />
                        </TabPanel>
                        <TabPanel value={tabValue} index={2}>
                            <SchoolOrderTable MonthOrder={SchoolOrders} />
                        </TabPanel>
                    </> :
                    <EmptyOrderList Month={formik.values.month} />
                }
            </Grid>
        </MainCard>
    );
}

export default OrderForm;