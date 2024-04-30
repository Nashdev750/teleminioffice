import React, { useEffect } from "react";
import { useSortBy, useTable } from "react-table";
import { useRowSpan } from "./useRowSpan";
import "./styles.css";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Grid
} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import Paper from '@mui/material/Paper';
import { gridSpacing } from 'store/constant';

const borderStyle = {
    border: "0.2px solid gray",
    padding: "8px 10px"
};

export default function OrderDetailTable({ HeaderColumns, Items, Type }) {
    const [tableData, setRows] = React.useState([]);
    const columns = React.useMemo(() => {
        return HeaderColumns;
    }, []);

    useEffect(() => {
        if (Type === "OrderDetails") {
            if (Items !== undefined) {
                Items.menuItems?.forEach(item => {
                    if (item.unit?.toLowerCase() === "g") {
                        item.totalView = "".concat(item.total / 1000, " KG");
                    } else {
                        item.totalView = "".concat(item.total / 1000, " Litres");
                    }
                })
                setRows(Items.menuItems);
            }
        } else {
            const packingList = []
            if (Items !== undefined) {
                Items.menuItems?.forEach(item => {
                    packingList.push(...item.packaging);
                })
                packingList.sort((a, b) => (a.name > b.name) ? 1 : -1);
                setRows(packingList);
            }
        }
    }, [Items]);

    const { getTableBodyProps, rows, prepareRow, rowSpanHeaders } =
        useTable({ columns, data: tableData }, (hooks) => hooks.useInstance.push(useRowSpan), useSortBy);

    return (

        <MainCard>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table aria-labelledby="tableTitle">
                            <TableHead style={{ backgroundColor: "#D3D3D3" }}>
                                {columns?.map((headCell) => (
                                    <TableCell
                                        key={headCell.accessor}
                                        padding={headCell.disablePadding ? 'none' : 'normal'}
                                        style={borderStyle}
                                    >
                                        {headCell.Header}
                                    </TableCell>
                                ))}
                            </TableHead>
                            <TableBody {...getTableBodyProps()}>
                                {rows?.map((row, i) => {
                                    prepareRow(row);

                                    for (let j = 0; j < row.allCells.length; j++) {
                                        const cell = row.allCells[j];
                                        const rowSpanHeader = rowSpanHeaders.find(
                                            (x) => x.id === cell.column.id
                                        );

                                        if (rowSpanHeader) {
                                            if (
                                                rowSpanHeader.topCellValue === null ||
                                                rowSpanHeader.topCellValue !== cell.value
                                            ) {
                                                cell.isRowSpanned = false;
                                                rowSpanHeader.topCellValue = cell.value;
                                                rowSpanHeader.topCellIndex = i;
                                                cell.rowSpan = 1;
                                            } else {
                                                rows[rowSpanHeader.topCellIndex].allCells[j].rowSpan++;
                                                cell.isRowSpanned = true;
                                            }
                                        }
                                    }
                                    return null;
                                })}
                                {rows?.map((row, i) => {
                                    return (
                                        <TableRow {...row.getRowProps()} key={i}>
                                            {row.cells.map((cell) => {
                                                if (cell.isRowSpanned) return null;
                                                return (
                                                    <TableCell
                                                        rowSpan={cell.rowSpan}
                                                        style={borderStyle}
                                                        {...cell.getCellProps()}
                                                    >
                                                        {cell.render("Cell")}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer >
                </Grid>
            </Grid>
        </MainCard>
    );
}
