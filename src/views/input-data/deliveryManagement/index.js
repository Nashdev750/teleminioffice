import React, { useEffect, useState } from "react";
import {
    Grid,
    Typography,
    TextField,
    FormControlLabel,
    Checkbox,
    MenuItem,
    Select,
    FormControl
} from '@mui/material';

// project imports 
import MainCard from 'ui-component/cards/MainCard'

import InputLabel from 'ui-component/extended/Form/InputLabel';
import { gridSpacing } from 'store/constant';
import OrderDetailTable from '../order-list/view/table';
import TruckService from 'services/trucks.service';
import OrderService from 'services/order.service';
import StaticDataService from 'services/staticData.service';
import { GroupDataPackageList } from 'services/function.service';

const PackageListHeaders = StaticDataService.PackageListHeaders;


const DeliveryManagement = () => {
    const [trucks, setTrucks] = useState([]);
    const [schools, setSchools] = useState([]);
    const [selectedSchool, setSelectedchool] = useState(null);
    const [selectedTruck, setSelectedTruck] = useState();
    const [mainOrderPackageList, setMainOrderPackageList] = useState(null);

    const RetrieveTrucks = async () => {
        const truckList = await TruckService.GetAllTrucks();
        setTrucks(truckList);
    }

    const handleSelectChange = (event) => {
        const selectedOption = trucks.find((option) => option.reg_number === event.target.value);
        setSelectedTruck(selectedOption);
    };

    const BindOrderData = (school) => {
        const items = [];
        const packages = [];
        school?.menuItems.sort((a, b) => (a.group > b.group) ? 1 : -1);
        school?.menuItems.forEach(a => items.push(a));

        const copiedItems = JSON.parse(JSON.stringify(items));
        copiedItems?.forEach(e => { e.packaging.forEach(i => packages.push(i)); });
        const groupedItemsByPackage = GroupDataPackageList(packages);
        groupedItemsByPackage.sort((a, b) => (a.name > b.name) ? 1 : -1);
        setMainOrderPackageList({ menuItems: [{ packaging: groupedItemsByPackage }] });
    }

    const handleSelectSchoolChange = (event) => {
        const selectedOption = schools.find((option) => option.school.name === event.target.value);
        setSelectedchool(selectedOption);
        BindOrderData(selectedOption);
    };

    function getOrderSchools(orders) {
        const schools = [];
        for (let i = 0; i < orders?.length; i++) {
            schools.push(orders[i]);
        }
        setSchools(schools);
    }
    const GetMonthStockTrackingData = async () => {
        const MasterOrderList = await OrderService.GetMonthStockTracking(`${'January'} ${new Date().getFullYear()}`);
        const orders = MasterOrderList.orders;
        getOrderSchools(orders);
    }

    useEffect(() => {
        RetrieveTrucks();
        GetMonthStockTrackingData();
    }, []);

    return (
        <MainCard>
            <Grid container spacing={gridSpacing}>
                <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                    Delivery Management
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                        <FormControl sx={{ minWidth: '100%' }}>
                            <InputLabel id="truck-select">Truck</InputLabel>
                            <Select
                                labelId="truck-select"
                                id="truck"
                                name="truck"
                                value={selectedTruck?.reg_number}
                                onChange={(event) => handleSelectChange(event)}
                                label="Truck"
                            >
                                {trucks?.map((truck, i) => (
                                    <MenuItem value={truck.reg_number} key={i}>{truck.reg_number}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                            Truck Details
                        </Typography>
                        <Grid container>
                            <Grid item xs={6}>
                                <Typography gutterBottom>Make</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography gutterBottom>{selectedTruck?.make}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography gutterBottom>Registration</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography gutterBottom>{selectedTruck?.reg_number}{selectedTruck?.volume}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography gutterBottom>Capacity(KG)</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography gutterBottom>{selectedTruck?.capacity}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography gutterBottom>Volume</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography gutterBottom>{selectedTruck?.volume}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl sx={{ minWidth: '100%' }}>
                            <InputLabel id="schools-select">Schools</InputLabel>
                            <Select
                                labelId="schools-select"
                                id="Schools"
                                name="Schools"
                                value={selectedSchool?.school.name}
                                onChange={(event) => handleSelectSchoolChange(event)}
                                label="Schools"
                            >
                                {schools?.map((sch, i) => (
                                    <MenuItem value={sch.school.name} key={i}>{sch.school.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={8}>
                        {selectedSchool !== null && <OrderDetailTable HeaderColumns={PackageListHeaders} Items={mainOrderPackageList} Type="PackagingList" />}
                        {/*  <TextField id="address2Basic" name="address2" label="Address line 2" fullWidth autoComplete="shipping address-line2" /> */}
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField required id="cityBasic" name="city" label="City" fullWidth autoComplete="shipping address-level2" />
                    </Grid> 
                </Grid>
            </Grid>
        </MainCard>

    );
};

export default DeliveryManagement;