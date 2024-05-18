import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import EarningCard from './EarningCard';
import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
import httpCommom from 'http-commom';

// ==============================|| DEFAULT DASHBOARD ||============================== //

function calculateOrderStats(orders) {
    let totalSales = 0;
    const totalOrders = orders.length;
    let totalPendingOrders = 0;
    let totalPendingCost = 0;
    let totalCompletedOrders = 0;
    let totalCompletedCost = 0;
    let totalCancelledOrders = 0;
    let totalCancelledCost = 0;

    orders.forEach(order => {
        const orderTotalCost = order.items.reduce((sum, item) => sum + item.price * item.count, 0);
        totalSales += orderTotalCost;

        switch (order.status) {
            case 0:
                totalPendingOrders++;
                totalPendingCost += orderTotalCost;
                break;
            case 1:
                totalCompletedOrders++;
                totalCompletedCost += orderTotalCost;
                break;
            case 2:
                totalCancelledOrders++;
                totalCancelledCost += orderTotalCost;
                break;
            default:
                break;    
        }
    });

    return {
        totalSales,
        totalOrders,
        totalPendingOrders,
        totalPendingCost,
        totalCompletedOrders,
        totalCompletedCost,
        totalCancelledOrders,
        totalCancelledCost
    };
}


const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    const [order, setOrder] = useState({
        totalSales:0,
        totalOrders:0,
        totalPendingOrders:0,
        totalPendingCost:0,
        totalCompletedOrders:0,
        totalCompletedCost:0,
        totalCancelledOrders:0,
        totalCancelledCost:0
    });

    useEffect(()=>{
        httpCommom.get('orders')
        .then(res=>{
             setOrder(calculateOrderStats(res.data))
             setLoading(false);
             console.log(calculateOrderStats(res.data))
        })
        .catch(err=>setLoading(false))
    },[])

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <EarningCard isLoading={isLoading} order={order.totalCompletedCost} title = "Total Earning"/>
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                    <EarningCard isLoading={isLoading} order={order.totalPendingCost} title = "Pending Earning"/>
                    </Grid>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalIncomeDarkCard isLoading={isLoading} total={`${order.totalOrders}($${order.totalSales.toFixed(2)})`} title="Total Orders"/>
                            </Grid>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                            <TotalIncomeDarkCard isLoading={isLoading} total={`${order.totalCompletedOrders}($${order.totalCompletedCost.toFixed(2)})`} title="Total Completed Orders"/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                            <TotalIncomeDarkCard isLoading={isLoading} total={`${order.totalPendingOrders}($${order.totalPendingCost.toFixed(2)})`} title="Total Pending Orders"/>
                            </Grid>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalIncomeLightCard isLoading={isLoading}  total={`${order.totalCancelledOrders}($${order.totalCancelledCost.toFixed(2)})`} title="Total Canceled Orders"/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
