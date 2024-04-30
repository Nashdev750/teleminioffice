import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    Typography,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    Divider,
    FormHelperText,
    Grid,
    MenuItem,
    Select,
    Stack,
    TextField,
    InputAdornment,
    OutlinedInput
} from '@mui/material';
import InputLabel from 'ui-component/extended/Form/InputLabel';
import { gridSpacing } from 'store/constant';
import { IntakeFoodItems, GetItemsWithSameName } from 'services/function.service';
import ItemQuantity from './ItemQuantity';
import SubCard from 'ui-component/cards/SubCard';

// assets
import { IconSearch } from '@tabler/icons';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

const sxDivider = {
    borderColor: 'primary.light'
};

function WarehouseForm2({ orderList, updateOrderlist }) {
    const theme = useTheme();
    const [products, setProducts] = useState([]);
    const [selectProduct, setSelectedProducts] = useState(null);
    const [selectIndex, setSelectIndex] = useState(undefined);

    function getProducts() {
        const pro = []
        orderList?.orders[0]?.menuItems?.forEach(i => {
            pro.push(i.item);
        })
        setProducts(pro);
    }

    const HandleProductChange = (event) => {
        const pro = orderList?.orders[0]?.menuItems?.find(menuItem => menuItem.item === event.target.value);

        const index = orderList.orders[0]?.menuItems?.indexOf(pro);
        setSelectIndex(index);
        setSelectedProducts(pro);
    }
    useEffect(() => {
        getProducts()
    }, [orderList])

    return (
        <>
            <SubCard title="Order Stock Intake">
                {/* <Grid container alignItems="center" spacing={gridSpacing}>
                    <Grid item xs zeroMinWidth>
                        <OutlinedInput
                            id="input-search-card-style1"
                            placeholder="Search Contact"
                            fullWidth
                            startAdornment={
                                <InputAdornment position="start">
                                    <IconSearch stroke={1.5} size="16px" />
                                </InputAdornment>
                            }
                        />
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<AddCircleOutlineOutlinedIcon />}
                            sx={{ px: 2.75, py: 1.5 }}
                        >
                            Add
                        </Button>
                    </Grid>
                </Grid> */}

                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={6}>
                        <Stack>
                            <InputLabel>Select Product</InputLabel>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Stack>
                            <InputLabel>Product</InputLabel>
                            <Select
                                labelId="Product-select"
                                id="Product"
                                name="Product"
                                label="Product"
                                onChange={HandleProductChange}
                            >
                                {products?.map((option, i) => (
                                    <MenuItem value={option} key={i}>{option}</MenuItem>
                                ))}
                            </Select>
                        </Stack>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Divider sx={sxDivider} />
                </Grid>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        {selectProduct !== null &&
                            <ItemQuantity updateOrderlist={updateOrderlist}
                                item={selectProduct}
                                orderId={selectIndex} orderlist={orderList._id} />}
                    </Grid>
                </Grid>
            </SubCard>
        </>
    )
}
export default WarehouseForm2;