import { useDispatch } from 'store';
import { useNavigate } from "react-router-dom";

// material-ui
import { Button, Grid, Stack, TextField, Select, InputLabel, MenuItem, FormControl, FormHelperText } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { openSnackbar } from 'store/slices/snackbar';
import { gridSpacing } from 'store/constant';

import http from "../../../../http-commom";

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';

/**
 * 'Enter your email'
 * yup.string Expected 0 arguments, but got 1 */
const validationSchema = yup.object({
    make: yup.string().required('Make is required'),
    reg: yup.string().required('Registration is required'),
    capacity: yup.number().required('Capacity is required'),
    volume: yup.string().required('Volume is required') 
});

// ==============================|| FORM VALIDATION - LOGIN FORMIK  ||============================== //

const TruckForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            make: '',
            reg: '',
            capacity: '',
            volume: ''
        },
        validationSchema,
        onSubmit: () => {
            const truck = {
                make: formik.values.make,
                reg_number: formik.values.reg,
                capacity: String(formik.values.capacity),
                volume: formik.values.volume
            }
            try {
                http.post('/truck/create', truck).then((response) => {
                    if (response.status === 200) {

                        dispatch(openSnackbar({
                            open: true,
                            message: 'Truck Added successfully',
                            variant: 'alert',
                            alert: {
                                color: 'success'
                            },
                            close: true
                        }));
                        navigate("/input-data/trucks");
                    }
                })
            } catch (e) {
                console.log(e)
            }
        }
    });

    return (
        <MainCard >
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="make"
                            name="make"
                            label="Make"
                            value={formik.values.make}
                            onChange={formik.handleChange}
                            error={formik.touched.make && Boolean(formik.errors.make)}
                            helperText={formik.touched.make && formik.errors.make}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="reg"
                            name="reg"
                            label="Registration"
                            value={formik.values.reg}
                            onChange={formik.handleChange}
                            error={formik.touched.reg && Boolean(formik.errors.reg)}
                            helperText={formik.touched.reg && formik.errors.reg}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="capacity"
                            name="capacity"
                            label="Capacity"
                            type='number'
                            value={formik.values.capacity}
                            onChange={formik.handleChange}
                            error={formik.touched.capacity && Boolean(formik.errors.capacity)}
                            helperText={formik.touched.capacity && formik.errors.capacity}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="volume"
                            name="volume"
                            label="Volume"
                            type='number'
                            value={formik.values.volume}
                            onChange={formik.handleChange}
                            error={formik.touched.volume && Boolean(formik.errors.volume)}
                            helperText={formik.touched.volume && formik.errors.volume}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Stack direction="row" justifyContent="flex-end">
                            <AnimateButton>
                                <Button variant="contained" type="submit">
                                    Add
                                </Button>
                            </AnimateButton>
                        </Stack>
                    </Grid>
                </Grid>
            </form>
        </MainCard>
    );
};

export default TruckForm;
