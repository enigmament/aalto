import React from 'react';
import { Switch, TextField, InputAdornment } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

class SearchMenu extends React.Component {


    render() {
        const labelTitle = "FILTERS";

        return (
            <div className="menu">
                <div className="title">
                    {labelTitle}
                </div>
                <div className="inputsearch">

                </div>
                <div className="switchSearch">
                    <p className="label">Completed</p>
                    <div>
                        <FormControlLabel
                            value="YES"
                            control={<Switch color="primary" />}
                            label="NO"
                            labelPlacement="start" />

                    </div>

                </div>
                <div className="userIDSearch">
                    <p className="label">Completed</p>
                </div>
                <div className="reset">
                    <a>Reset filter</a>
                </div>
            </div>
        );
    }
}
export default SearchMenu