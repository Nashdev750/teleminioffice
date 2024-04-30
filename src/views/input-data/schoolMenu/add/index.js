// material-ui
import { Grid } from '@mui/material'; 
import { gridSpacing } from 'store/constant'; 

// project imports
import SchoolMenuForm from './schoolMenuForm';



const AddSchoolMenu = () => (
    <Grid container spacing={gridSpacing}>
        <Grid item xs={12} md={12}>
            <SchoolMenuForm />
        </Grid>
    </Grid>
);

export default AddSchoolMenu;