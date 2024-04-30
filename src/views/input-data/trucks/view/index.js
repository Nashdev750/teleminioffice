// material-ui
import { Grid } from '@mui/material';
import { gridSpacing } from 'store/constant';
// project imports 
import MainCard from 'ui-component/cards/MainCard';

import TruckList from './truckList'

function Trucks() {

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12} md={12}>
                <MainCard content={false}  >
                    <TruckList />
                </MainCard>
            </Grid>
        </Grid>
    );

}
export default Trucks;