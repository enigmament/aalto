import React, { useState } from 'react';

import { connect } from "react-redux";

import { filterToDo, resetFilterToDo } from "./reducer/actions";

import { useTheme } from '@mui/material/styles';
import { Button, InputBase, Select, MenuItem, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/system';
import SwitchUnstyled, { switchUnstyledClasses } from '@mui/core/SwitchUnstyled';


function getStyles(name, usersID, theme) {
    return {
        fontWeight:
            usersID.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const Root = styled('span')(`
    font-size: 0;
    position: relative;
    display: inline-block;
    width: 100px;
    height: 40px;

    margin: 10px;
    cursor: pointer;

    & .${switchUnstyledClasses.track} {
        background: #B3C3D3;
        border-radius: 20px;
        display: block;
        height: 100%;
        width: 100%;
        position: absolute;
    }

    & .${switchUnstyledClasses.thumb} {
        display: block;
        width: 24px;
        height: 24px;
        top: 8px;
        left: 8px;
        border-radius: 30px;
        background-color: #FFF;
        position: relative;
        transition: all 200ms ease;
    }

    &.${switchUnstyledClasses.focusVisible} .${switchUnstyledClasses.thumb} {
        background-color: rgba(255,255,255,1);
        box-shadow: 0 0 1px 8px rgba(0,0,0,0.25);
    }

    &.${switchUnstyledClasses.checked} { 
    .${switchUnstyledClasses.thumb} {
        left: 68px;
        top: 8px;
        background-color: #FFF;
    }

    .${switchUnstyledClasses.track} {
        background: #007FFF;
    }
    }

    & .${switchUnstyledClasses.input} {
        cursor: inherit;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        opacity: 0;
        z-index: 1;
        margin: 0;
  }`);


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
                <div className="itemCompleted">
                    <span className={switchNullClass}>NO</span>

                    <SwitchUnstyled component={Root}  value="YES" checked={completed}
                        onChange={(event) => {
                            const value = event.target.checked;
                            toggleCompleted(event.target.checked);
                            setCompleted(value);
                        }}/>
                    <Button variant="text" variant="contained" onClick={() => { setCompleted(null) }}>Reset switch</Button>
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