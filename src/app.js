import React from 'react';
import { connect } from "react-redux";

import "./sass/style.scss";

import { Grid } from '@mui/material';
import SearchMenu from './searchMenu'
import TableElements from './tableElements'



const App = function (props) {
    if (!props.data) {
        return <div />
    }
    const listUserID = [... new Set(props.data.map((todo) => todo.userId))];
    return (
        <div className="main">
            <Grid container justifyContent="center" alignItems="center">
                <Grid container item md={10} rowSpacing={12} spacing={12} direction="row" justifyContent="center" alignItems="flex-start">
                    <Grid item xs={12} sm={10} lg={4} rowSpacing={12}>
                        <SearchMenu listUser={listUserID} />
                    </Grid>
                    <Grid item xs={12} sm={10} lg={8} rowSpacing={12}>
                        <TableElements />
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        data: state.dataFromServer
    }
}


export default connect(mapStateToProps, null)(App);