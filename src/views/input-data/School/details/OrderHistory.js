import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import React, { useEffect } from "react";
import {
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Table,
    TableBody,
    Typography,
    Collapse,
    Box,
    Tab,
    Tabs
} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
// material-ui
import { useTheme } from '@mui/material/styles';

// assets
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import RecentActorsTwoToneIcon from '@mui/icons-material/RecentActorsTwoTone';

// import OrderTable from './OrderTable';   
import http from "../../../../http-commom";
import OrderDetailTable from '../../order-list/view/table';

// Services
import StaticDataService from '../../../../services/staticData.service';

const DetailHeaders = StaticDataService.DetailHeaders;
const PackageListHeaders = StaticDataService.PackageListHeaders;

// tab content customize
function TabPanel({ children, value, index, ...other }) {
    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && (
                <Box
                    sx={{
                        p: 1
                    }}
                >
                    <Typography>{children}</Typography>
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
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

// ================================|| UI TABS - COLOR ||================================ //

function OrderHistoryRow(props) {
    const theme = useTheme();
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <TableRow hover sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> :
                            <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell align="left">
                    <Typography
                        variant="body1"
                        gutterBottom
                        noWrap
                    >
                        {row.month}
                    </Typography>
                </TableCell>
                <TableCell align="left">
                    <Typography
                        variant="body1"
                        gutterBottom
                        noWrap
                    >
                        {row.totalG}
                    </Typography>
                </TableCell>
                <TableCell align="left">
                    <Typography
                        variant="body1"
                        gutterBottom
                        noWrap
                    >
                        {row.totalL}
                    </Typography>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{
                    paddingBottom: 0,
                    paddingTop: 0
                }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <>
                                <Tabs
                                    value={value}
                                    variant="scrollable"
                                    onChange={handleChange}
                                    textColor="secondary"
                                    indicatorColor="secondary"
                                    sx={{
                                        mb: 1,
                                        '& a': {
                                            minHeight: 'auto',
                                            minWidth: 10,
                                            py: 1.5,
                                            px: 1,
                                            mr: 2.2,
                                            color: theme.palette.grey[600],
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        },
                                        '& a.Mui-selected': {
                                            color: theme.palette.primary.main
                                        },
                                        '& a > svg': {
                                            mb: '0px !important',
                                            mr: 1.1
                                        }
                                    }}
                                >
                                    <Tab
                                        component={Link}
                                        to="#"
                                        icon={<DescriptionTwoToneIcon sx={{ fontSize: '1.3rem' }} />}
                                        label="Order Deatils"
                                        {...a11yProps(0)}
                                    />
                                    <Tab
                                        component={Link}
                                        to="#"
                                        icon={<RecentActorsTwoToneIcon sx={{ fontSize: '1.3rem' }} />}
                                        label="Packaging List"
                                        {...a11yProps(1)}
                                    />
                                </Tabs>
                                <TabPanel value={value} index={0}> 
                                    <OrderDetailTable HeaderColumns={DetailHeaders} Items={row} Type="OrderDetails" />
                                </TabPanel>
                                <TabPanel value={value} index={1}>
                                    <OrderDetailTable HeaderColumns={PackageListHeaders} Items={row} Type="PackagingList" /> 
                                </TabPanel>
                            </>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}
const OrderHistory = ({ SchoolInfo }) => {
    const [schoolOrders, setSchoolOrders] = React.useState([]);

    const GetSchoolOrders = async (school) => {
        const orderHistoryRequest = {
            school_id: school?._id,
            start: "01/2023",
            end: "07/2023"
        }

        http.post('/report/orderlist/school', orderHistoryRequest).then((response) => {
            if (response.status === 200) {
                const orders = response?.data?.orders;
                orders.forEach(element => {
                    element.menuItems.sort((a, b) => (a.group > b.group) ? 1 : -1);
                    let totalG = 0;
                    let totalL = 0;
                    for (let i = 0; i < element.menuItems.length; i++) {
                        if (element.menuItems[i].unit === 'g') {
                            totalG += element.menuItems[i].total;
                        } else {
                            totalL += element.menuItems[i].total;
                        }
                        element.menuItems[i].package_display= "".concat(element.menuItems[i].package_size, " ", element.menuItems[i].unit);
                    }
                    element.totalG = "".concat(totalG / 1000, " KG");
                    element.totalL = "".concat(totalL / 1000, " Litres"); 
                });

                setSchoolOrders(orders);
            }
        })
    }

    useEffect(() => {
        if (SchoolInfo !== undefined) {
            GetSchoolOrders(SchoolInfo);
        }
    }, [SchoolInfo]);

    return (
        <>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell align="left">
                                Month
                            </TableCell>
                            <TableCell align="left">
                                Total KG
                            </TableCell>
                            <TableCell align="left">
                                Total Litres
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {schoolOrders?.map((order, i) => (
                            <OrderHistoryRow key={i} row={order} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default OrderHistory;