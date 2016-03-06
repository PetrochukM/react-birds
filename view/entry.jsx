'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Component from 'component/index.jsx';

ReactDOM.render(
    <Component colors={['#000', '#333', '#666', '#999', '#ccc', '#fff']} width="15em" height="1.5em" />, // Render Component
    document.getElementById('entry')
);
