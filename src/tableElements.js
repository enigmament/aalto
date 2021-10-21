import React, { useState } from 'react';
import { connect } from "react-redux";

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
//import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import CompletedImg from './assets/images/Tracciato_730@1X.png';
import NotCompletedImg from './assets/images/Tracciato_731@1X.png';




const TableElements = function (props) {

    let [page_number, setPageNumber] = useState(1);

    const listElement = props.results;
    const page_size = 5
    const totalPage = Math.ceil(listElement.length / page_size);
    page_number = page_number > totalPage ? totalPage : page_number;
    const startpage = (page_number - 1) * page_size;
    const endPage = page_number * page_size;
    const pagetoShow = listElement.slice(startpage, endPage);

    return (<div className="tablesearch">
        <Table className="tablecustom">
            <TableHead>
                <TableRow className="titlehead">
                    <TableCell className="uid">User ID</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell className="image">Completed</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {pagetoShow.map((todo, index) => {
                    const completedimg = todo.completed ? CompletedImg : NotCompletedImg
                    return (
                        <TableRow key={`${index}_${todo.id}`} className="rowbody">
                            <TableCell className="uid">{todo.userId}</TableCell>
                            <TableCell>{todo.title}</TableCell>
                            <TableCell className="image"><img src={completedimg} /></TableCell>
                        </TableRow>
                    )
                })
                }
            </TableBody>
        </Table>
        <Stack sx={{ paddingBottom: "40px", alignItems: "center" }} spacing={2}>
            <Pagination count={totalPage} page={page_number} onChange={(evt, page) => { setPageNumber(page) }} />
        </Stack>
    </div>)
}


const mapStateToProps = (state) => {
    return { results: state.results };
};


export default connect(mapStateToProps)(TableElements);