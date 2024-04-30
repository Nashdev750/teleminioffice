import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    Typography
} from '@mui/material';
import { IntakeFoodItems, GetItemsWithSameName } from 'services/function.service';
import ItemQuantity from './ItemQuantity';
import SubCard from 'ui-component/cards/SubCard';

function WarehouseForm({ orderList, updateOrderlist }) {
    const theme = useTheme(); 

    return (
        <>
            <SubCard>
                <TableContainer>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ pl: 3 }} />
                                <TableCell />
                                <TableCell sortDirection={false} align="center" sx={{ pr: 3 }}>
                                    <Typography variant="h4" sx={{ color: theme.palette.grey[500] }} >
                                        Food Item
                                    </Typography>
                                </TableCell>
                                <TableCell sortDirection={false} align="center" sx={{ pr: 3 }}>
                                    <Typography variant="h4" sx={{ color: theme.palette.grey[500] }} >
                                        Total Expected
                                    </Typography>
                                </TableCell>
                                <TableCell sortDirection={false} align="center" sx={{ pr: 3 }}>
                                    <Typography variant="h4" sx={{ color: theme.palette.grey[500] }} >
                                        Total Recieved
                                    </Typography>
                                </TableCell>
                                <TableCell sortDirection={false} align="center" sx={{ pr: 3 }}>
                                    <Typography variant="h4" sx={{ color: theme.palette.grey[500] }} >
                                        Status
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orderList?.orders[0]?.menuItems?.map((item, i) => (
                                <ItemQuantity updateOrderlist={updateOrderlist} item={item} orderId={i} orderlist={orderList._id} key={i} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </SubCard>
        </>
    )
}
export default WarehouseForm;