import React, { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
    Typography,
    OutlinedInput,
    Select,
    MenuItem,
    FormControl,
    Grid
} from '@mui/material';
import StaticDataService from 'services/staticData.service';
import { gridSpacing } from 'store/constant';

const foodGroups = StaticDataService.FoodGroup;
const levels = StaticDataService.Level;
const quantifiers = StaticDataService.Quantifiers;

/* const validationSchema = yup.object({
    name: yup.string().required('Item name is required'),
    foodGroup: yup.string().required('Food Group is required'),
    level: yup.number().required('School Level is required'),
    unit: yup.string().required('Item unit is required'),
    quantifier: yup.string().required('Item quantifier is required')
}); */

export default function AddItemFormDialog({ openDialog, HandleClose, HandleAddItem }) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(openDialog);

    const [name, setName] = useState(null);
    const [foodGroup, setfoodGroup] = useState(null);
    const [level, setLevel] = useState(null);
    const [unit, setUnit] = useState(null);
    const [quantifier, setQuantifier] = useState(null);

    const handleClose = () => {
        setOpen(false);
        HandleClose(false);
    };

    const handleChange = (event) => {
        const value = event.target.value;
        if (event.target.name === 'name') {
            setName(value);
        } else if (event.target.name === 'level') {
            setLevel(value);
        } else if (event.target.name === 'foodGroup') {
            setfoodGroup(value);
        } else if (event.target.name === 'quantifier') {
            setQuantifier(value);
        } else {
            setUnit(value);
        }
    }

    const Submit = () => {

        const itemData = {
            name: name,
            foodGroup: foodGroup,
            level: level,
            unit: unit,
            quantifier: quantifier
        };

        HandleAddItem(itemData);
        setOpen(false);
        HandleClose(false);
    }

    useEffect(() => {
        setOpen(openDialog);
    }, [openDialog]);
    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="lg" fullWidth>
                {open && (
                    <>
                        <DialogTitle id="form-dialog-title">Add Food Item</DialogTitle>
                        <DialogContent>
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={12} md={3}>
                                    <Stack spacing={1}>
                                        <Typography variant="subtitle1" id="itemAmount">
                                            Item Name
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            name="name"
                                            value={name}
                                            onChange={handleChange}
                                        />
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <Stack spacing={1}>
                                        <Typography variant="subtitle1">Food Group</Typography>
                                        <FormControl sx={{ minWidth: '100%' }}>
                                            <Select
                                                inputProps={{ name: 'foodGroup', id: 'max-width' }}
                                                value={foodGroup}
                                                onChange={handleChange}>
                                                {foodGroups.map((group, i) => (
                                                    <MenuItem key={i} value={group}>
                                                        <Stack direction="row" justifyContent="space-between"
                                                            alignItems="center" sx={{ width: '100%' }}>
                                                            <Typography variant="subtitle1">{group}</Typography>
                                                        </Stack>
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={2}>
                                    <Stack spacing={1}>
                                        <Typography variant="subtitle1">Level</Typography>
                                        <FormControl sx={{ minWidth: '100%' }}>
                                            <Select
                                                inputProps={{ name: 'level', id: 'max-width' }}
                                                value={level}
                                                onChange={handleChange}>
                                                {levels.map((lv, i) => (
                                                    <MenuItem key={i} value={lv}>
                                                        <Stack direction="row" justifyContent="space-between"
                                                            alignItems="center" sx={{ width: '100%' }}>
                                                            <Typography variant="subtitle1">{lv}</Typography>
                                                        </Stack>
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={2}>
                                    <Stack spacing={1}>
                                        <Typography variant="subtitle1" id="itemAmount">
                                            Unit
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            type='number'
                                            name="unit"
                                            value={unit}
                                            onChange={handleChange}
                                        />
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={2}>
                                    <Stack spacing={1}>
                                        <Typography variant="subtitle1"> Quantifier</Typography>
                                        <FormControl sx={{ minWidth: '100%' }}>
                                            <Select inputProps={{ name: 'quantifier', id: 'max-width' }}
                                                value={quantifier}
                                                onChange={handleChange}>
                                                {quantifiers.map((qt, i) => (
                                                    <MenuItem key={i} value={qt}>
                                                        <Stack direction="row" justifyContent="space-between"
                                                            alignItems="center" sx={{ width: '100%' }}>
                                                            <Typography variant="subtitle1">{qt}</Typography>
                                                        </Stack>
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions sx={{ pr: 2.5 }}>
                            <Button sx={{ color: theme.palette.error.dark }} onClick={handleClose} color="secondary">
                                Cancel
                            </Button>
                            <Button variant="contained" size="small" onClick={Submit}>
                                Add
                            </Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </div >
    )
}