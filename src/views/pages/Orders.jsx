import PropTypes from 'prop-types';
import * as React from 'react';
import moment from 'moment';

// material-ui
import {
    Box,
    Checkbox,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableSortLabel,
    TableRow,
    Toolbar,
    Tooltip,
    Typography,
    Stack,
    Button
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';

// project imports
import MainCard from 'ui-component/cards/MainCard';
// import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
// import { CSVExport } from './TableExports';
// import { header } from './TableBasic';

// assets
import DeleteIcon from '@mui/icons-material/Delete';
import httpCommom from 'http-commom';

// table data
function createData(name, calories, fat, carbs, protein) {
    return {
        name,
        calories,
        fat,
        carbs,
        protein
    };
}

// table data


// table filter
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(rows, comparator) {
    console.log(rows)
    const stabilizedThis = rows?.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

// table header
const headCells = [
    {
        id: 'items',
        numeric: false,
        disablePadding: true,
        label: 'Order Items'
    },
    {
        id: 'total',
        numeric: true,
        disablePadding: false,
        label: 'Total($)'
    },
    {
        id: 'Customer',
        numeric: true,
        disablePadding: false,
        label: 'Customer Name'
    },
    {
        id: 'Phone',
        numeric: true,
        disablePadding: false,
        label: 'Phone Number'
    },
    {
        id: 'address',
        numeric: true,
        disablePadding: false,
        label: 'Address'
    },
    {
        id: 'Notes',
        numeric: true,
        disablePadding: false,
        label: 'Notes'
    },
    {
        id: 'orderdate',
        numeric: true,
        disablePadding: false,
        label: 'Order Date'
    },
    {
        id: 'status',
        numeric: true,
        disablePadding: false,
        label: 'Status'
    }
];

// ==============================|| TABLE - HEADER ||============================== //

function EnhancedTableHead({ onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort }) {
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align='left'
                        padding='normal'
                        sortDirection={orderBy === headCell.id ? order : undefined}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
                <TableCell  sx={{ pl: 3 }}>
                    Actions
                </TableCell>
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired
};

// ==============================|| TABLE - TOOLBAR ||============================== //

const EnhancedTableToolbar = ({ numSelected }) => (
<></>
);

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired
};

// ==============================|| TABLE - ENHANCED ||============================== //

export default function Orders() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [selectedValue, setSelectedValue] = React.useState([]);
    const [rows, setRows] = React.useState([]);

    React.useEffect(()=>{
        httpCommom.get('orders')
        .then(res=>{
             setRows(res.data)
        })
    },[])

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            if (selected.length > 0) {
                setSelected([]);
            } else {
                const newSelectedId = rows.map((n) => n.name);
                setSelected(newSelectedId);
            }
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        const selectedRowData = rows.filter((row) => newSelected.includes(row.name.toString()));
        setSelectedValue(selectedRowData);
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event?.target.value, 10));
        setPage(0);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const deleteOrder = (name, id)=>{
        const ok = window.confirm(`Delete ${name}`)
        if(!ok) return
        httpCommom.get(`order/delete/${id}`)
        .then(res=>{
          setRows(res.data)
        })
    }
    const cancelOrder = (name, id)=>{
        const ok = window.confirm(`Cancel ${name}`)
        if(!ok) return
        httpCommom.post(`order/${id}`,{status:2})
        .then(res=>{
          setRows(res.data)
        })
    }
    const completeOrder = (name, id)=>{
        const ok = window.confirm(`Complete ${name}`)
        if(!ok) return
        httpCommom.post(`order/${id}`,{status:1})
        .then(res=>{
          setRows(res.data)
        })
    }


    const getAddress = (details)=>{
        return `${details.address1} ${details.address2}, ${details.city}, ${details.state}, ${details.postcode}`
    }
    const STATUS = {
    0:"pending",
    1:"Completed",
    2:"Cancelled"
    }
    const getTotal = (items)=>{
        return items.reduce((total, currentItem) => {
            return total + (currentItem.price * currentItem.count);
          }, 0);
           
    }
    return (
        <MainCard
            content={false}
            title="Products">
            <EnhancedTableToolbar numSelected={selected.length} />

            {/* table */}
            <TableContainer>
                <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
                    <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                    />
                    <TableBody>
                        {stableSort(rows, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                if (typeof row === 'number') return null;
                                const isItemSelected = isSelected(row.name);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) => handleClick(event, row.name)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.name}
                                        selected={isItemSelected}
                                    >
                                        <TableCell component="th" id={labelId} scope="row" padding="normal">
                                            {row.items.map(itm=>`${itm.name} x ${itm.count}(${itm.price})`).join(', ')}
                                        </TableCell>
                                        <TableCell align="left">{getTotal(row.items)}</TableCell>
                                        <TableCell align="left">{row.shippingdetails.fullname}</TableCell>
                                        <TableCell align="left">{row.shippingdetails.phone}</TableCell>
                                        <TableCell align="left">{getAddress(row.shippingdetails)}</TableCell>
                                        <TableCell align="left">{row.shippingdetails.notes}</TableCell>
                                        <TableCell align="left">{moment(row.createdAt).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
                                        <TableCell align="left">{STATUS[row.status]}</TableCell>
                                        <TableCell align="left" style={{display:'flex',gap:'5px',flexDirection:"column"}}>
                                            <Button style={{background:'rgb(10, 152, 97)',color:'white'}} onClick={e=>completeOrder("order",row._id)}>Complete</Button>
                                            <Button style={{background:'rgb(209, 164, 18)',color:'white'}} onClick={e=>cancelOrder("order",row._id)}>Cancel</Button>
                                            <Button style={{background:'tomato',color:'white'}} onClick={e=>deleteOrder("order",row._id)}>Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        {emptyRows > 0 && (
                            <TableRow
                                style={{
                                    height: (dense ? 33 : 53) * emptyRows
                                }}
                            >
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* table pagination */}
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </MainCard>
    );
}
