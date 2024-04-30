import React, { useEffect, useState } from 'react';
import {
    Box,
    TableCell,
    Collapse,
    TableRow,
    IconButton,
    Chip,
    Button,
    Dialog,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText  
} from '@mui/material';
import BreakfastDiningIcon from '@mui/icons-material/BreakfastDining'; 
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add'; 
import Avatar from 'ui-component/extended/Avatar';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent'; 
import DialogTitle from '@mui/material/DialogTitle';
import {
    GridRowModes,
    DataGrid,
    GridToolbarContainer, 
    GridRowEditStopReasons,
} from '@mui/x-data-grid';
// assets
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'; 
import OrderService from 'services/order.service';
import WarehouseService from 'services/warehouse.service';

import ModeEditIcon from '@mui/icons-material/ModeEdit';
import BeenhereIcon from '@mui/icons-material/Beenhere'; 


function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
        const id = Math.floor(Math.random() * 1000);
        setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
        }));
    };

    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
                Add record
            </Button>
        </GridToolbarContainer>
    );
}



function ItemQuantity({ item, orderId, orderlist, updateOrderlist }) {
    const [open, setOpen] = React.useState(false);
    const [rows, setRows] = React.useState([]);
    const [rowModesModel, setRowModesModel] = React.useState({});
    const [formData, setFormData] = useState()


    useEffect(() => {
        const _rows = []
        const _formdata = []
        item?.packaging?.forEach((element, i) => {
            _rows.push({
                id: i,
                amount: element.amount,
                quantity: `${element.package_size} ${element.unit}`,
                delivered: item.delivered.reduce((a, c) => {
                    if (c[1] === i) {
                        a += c[0]
                    }
                    return a
                }, 0)
            })
            _formdata.push({
                ...element,
                delivered: item.delivered.filter(d => d[1] === i),
                remaining: element.amount - (item.delivered.reduce((a, c) => {
                    if (c[1] === i) {
                        a += c[0]
                    }
                    return a
                }, 0))

            })

        });
        console.log('--form data--')
        console.log(_formdata)
        console.log('--end form data--')
        setFormData(_formdata)
        setRows(_rows);

    }, [item])

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id) => () => {
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns = [
        { field: 'quantity', headerName: 'Quantity', width: 180, editable: false },
        {
            field: 'amount',
            headerName: 'Expected Units',
            type: 'number',
            width: 180,
            align: 'left',
            headerAlign: 'left',
            editable: false,
        },
        { field: 'delivered', headerName: 'Delivered', width: 180, editable: false }
    ];
    const [openDialog, setOpenDialog] = React.useState(false);

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };
    const handChange = (value, index) => {
        if (Number.isNaN((value))) return value;
        const amount = Number(value)
        if (amount < 0) return amount
        console.log(formData[index])
        formData[index].error = (formData[index].remaining - amount) < 0
        setFormData([...formData])
        if (formData[index].error) return amount
        let ind = -1
        for (let x = 0; x < formData[index].delivered.length; x++) {
            const itm = formData[index].delivered[x]
            if (itm.length === 4 && itm[1] === index) {
                ind = x
                break
            }
        }

        if (ind >= 0) {
            if (amount === 0) {
                formData[index].delivered.splice(ind, 1)

            } else {
                formData[index].delivered[ind][0] = amount
            }
        } else {
            if (amount <= 0) return amount
            formData[index].delivered.push([amount, index, new Date(), "draft"])
        }
        setFormData([...formData])
        return amount
    }
    const handleSave = async () => {
        const items = []
        formData.forEach((fromd, i) => {
            fromd?.delivered?.forEach(itm => {
                if (itm.length === 4) {
                    const track = {
                        orderId,
                        packageId: itm[1],
                        quantity: itm[0],
                        menuId: -1,
                        orderlist,
                        item: item.item,
                        package_size: item.packaging[itm[1]].package_size,
                        name: item.packaging[itm[1]].name,
                    }
                    items.push(track)
                }
            });
        });
        console.log(items)
        if (items.length > 0) {
            // save items here
            try {

                await OrderService.saveMonthStockTracking(items)
                await WarehouseService.UpdateWarehouseStockLevel(items)
                await updateOrderlist()
            } catch (error) {
                console.log(error)
            }
        }

    }
    return (
        <>
            <TableRow hover sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell sx={{ pl: 3 }}>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    <Avatar alt="User 1" src={item.img} size="md" />
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                    {item.item}
                </TableCell>
                <TableCell align="center">
                    {`${item.total / 1000} ${item.unit}`}
                </TableCell>
                <TableCell align="center">
                    {`${item.delivered.reduce((acc, curr) => acc + curr[0], 0)} ${item.unit}`}
                </TableCell>
                <TableCell align="center">
                    <Chip
                        size="small"
                        label='Processing'
                        chipcolor='warning'
                        sx={{ borderRadius: '4px', textTransform: 'capitalize' }}
                    />
                </TableCell>
                <TableCell align="center">
                    <Button onClick={setOpenDialog}>Edit</Button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        {open && (
                            <Box
                                sx={{
                                    height: 500,
                                    width: '100%',
                                    '& .actions': {
                                        color: 'text.secondary',
                                    },
                                    '& .textPrimary': {
                                        color: 'text.primary',
                                    },
                                }}
                            >
                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    editMode="row"
                                    rowModesModel={rowModesModel}
                                    onRowModesModelChange={handleRowModesModelChange}
                                    onRowEditStop={handleRowEditStop}
                                    processRowUpdate={processRowUpdate}
                                    slots={{
                                        toolbar: EditToolbar,
                                    }}
                                    slotProps={{
                                        toolbar: { setRows, setRowModesModel },
                                    }}
                                />
                            </Box>)}
                    </Collapse>
                </TableCell>
            </TableRow>
            <Dialog
                open={openDialog}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries((formData).entries());
                        const email = formJson.email;
                        console.log(email);
                        handleClose();
                    },
                }}
            >
                <DialogTitle>{item.group}</DialogTitle>
                <DialogContent>
                    <Grid xs={12} style={{ width: '320px', paddingTop: '10px' }}>
                        {formData?.map((p, i) => (
                            <>
                                {p.delivered?.map((itm, i) => (
                                    <List dense='dense'>
                                        <ListItem
                                            secondaryAction={
                                                <IconButton edge="end" aria-label="delete">
                                                    {itm.length > 3
                                                        ? <ModeEditIcon />
                                                        : <BeenhereIcon />
                                                    }
                                                </IconButton>
                                            }
                                        >
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <BreakfastDiningIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={`Total: ${itm[0]} ${p.unit}`}
                                                secondary={true ? `${itm[2]?.toLocaleString()}` : null}
                                            />
                                        </ListItem>
                                    </List>
                                ))}
                            </>
                        ))}
                    </Grid>
                    {formData?.map((p, i) => (
                        <Grid key={i} xs={12} style={{ width: '320px', paddingTop: '10px' }}>

                            <TextField
                                fullWidth
                                label={`${p.name}(required:${p.amount} ${p.unit}${p.amount > 1 ? "s" : ""})`}
                                type='number'
                                error={p?.error}
                                helperText=""
                                style={{ marginBottom: '20px' }}
                                disabled={p.remaining === 0}
                                onChange={e => handChange(e.target.value, i)}
                            />
                        </Grid>
                    ))}


                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    <Button type="submit" onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default ItemQuantity;
