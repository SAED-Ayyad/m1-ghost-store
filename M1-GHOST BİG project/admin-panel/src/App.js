import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import Login from './components/Login';
import UpdateProduct from './components/UpdateProduct';
import UpdateUser from './components/UpdateUser';

const App = () => {
    return (
        <Router>
            <div>
                <header>
                    <h1>Admin Panel</h1>
                </header>
                <Switch>
                    <Route path="/add-product" component={AddProduct} />
                    <Route path="/update-product/:id" component={UpdateProduct} />
                    <Route path="/update-user" component={UpdateUser} />
                    <Route path="/login" component={Login} />
                    <Route path="/" component={ProductList} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;
