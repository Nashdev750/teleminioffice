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

// assets
const status = ['Open', 'Closed'];
const levels = ['Primary', 'Secondary'];
const regions = ['Johannesburg Region', 'Thokoza Region', 'Vosloorus Region'];
const provinces = ['Eastern Cape', 'Free State', 'Kwazulu Natal', 'Gauteng', 'Limpopo', 'Mpumalanga', 'Northen Cape', 'North West', 'Western Cape'];
/**
 * 'Enter your email'
 * yup.string Expected 0 arguments, but got 1 */
const validationSchema = yup.object({
    name: yup.string().required('School Name is required'),
    level: yup.string().required('School Level is required'),
    leaners: yup.number().required('Number of Leaners is required'),
    status: yup.string().required('Status is required'),
    province: yup.string().required('Province is required'),
    region: yup.string().required('Region is required')
});

// ==============================|| FORM VALIDATION - LOGIN FORMIK  ||============================== //

const SchoolForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: '',
            level: '',
            leaners: undefined,
            status: '',
            region: '',
            province: ''
        },
        validationSchema,
        onSubmit: () => {
            const school = {
                company_id: '1',
                name: formik.values.name,
                level: formik.values.level,
                learners: formik.values.leaners,
                status: formik.values.status,
                region: formik.values.region,
                provence: formik.values.province

            }
            try {
                http.post('/school/create', school).then((response) => {
                    if (response.status === 200) {

                        dispatch(openSnackbar({
                            open: true,
                            message: 'School Added successfully',
                            variant: 'alert',
                            alert: {
                                color: 'success'
                            },
                            close: true
                        }));
                        navigate("/input-data/schools");
                    }
                })
            } catch (e) {
                console.log(e)
            }
        }
    });

    return (
        <MainCard>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="name"
                            name="name"
                            label="Name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl sx={{ minWidth: '100%' }}>
                            <InputLabel id="level-select">Level</InputLabel>
                            <Select
                                labelId="level-select"
                                id="level"
                                name="level"
                                value={formik.values.level}
                                onChange={formik.handleChange}
                                label="Level"
                            >
                                {levels.map((option) => (
                                    <MenuItem value={option}>{option}</MenuItem>
                                ))}
                            </Select>
                            {formik.errors.level && (
                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                    {' '}
                                    {formik.errors.level}{' '}
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="leaners"
                            name="leaners"
                            label="Leaners"
                            type='number'
                            value={formik.values.leaners}
                            onChange={formik.handleChange}
                            error={formik.touched.leaners && Boolean(formik.errors.leaners)}
                            helperText={formik.touched.leaners && formik.errors.leaners}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl sx={{ minWidth: '100%' }}>
                            <InputLabel id="status-select">status</InputLabel>
                            <Select
                                labelId="status-select"
                                id="status"
                                name="status"
                                value={formik.values.status}
                                onChange={formik.handleChange}
                                label="Status"
                            >
                                {status.map((option) => (
                                    <MenuItem value={option}>{option}</MenuItem>
                                ))}
                            </Select>
                            {formik.errors.status && (
                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                    {' '}
                                    {formik.errors.status}{' '}
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl sx={{ minWidth: '100%' }}>
                            <InputLabel id="province-select">Province</InputLabel>
                            <Select
                                labelId="province-select"
                                id="province"
                                name="province"
                                value={formik.values.province}
                                onChange={formik.handleChange}
                                label="Province"
                            >
                                {provinces.map((option) => (
                                    <MenuItem value={option}>{option}</MenuItem>
                                ))}
                            </Select>
                            {formik.errors.province && (
                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                    {' '}
                                    {formik.errors.province}{' '}
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl sx={{ minWidth: '100%' }}>
                            <InputLabel id="region-select">Region</InputLabel>
                            <Select
                                labelId="region-select"
                                id="region"
                                name="region"
                                value={formik.values.region}
                                onChange={formik.handleChange}
                                label="Region"
                            >
                                {regions.map((option) => (
                                    <MenuItem value={option}>{option}</MenuItem>
                                ))}
                            </Select>
                            {formik.errors.region && (
                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                    {' '}
                                    {formik.errors.region}{' '}
                                </FormHelperText>
                            )}
                        </FormControl>
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

export default SchoolForm;
