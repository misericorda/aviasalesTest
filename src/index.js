import React from 'react'
import {render} from 'react-dom'
import {library} from '@fortawesome/fontawesome-svg-core'
// import {faFilter, faCheckSquare} from '@fortawesome/free-regular-svg-icons'
import {faFilter, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import App from './App'
import './styles/app.scss'

// Add needed FA icons
// Can be used later as
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// <FontAwesomeIcon icon={['far', iconClassName]}/>
library.add(faFilter, faShoppingCart);


render(<App/>, document.getElementById('app'));