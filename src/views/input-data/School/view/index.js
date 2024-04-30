// material-ui
import { Grid } from '@mui/material';
import { gridSpacing } from 'store/constant';
// project imports
import SchoolList from './schoolList';
import MainCard from 'ui-component/cards/MainCard';

function School() {

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12} md={12}>
                <MainCard content={false}  >
                    <SchoolList />
                </MainCard>
            </Grid>
        </Grid>
    );

}
export default School;