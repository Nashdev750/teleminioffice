// material-ui
import { Grid } from '@mui/material';
import { gridSpacing } from 'store/constant';
// project imports
import ShoolMenuList from './schoolMenuList';
import MainCard from 'ui-component/cards/MainCard';

function SchoolMenu() {


    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12} md={12}>
                <MainCard content={false}  >
                    <ShoolMenuList />
                </MainCard>
            </Grid>
        </Grid>
    );

}
export default SchoolMenu;