// material-ui
import React, { useEffect } from "react";
import MenuCard from './menuCard';
import {
    Grid,
    FormControl,
    Typography,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText
} from '@mui/material';

import http from "../../../../http-commom";
import { gridSpacing } from 'store/constant';
import MainCard from "ui-component/cards/MainCard"; 
// third-party
import { useFormik } from 'formik';
// Services 
import StaticDataService from 'services/staticData.service'

const levels = StaticDataService.Level;


export default function SchoolMenuList() {
    const [schoolMenus, setSchoolMenus] = React.useState([]);

    const retrieveSchoolMenus = async () => {
        http.get('/menu/all').then((response) => {
            if (response.status === 200) {
                setSchoolMenus(response.data);
            }
        })
    }

    useEffect(() => {
        retrieveSchoolMenus();
    }, []);

    const formik = useFormik({
        initialValues: {
            level: 'Primary'
        }
    });

    return (
        <MainCard
            title={
                <Grid container justifyContent="space-between" alignItems="center" spacing={gridSpacing}>
                    <Grid item>
                        <Typography variant="h3">Menu List</Typography>
                    </Grid>
                    <Grid item>
                        <FormControl sx={{ minWidth: '100%' }}>
                            <InputLabel id="level-select">Levels</InputLabel>

                            <Select
                                labelId="level-select"
                                id="level"
                                name="level"
                                value={formik.values.level}
                                onChange={formik.levels}
                                label="Level"
                            >
                                {levels.map((option, i) => (
                                    <MenuItem value={option} key={i}>{option}</MenuItem>
                                ))}
                            </Select>
                            {formik.errors.month && (
                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                    {' '}
                                    {formik.errors.month}{' '}
                                </FormHelperText>
                            )}

                        </FormControl>
                    </Grid>
                </Grid>
            }>
            {schoolMenus.length > 0 ? <Grid item sm={6} md={12}>
                <MenuCard menus={schoolMenus} />
            </Grid> : null}
        </MainCard>)

}