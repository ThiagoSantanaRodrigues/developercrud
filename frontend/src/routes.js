import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Developers from './screens/developers/index';

export default function Routes() {
    return (
        <BrowserRouter>
            <Route exact path='/' component={Developers} />
        </BrowserRouter>
    )
}