import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
} from '@mui/material';

const MenuCard = ({ menus }) => {
    const theme = useTheme();

    return (
        <TableContainer>
            <Table>
                <TableBody>
                    {menus.map((menu, index) => (
                        <TableRow key={index}>
                            <TableCell sx={{ backgroundColor: 'gray' }} align='left'>
                                <Grid container>
                                    <Grid item>
                                        <Typography align="centre" variant="subtitle1">
                                            {menu.day}{' '}
                                        </Typography>
                                        <br />
                                    </Grid>
                                </Grid>
                            </TableCell>
                            <TableCell>
                                {menu.menuItems?.map((item, i) => (
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Typography variant="h6">{item.group}</Typography>
                                        </Grid>
                                    </Grid>))}
                            </TableCell>
                            <TableCell>
                                {menu.menuItems?.map((item, i) => (
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Typography variant="caption">{item.menuItem}</Typography>
                                        </Grid>
                                    </Grid>))}
                            </TableCell>
                            <TableCell>
                                {menu.menuItems?.map((item, i) => (
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Typography variant="caption">{item.unit}{' '}{item.quatifier}</Typography>
                                        </Grid>
                                    </Grid>))}
                            </TableCell>
                        </TableRow>))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default MenuCard;