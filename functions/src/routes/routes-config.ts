import { Application } from "express";
import UserController from "../users/controller";
import CustomerController from "../customers/controller";
import { isAuthenticated } from "../auth/authenticated";
import { isAuthorized } from "../auth/authorized";


export function routesConfig(app: Application) {
    /** USERS **/
    app.post('/users',
        isAuthenticated,
        isAuthorized({ hasRole: ['admin', 'manager'] }),
        UserController.create
    );
    // lists all users
    app.get('/users', [
        //isAuthenticated,
        //isAuthorized({ hasRole: ['admin', 'manager'] }),
        UserController.all
    ]);
    // get :id user
    app.get('/users/:id', [
        isAuthenticated,
        isAuthorized({ hasRole: ['admin', 'manager'], allowSameUser: true }),
        UserController.get
    ]);
    // updates :id user
    app.patch('/users/:id', [
        isAuthenticated,
        isAuthorized({ hasRole: ['admin', 'manager'], allowSameUser: true }),
        UserController.patch
    ]);
    // deletes :id user
    app.delete('/users/:id', [
        isAuthenticated,
        isAuthorized({ hasRole: ['admin', 'manager'] }),
        UserController.remove
    ]);

    /****************************************************/
    /***************** CUSTOMERS ************************/
    app.post('/customers',
        isAuthenticated,
        isAuthorized({ hasRole: ['admin', 'manager'] }),
        CustomerController.create
    );
    // lists all customers
    app.get('/customers', [
        CustomerController.all
    ]);
    // get :id customer
    app.get('/customers/:id', [
        isAuthenticated,
        isAuthorized({ hasRole: ['admin', 'manager'], allowSameUser: true }),
        CustomerController.get
    ]);
    // updates :id customer
    app.patch('/customers/:id', [
        isAuthenticated,
        isAuthorized({ hasRole: ['admin', 'manager'], allowSameUser: true }),
        CustomerController.patch
    ]);
    // deletes :id customer
    app.delete('/customers/:id', [
        isAuthenticated,
        isAuthorized({ hasRole: ['admin', 'manager'] }),
        CustomerController.remove
    ]);

}