import React from 'react';
import axios from "axios";

import "./sass/style.scss";
import SearchMenu from './searchMenu'
import TableElements from './tableElements'

const baseURL = "https://jsonplaceholder.typicode.com/todos";

export default function App() {
    const [toDos, setTodos] = React.useState(null);

    React.useEffect(() => {
        axios.get(baseURL).then((response) => {
            setTodos(response.data);
        });
    }, []);

    if (!toDos)
        return null;
    const listUserID = [... new Set(toDos.map((todo) => todo.userId))];
    return (
        <div className="main">
            <SearchMenu listUser={listUserID} />
            <TableElements list={toDos} color="primary" />
        </div>
    );
}