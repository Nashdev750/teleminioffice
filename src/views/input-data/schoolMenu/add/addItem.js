import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// material-ui
import {
    Button,
    FormControl,
    Grid,
    MenuItem,
    OutlinedInput,
    Select,
    Stack,
    TextField,
    Typography
} from '@mui/material';

// Services
import StaticDataService from 'services/staticData.service'

// project imports
import { gridSpacing } from 'store/constant';

// assets
const foodGroups = StaticDataService.FoodGroup;
const MenuItems = StaticDataService.MenuItems;

// ==============================|| ADD ITEM PAGE ||============================== //

function AddMenuItemPage({ handleAddItem, setAddItemClicked }) {
    const [selectedItem, setSelectedItem] = useState(null);
    const [menuItem, setMenuItem] = useState('');
    const [quantity, setQuantity] = useState(null);
    const [menuItemData, setMenuItemData] = useState(MenuItems);

    const handleChange = (event) => {
        const value = event.target.value;
        if (event.target.name === 'menuName') {
            const selectedOption = foodGroups.find((group) => group === value);
            setSelectedItem(selectedOption);
            setMenuItemData(MenuItems.filter(i => i.group === selectedOption));
            setMenuItem(undefined);

        } else if (event.target.name === 'menuItem') {
            const selectedOption = MenuItems.find(i => i.item === value.item);
            setMenuItem(selectedOption);
            const quantity = "".concat(selectedOption.unit, selectedOption.quatifier);// ${selectedOption.quatifier}
            setQuantity(quantity);
        } else {
            setQuantity(Number(value));
        }
    };

    const handleOk = () => {
        const data = {
            selectedItem: selectedItem,
            menuItem: menuItem.item,
            quantity: menuItem.unit,
            quatifier: menuItem.quatifier
        };
        handleAddItem(data);
    };

    return (
        <>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} md={5}>
                    <Stack spacing={1}>
                        <Typography variant="subtitle1">Food Group</Typography>
                        <FormControl>
                            <Select
                                fullWidth
                                displayEmpty
                                name='menuName'
                                value={selectedItem || ''}
                                onChange={handleChange}
                                input={<OutlinedInput />}
                                renderValue={(selected) => {
                                    if (selected.length === 0) {
                                        return (
                                            <Typography color="textSecondary" sx={{ lineHeight: '1.4375em' }}>
                                                Select Group
                                            </Typography>
                                        );
                                    }
                                    const selectedData = foodGroups.filter((group) => group === selected)[0];

                                    return (
                                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ width: '100%' }}>
                                            <Typography variant="subtitle1" sx={{ lineHeight: '1.4375em' }}>
                                                {selectedData}
                                            </Typography>
                                        </Stack>
                                    );
                                }}
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem disabled value="">
                                    <Typography color="textSecondary">Select Menu</Typography>
                                </MenuItem>
                                {foodGroups.map((group, i) => (
                                    <MenuItem key={i} value={group}>
                                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ width: '100%' }}>
                                            <Typography variant="subtitle1">{group}</Typography>
                                        </Stack>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Stack>
                </Grid>
                <Grid item xs={12} md={5}>
                    <Stack spacing={1}>
                        <Typography variant="subtitle1" id="itemQuantity">
                            Menu Item
                        </Typography>
                        <FormControl>
                            <Select
                                fullWidth
                                displayEmpty
                                name='menuItem'
                                value={menuItem || ''}
                                onChange={handleChange}
                                renderValue={(selected) => {
                                    if (selected.length === 0) {
                                        return (
                                            <Typography color="textSecondary" sx={{ lineHeight: '1.4375em' }}>
                                                Select Menu Item
                                            </Typography>
                                        );
                                    }

                                    const selectedData = MenuItems.filter(i => i === selected)[0];

                                    return (
                                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ width: '100%' }}>
                                            <Typography variant="subtitle1" sx={{ lineHeight: '1.4375em' }}>
                                                {selectedData.item}
                                            </Typography>
                                        </Stack>
                                    );
                                }}
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                {menuItemData.map((item, i) => (
                                    <MenuItem key={i} value={item}>
                                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ width: '100%' }}>
                                            <Typography variant="subtitle1">{item.item}</Typography>
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
                            Quantity
                        </Typography>
                        <TextField
                            fullWidth
                            name="quantity"
                            disabled
                            value={quantity || ''}
                            onChange={handleChange}
                        />
                    </Stack>
                </Grid>
                <Grid item container justifyContent="flex-end">
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Button color="error" onClick={() => setAddItemClicked(false)}>
                            Cancel
                        </Button>
                        <Button
                            disabled={!selectedItem || !menuItem}
                            variant="contained"
                            size="small"
                            onClick={handleOk}
                        >
                            Add
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </>
    );
}

AddMenuItemPage.propTypes = {
    handleAddItem: PropTypes.func,
    setAddItemClicked: PropTypes.func
};

export default AddMenuItemPage;
