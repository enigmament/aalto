import React, { useState } from 'react';

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




export default function TableElements(props) {

    const [page_number, setPageNumber] = useState(1);
    const page_size = 5
    const totalPage = Math.ceil(props.list.length / page_size);
    const startpage = (page_number - 1) * page_size;
    const endPage = page_number * page_size;
    const pagetoShow = props.list.slice(startpage, endPage);

    return (<div className="tablesearch">
        <Table class="tablecustom">
            <TableHead>
                <TableRow class="titlehead">
                    <TableCell>User ID</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Completed</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {pagetoShow.map((todo) => {
                    const imgpath = "/assets/images";
                    const completedimg = todo.completed ? CompletedImg : NotCompletedImg
                    return (
                        <TableRow class="rowbody">
                            <TableCell class="uid">{todo.userId}</TableCell>
                            <TableCell>{todo.title}</TableCell>
                            <TableCell class="image"><img src={completedimg} /></TableCell>
                        </TableRow>
                    )
                })
                }
            </TableBody>
        </Table>
        <Stack sx={{ paddingBottom: "40px", alignItems: "center" }} spacing={2}>
            <Pagination count={totalPage} onChange={(evt, page) => { setPageNumber(page) }} />
        </Stack>
    </div>)
}