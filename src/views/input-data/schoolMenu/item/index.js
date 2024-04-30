// material-ui
import React, { useEffect, useState } from "react";
import {
    Grid,
    InputAdornment,
    OutlinedInput,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Fab,
    TableSortLabel,
    TextField,
    Toolbar,
    Tooltip,
} from '@mui/material';

import http from "../../../../http-commom";
import { gridSpacing } from 'store/constant';
import MainCard from "ui-component/cards/MainCard";
import AddIcon from '@mui/icons-material/AddTwoTone';
import AddItemFormDialog from './addFoodItem';

// table header options
const headCells = [
    {
        id: 'group',
        numeric: false,
        label: 'Group',
        align: 'left'
    },
    {
        id: 'Name',
        numeric: false,
        label: 'Name',
        align: 'left'
    },
    {
        id: 'level',
        numeric: true,
        label: 'Level',
        align: 'left'
    },
    {
        id: 'unit',
        numeric: true,
        label: 'Unit',
        align: 'left'
    },
    {
        id: 'quantifier',
        numeric: false,
        label: 'Quantifier',
        align: 'left'
    }
];

function MenuItem() {
    const [items, setItems] = useState([]);
    const [addItem, setAddItem] = useState(false);

    const RetrieveMenuItems = async () => {
        http.get('/menu/all').then((response) => {
            if (response.status === 200) {
                // setSchoolMenus(response.data);
            }
        })
    }

    useEffect(() => {
        RetrieveMenuItems();
    }, [addItem]);

    const HandleOpenDialog = () => {
        setAddItem(true);
    };

    const HandleClose = (isClosed) => {
        setAddItem(isClosed);
    }

    const HandleAddItem = (item) => {
        const itm = item;
    }

    return (
        <>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} md={12}>
                    <MainCard content={false} title={
                        <Grid container justifyContent="space-between" alignItems="center" spacing={gridSpacing}>
                            <Grid item>
                                <Typography variant="h3">Item List</Typography>
                            </Grid>
                            <Grid item>
                                <Tooltip title="Add Food Item">
                                    <Fab
                                        color="primary"
                                        size="large"
                                        sx={{ boxShadow: 'none', ml: 1, width: 64, height: 64, minHeight: 64 }}
                                        onClick={HandleOpenDialog}
                                    >
                                        <AddIcon fontSize="small" />
                                    </Fab>
                                </Tooltip>
                            </Grid>
                        </Grid>
                    }>
                        <TableContainer>
                            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                                <TableHead>
                                    <TableRow>
                                        {headCells.map((headCell) => (
                                            <TableCell
                                                key={headCell.id}
                                                align={headCell.align}
                                                padding={headCell.disablePadding ? 'none' : 'normal'}
                                            >
                                                <TableSortLabel >
                                                    {headCell.label}
                                                </TableSortLabel>
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    {items.map((item, i) =>
                                        <TableRow
                                            hover
                                            tabIndex={-1}
                                            key={i}
                                        >
                                            <h1>Comeon dude</h1>
                                        </TableRow>)}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </MainCard>
                </Grid>
            </Grid>
            <AddItemFormDialog openDialog={addItem} HandleClose={HandleClose} HandleAddItem={HandleAddItem} />
        </>
    )
}
export default MenuItem;