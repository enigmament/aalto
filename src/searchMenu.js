import React, { useState } from 'react';

import { connect } from "react-redux";

import { filterToDo, resetFilterToDo } from "./reducer/actions";

import { useTheme } from '@mui/material/styles';
import { Paper, Switch, InputBase, Select, MenuItem, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';



function getStyles(name, usersID, theme) {
    return {
        fontWeight:
            usersID.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const SearchMenu = (props) => {
    const theme = useTheme();
    const [completed, toggleCompleted] = useState(false);
    const [inputTitle, setInputTitle] = useState("");
    const [usersID, setUserID] = React.useState([]);

    const labelTitle = "FILTERS";

    const handleChange = (event) => {
        const { target: { value }, } = event;
        let valuesID = typeof value === 'string' ? value.split(',') : value
        setUserID(valuesID);
        let filters = props.filters;
        filters.userid = valuesID;
        props.filterCompleted(filters);
    };

    const setCompleted = (val) => {
        let filters = props.filters
        filters.completed = val;
        props.filterCompleted(filters);
    }
    const setTitleFilter = () => {
        let filters = props.filters;
        filters.title = inputTitle;
        props.filterCompleted(props.filters);
    }

    const resetFilter = () => {
        props.resetFilterToDo();
        toggleCompleted(false);
        setInputTitle(""); setUserID([]);
    }

    const switchNullClass = props.filters.completed == null ? `emptySwitch filtercompletednull` : "emptySwitch";
    return (
        <div className="menu">
            <div className="title">
                {labelTitle}
            </div>
            <div className="inputsearch">
                <div className="inputTextWrapper">
                    <IconButton type="submit" sx={{ p: '10px', borderRadius: 0, backgroundColor: "#644C79", marginRight: "5px" }} aria-label="search" onClick={setTitleFilter}>
                        <SearchIcon sx={{ color: "#ffffff" }} />
                    </IconButton>
                    <InputBase type="text"
                        sx={{ flexGrow: 1 }}
                        value={inputTitle}
                        placeholder="Search..."
                        onKeyPress={(event) => {
                            if (event.charCode == 13 || event.keyCode == 13) {
                                setTitleFilter();
                            }
                        }}
                        onBlur={setTitleFilter}
                        onChange={(event) => {
                            let value = event.target.value;
                            setInputTitle(value);
                        }} />
                </div>
            </div>
            <div className="switchSearch">
                <p className="label">Completed</p>
                <div>
                    <span className={switchNullClass} onClick={() => { setCompleted(null) }}>NO</span>
                    <Switch color="primary"
                        value="YES"
                        checked={completed}
                        onChange={(event) => {
                            const value = event.target.checked;
                            toggleCompleted(event.target.checked);
                            setCompleted(value);
                        }}
                    />
                </div>

            </div>
            <div className="userIDSearch">
                <p className="label">SELECT USER ID</p>
                <Select sx={{ width: "100%" }} id="dmultiple userid" multiple value={usersID} onChange={handleChange} >
                    {props.listUser.map((userid) => {
                        return (
                            <MenuItem key={userid} value={userid} style={getStyles(userid, usersID, theme)}>
                                {userid}
                            </MenuItem>)
                    })}
                </Select>
            </div>
            <div className="reset">
                <span onClick={resetFilter}>
                    Reset filter
                </span>
            </div>
        </div >
    );
}

const mapStateToProps = (state) => {
    return { filters: state.filters };
};

function mapDispatchToProps(dispatch) {
    return {
        filterCompleted: (filter) => dispatch(filterToDo(filter)),
        resetFilterToDo: () => dispatch(resetFilterToDo())
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchMenu)