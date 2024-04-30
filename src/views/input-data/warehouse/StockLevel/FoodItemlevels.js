import React from 'react';
import {
    Grid,
    Typography,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Chip,
    Stack,
    Avatar,
    Paper
} from '@mui/material';

// project imports 
import { gridSpacing } from 'store/constant';


const sxDivider = {
    borderColor: 'primary.light'
};

function FoodItemlevelTemp({ stocklevel }) {
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    {stocklevel?.map((i) => (
                        <Grid item xs={12} sm={6} md={4} sx={{ minHeight: '105px' }}>
                            <Stack spacing={2} sx={{ height: 410, alignItems: "center", border: "1px solid #ccc", borderRadius: 8 }} alignItems="center">
                                <Stack direction="row" spacing={1}>
                                    <Avatar src={i.img} size="sm" /> {' '}
                                    <Typography sx={{ textAlign: 'center', justifyContent: 'center' }} align='center' variant="h3">
                                        {i.name}
                                    </Typography>
                                </Stack>
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell sx={{ pl: 3 }}>Size</TableCell>
                                                <TableCell>Quantity</TableCell>
                                                <TableCell>Symbol</TableCell>
                                                <TableCell align="right" sx={{ pr: 3 }}>
                                                    Level
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {i.quantity?.map((row, index) => (
                                                <TableRow hover key={index}>
                                                    <TableCell sx={{ pl: 3 }}>
                                                        <Grid item xs zeroMinWidth>
                                                            <Typography component="div" align="left" variant="subtitle1">
                                                                {row.size}
                                                            </Typography>
                                                        </Grid>
                                                    </TableCell>
                                                    <TableCell>{row.units}</TableCell>
                                                    <TableCell>{row.symbol}</TableCell>
                                                    <TableCell align="right" sx={{ pr: 3 }}>
                                                        <Chip color='error' label='Low' size="small" />
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Stack>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid >
    );
}

export default FoodItemlevelTemp; 
