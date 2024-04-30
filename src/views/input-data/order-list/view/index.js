// material-ui 
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import { Grid, InputAdornment, OutlinedInput, Typography } from '@mui/material';

import { IconSearch } from '@tabler/icons';

// project imports
import OrderForm from './orderForm';
import OrderList2 from './OrderList';

const OrderList = () => ( 
    <MainCard
        title={
            <Grid container alignItems="center" justifyContent="space-between" spacing={gridSpacing}>
                <Grid item>
                    <Typography variant="h3">Monthly Orders</Typography>
                </Grid>
                <Grid item>
                    <OutlinedInput
                        id="input-search-list-style1"
                        placeholder="Search"
                        startAdornment={
                            <InputAdornment position="start">
                                <IconSearch stroke={1.5} size="16px" />
                            </InputAdornment>
                        }
                        size="small"
                    />
                </Grid>
            </Grid>
        }
        content={false}
    >
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12} md={12}>
                <OrderList2 />
                {/* <OrderForm /> */}
            </Grid>
        </Grid>
    </MainCard>
);

export default OrderList;