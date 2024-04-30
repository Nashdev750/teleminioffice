// material-ui
import { Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

// ==============================|| PRODUCTS-DATA PAGE ||============================== //

function MenuItemsPage({ menuItemData, deleteMenuItemHandler }) {
    return (
        <>
            {menuItemData.length ? (
                <Grid item xs={12}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ pl: 1 }}>Food Group</TableCell>
                                    <TableCell align="right">Menu Item</TableCell>
                                    <TableCell align="right">Quantity</TableCell>
                                    <TableCell align="right" sx={{ pr: 3 }} />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {menuItemData.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell sx={{ pl: 3 }}>
                                            <Typography align="left" variant="body2">
                                                {row.group}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="right">{row.menuItem}</TableCell>
                                        <TableCell align="right">{row.unit} {row.quatifier}</TableCell>
                                        <TableCell sx={{ pr: 1 }} align="right">
                                            <IconButton
                                                color="error"
                                                size="small"
                                                onClick={() => deleteMenuItemHandler(row)}
                                                aria-label="Mednu Delete"
                                            >
                                                <DeleteTwoToneIcon fontSize="small" />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            ) : null}
        </>
    );
}

export default MenuItemsPage;