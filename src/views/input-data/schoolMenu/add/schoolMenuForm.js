import { useDispatch } from 'store';
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';

// material-ui
import {
    Button,
    Grid,
    Stack,
    TextField,
    Select,
    InputLabel,
    MenuItem,
    FormControl,
    FormHelperText,
    Divider
} from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { openSnackbar } from 'store/slices/snackbar';
import { gridSpacing } from 'store/constant';

import http from "../../../../http-commom";

import AddMenuItemPage from './addItem'
import MenuItemsPage from './MenuItemsPage';

// Services
import StaticDataService from '../../../../services/staticData.service';
// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';

// assets
const Days = StaticDataService.Days;
const Levels = StaticDataService.Level;

/**
 * 'Enter your email'
 * yup.string Expected 0 arguments, but got 1 */
const validationSchema = yup.object({
    day: yup.string().required('Menu Day is required'),
    level: yup.string().required('School Level is required'),
    // menuItems: yup.array().required('Menu Items are required')
    menuItems: yup.array().min(1, "Menu Items are required").required('Menu Items are required')
});

// ==============================|| FORM VALIDATION - LOGIN FORMIK  ||============================== //

const SchoolMenuForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [addItemClicked, setAddItemClicked] = useState(false);
    const [menuItemData, setMenuItemData] = useState([]);

    const formik = useFormik({
        initialValues: {
            day: '',
            title: '',
            menuItems: [],
            level: '',
            year: ''
        },
        validationSchema,
        onSubmit: () => {
            const menu = {
                day: formik.values.day,
                title: "Menu",
                year: '2023',
                menuItems: menuItemData,
                level: formik.values.level
            }
            try {
                http.post('/menu/create', menu).then((response) => {
                    if (response.status === 200) {

                        dispatch(openSnackbar({
                            open: true,
                            message: 'Menu Added successfully',
                            variant: 'alert',
                            alert: {
                                color: 'success'
                            },
                            close: true
                        }));
                        navigate("/input-data/schoolmenu");
                    }
                })
            } catch (e) {
                console.log(e)
            }
        }
    });

    const handleAddItem = (addingData) => {
        setMenuItemData([
            ...menuItemData,
            {
                group: addingData.selectedItem,
                menuItem: addingData.menuItem,
                unit: addingData.quantity,
                quatifier: addingData.quatifier
            }
        ]);

        formik.values.menuItems = menuItemData;
        setAddItemClicked(false);
    }

    const deleteMenuItemHandler = (item) => {
        setMenuItemData(menuItemData.filter((i) => i.group !== item.group && i.menuItem !== item.menuItem));
    };

    return (
        <MainCard >
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={6}>
                        <FormControl sx={{ minWidth: '100%' }}>
                            <InputLabel id="day-select">Day</InputLabel>
                            <Select
                                labelId="day-select"
                                id="day"
                                name="day"
                                value={formik.values.day}
                                onChange={formik.handleChange}
                                label="Day"
                            >
                                {Days.map((day) => (
                                    <MenuItem value={day}>{day}</MenuItem>
                                ))}
                            </Select>
                            {formik.errors.day && (
                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                    {' '}
                                    {formik.errors.day}{' '}
                                </FormHelperText>
                            )}
                        </FormControl>
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
                                label="level"
                            >
                                {Levels.map((level) => (
                                    <MenuItem value={level}>{level}</MenuItem>
                                ))}
                            </Select>
                            {formik.errors.day && (
                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                    {' '}
                                    {formik.errors.day}{' '}
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                        {formik.errors.menuItems && (
                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                {' '}
                                {formik.errors.menuItems}{' '}
                            </FormHelperText>
                        )}
                    </Grid>

                    <MenuItemsPage menuItemData={menuItemData} deleteMenuItemHandler={deleteMenuItemHandler} />

                    {addItemClicked ? (
                        <Grid item xs={12}>
                            <AddMenuItemPage handleAddItem={handleAddItem} setAddItemClicked={setAddItemClicked} />
                        </Grid>
                    ) : (
                        <Grid item>
                            <Button variant="text" onClick={() => setAddItemClicked(true)}>
                                + Add Item
                            </Button>
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        <Stack direction="row" justifyContent="flex-end">
                            <AnimateButton>
                                <Button variant="contained" type="submit">
                                    Save
                                </Button>
                            </AnimateButton>
                        </Stack>
                    </Grid>
                </Grid>
            </form>
        </MainCard>
    );
};

export default SchoolMenuForm;
