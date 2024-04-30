import { useDispatch } from 'store';

// material-ui
import { Button, Grid, Stack, TextField } from '@mui/material';
import {TextareaAutosize} from '@mui/base/TextareaAutosize';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { openSnackbar } from 'store/slices/snackbar';
import { gridSpacing } from 'store/constant';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useState } from 'react';
import http from 'http-commom';

/**
 * 'Enter your email'
 * yup.string Expected 0 arguments, but got 1 */
const validationSchema = yup.object({
    name: yup.string().min(3,'Enter Product Name').required('Product name is required'),
    price: yup.number().required('Product price is required'),
    image: yup.mixed()
    .required("A file is required")
    .test(
      "fileType",
      "Unsupported File Format",
      value => value && ['image/jpeg','image/jpg', 'image/png', 'image/gif'].includes(value.type)
    ),
    description: yup.string().optional(),
});

// ==============================|| FORM VALIDATION - INSTANT FEEDBACK FORMIK  ||============================== //

const convertImageToJSON = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64Image = reader.result.split(',')[1]; // Remove data:image/jpeg;base64, prefix
        resolve(base64Image);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };


const AddProduct = () => {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            name: '',
            description:""
        },
        validationSchema,
        onSubmit: async () => {
            console.log(formik.values)
            formik.values.image = await convertImageToJSON(formik.values.image)
            const formData = new FormData()
            formData.append("name",formik.values.name)
            formData.append("price",formik.values.price)
            formData.append("stock",formik.values.stock)
            formData.append("description",formik.values.description)
            formData.append("image",formik.values.image)
            setLoading(true)
            http.post('product/create',formik.values)
            .then(data=>{
                setLoading(false)
                dispatch(
                    openSnackbar({
                        open: true,
                        message: 'Product saved successfully',
                        variant: 'alert',
                        alert: {
                            color: 'success'
                        },
                        close: false
                    })
                );
            })
            .catch(err=>{
                dispatch(
                    openSnackbar({
                        open: true,
                        message: err.message,
                        variant: 'alert',
                        alert: {
                            color: 'warning'
                        },
                        close: false
                    })
                );
                setLoading(false)
            })
        }
    });

    return (
        <MainCard title="Add Product">
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="name"
                            name="name"
                            label="Product Name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="price"
                            name="price"
                            type='number'
                            label="Product Price"
                            value={formik.values.price}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.price && Boolean(formik.errors.price)}
                            helperText={formik.touched.price && formik.errors.price}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="stock"
                            name="stock"
                            type='number'
                            label="Product Stock"
                            value={formik.values.stock}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.stock && Boolean(formik.errors.stock)}
                            helperText={formik.touched.stock && formik.errors.stock}
                        />
                    </Grid>
                    <Grid item xs={6}>
                    <TextField
                            fullWidth
                            type='file'
                            id="image"
                            name="image"
                            label=""
                            onChange={e=>formik.setFieldValue('image',e.target.files[0])}
                            onBlur={formik.handleBlur}
                            error={formik.touched.image && Boolean(formik.errors.image)}
                            helperText={formik.touched.image && formik.errors.image}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <div className='MuiFormControl-root MuiFormControl-fullWidth MuiTextField-root css-wb57ya-MuiFormControl-root-MuiTextField-root'>
                        <TextareaAutosize
                            fullWidth
                            className="MuiInputBase-input MuiOutlinedInput-input"
                            style={{width:'100%',padding:"14px",border:'1px solid gray', borderRadius:'5px'}}
                            id="description"
                            name="description"
                            label="Product description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                            />
                        </div>
                    </Grid>
                   
                    <Grid item xs={12}>
                        <Stack direction="row" justifyContent="flex-end">
                            <AnimateButton>
                                <Button disabled = {loading} variant="contained" type="submit">
                                    Submit
                                </Button>
                            </AnimateButton>
                        </Stack>
                    </Grid>
                </Grid>
            </form>
        </MainCard>
    );
};

export default AddProduct;
