// material-ui
import { Grid } from '@mui/material';
import { gridSpacing } from 'store/constant';
// project imports
import TruckForm from './truckform';
import MainCard from 'ui-component/cards/MainCard'; 

function AddTruck() {

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12} md={12}>
                <MainCard content={false}  > 
                    <TruckForm />
                </MainCard>
            </Grid>
        </Grid>
    );

}
export default AddTruck;