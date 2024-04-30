import React, { useEffect, useState } from 'react';
import {
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import WarehouseForm from './WarehouseForm';
import EmptyOrderList from '../order-list/view/EmptyOrderList';
import StaticDataService from 'services/staticData.service';
import OrderService from 'services/order.service';

import { GroupDataPackageList, GetItemQuantities } from 'services/function.service';

const months = StaticDataService.Months;

function Warehouse() {
    const [month, setMonth] = useState(`${months[new Date().getMonth()]}`);
    const [itemQuantities, setItemQuantities] = useState({});
    const [monthIntake, setMonthIntake] = useState([]);
    const [orderList, setOrderList] = useState()

    async function getSelectedMonthStockList() {
        const selectMonth = `${month}%20${new Date().getFullYear()}`;
        const intake = await OrderService.GetMonthStockTracking(selectMonth);
        setMonthIntake(intake);
    }

    const HandleMonthChange = async () => {
        const orderList = {
            month: `${month} ${new Date().getFullYear()}`,
            level: "Primary"
        }
        try {

            const MasterOrderList = await OrderService.GetMonthStockTracking(orderList.month);
            setOrderList({ ...MasterOrderList })

        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        HandleMonthChange();
    }, [month]);

    return (
        <>
            <MainCard title="Warehouse">
                <Grid item xs={12} md={12} lg={12}>
                    <FormControl sx={{ minWidth: '50%' }}>
                        <InputLabel id="month-select">Month</InputLabel>
                        <Select
                            labelId="month-select"
                            id="month"
                            name="month"
                            label="Month"
                            onChange={(e) => setMonth(e.target.value)}
                            value={month}
                        >
                            {months.map((option) => (
                                <MenuItem value={option} key={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <br />
                <hr />
                <Grid item sm={6} md={12}>
                    {
                        orderList?.orders?.length > 0
                            ? <WarehouseForm orderList={orderList} updateOrderlist={HandleMonthChange} />
                            : <EmptyOrderList Month={month} />

                    }
                    {/* {Object.keys(itemQuantities)?.length > 0 ?
                        <WarehouseForm ItemPackages={itemQuantities} Month={month} MonthIntakeLevel={monthIntake} /> :
                        <EmptyOrderList Month={month} />
                    } */}
                </Grid>
            </MainCard>
        </>
    );
}

export default Warehouse;