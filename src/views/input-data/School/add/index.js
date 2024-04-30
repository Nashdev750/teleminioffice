// material-ui
import { Grid } from '@mui/material'; 
import { gridSpacing } from 'store/constant'; 

// project imports
import SchoolForm from './schoolForm';


const AddSchool = () => (
    <Grid container spacing={gridSpacing}>
        <Grid item xs={12} md={12}>
            <SchoolForm />
        </Grid>
    </Grid>
);

export default AddSchool;