import './App.css';
import MaterialTable from "material-table";
import {useEffect, useState} from "react";
require('dotenv').config();

function App() {
    const [data, setData] = useState([]);

    useEffect(() => {
        let users;
        fetch(`${process.env.REACT_APP_API_URL}users`)
            .then(res => res.json())
            .then(res => {
                users = res.map(user => {
                    return {
                        name: user.name,
                        username: user.username,
                        email: user.email,
                        phone: user.phone && user.phone.split(' ')[0],
                        website: user.website
                    };
                });
				console.log(users[10]);
                setData(users);
            });
    }, []);

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const validateDetails = (newData) => {
        let errors = [];
        if (newData.name === undefined) {
            errors.push('Please Enter Name');
        }
        if (newData.username === undefined) {
            errors.push('Please Enter an User name');
        }
        if (newData.email === undefined || !validateEmail(newData.email)) {
            errors.push('Please Enter a valid Email Address');
        }
        if (newData.phone === undefined) {
            errors.push('Please Enter a phone number');
        }
        if (newData.website === undefined) {
            errors.push('Please Enter a website');
        }

        return errors;
    }

    const handleRowUpdate = async (newData, oldData, resolve) => {
        let errors = validateDetails(newData);
        let changedData = data;
        if (errors.length > 0) {
            alert(errors[0]);
        } else {

            await fetch(
				`${process.env.REACT_APP_API_URL}users/${oldData.tableData.id}`,
                {
                    headers: {'Content-Type': 'application/json'},
                    method: 'PUT',
                    body: JSON.stringify({
                        name: newData.name,
                        email: newData.email,
                        phone: newData.phone,
                        username: newData.username,
                        website: newData.website
                    })
                }
            ).then(res => res.json()).then(res => {
                console.log(res);
                changedData[oldData.tableData.id] = {
                    name: res.name,
                    username: res.username,
                    email: res.email,
                    phone: res.phone.split(' ')[0],
                    website: res.website
                };

            });
        }
        resolve();
        window.location.reload();
    };

    const handleRowAdd = async (newData, resolve) => {
        let errors = validateDetails(newData);

        if (errors.length > 0) {
            alert(errors[0]);
        } else {
            await fetch(`${process.env.REACT_APP_API_URL}users`, {
                headers: {'Content-Type': 'application/json'},
                method: 'POST',
                body: JSON.stringify({
                    name: newData.name,
                    email: newData.email,
                    phone: newData.phone,
                    username: newData.username,
                    website: newData.website
                })
            }).then(res => res.json()).then(res => console.log(res));
        }
        resolve();
        window.location.reload();
    };

    const handleRowDelete = async (oldData, resolve) => {
        await fetch(`${process.env.REACT_APP_API_URL}users/${oldData.tableData.id}`, {
            method: 'DELETE',
        }).then(res => res.json()).then();
        setData(prevData => {
            return prevData.splice(oldData.tableData.id, 1);
        });
        resolve();
        window.location.reload();
    };

    return (
        <div className="App">
            <MaterialTable
                title={'User Details'}
                columns={[
                    {title: 'Name', field: 'name'},
                    {title: 'User Name', field: 'username'},
                    {title: 'Email ID', field: 'email'},
                    {title: 'Phone Number', field: 'phone'},
                    {title: 'Website', field: 'website'}
                ]}
                data={data}
                editable={{
                    onRowUpdate: async (newData, oldData) =>
                        new Promise((resolve) => {
                            handleRowUpdate(newData, oldData, resolve);
                        }),
                    onRowAdd: async (newData) =>
                        new Promise((resolve) => {
                            handleRowAdd(newData, resolve)
                        }),
                    onRowDelete: async (oldData) =>
                        new Promise((resolve) => {
                            handleRowDelete(oldData, resolve)
                        }),
                }}
            />
        </div>
    );
}

export default App;
