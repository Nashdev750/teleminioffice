import * as React from 'react';

// material-ui
import {
    Grid,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow
} from '@mui/material';

import { gridSpacing } from 'store/constant';
// project imports
import SubCard from 'ui-component/cards/SubCard';
// ==============================|| FORM WIZARD - BASIC  ||============================== //

function Warehousereview({ Packages }) {
    return (
        <>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    {Packages.map((p) => (
                        <Grid item xs={12} sm={6} md={3}>
                            <SubCard>
                                <TableContainer>
                                    <Table sx={{ minWidth: 'auto', paddingTop: 4 }} size="small" aria-label="simple table">
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>
                                                    <Typography variant="h3" gutterBottom>{p.name}</Typography>
                                                </TableCell>
                                                <TableCell />
                                            </TableRow>
                                            {p?.packages?.map(pk => (
                                                <TableRow>
                                                    <TableCell >
                                                        <Typography variant="subtitle1"> {pk.package_size} {" "} {pk.unit} :</Typography>
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {pk.amount} {" "} {pk.pack}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </SubCard>
                        </Grid>
                    ))}
                </Grid>
            </Grid >
        </>
    );
}

export default Warehousereview;