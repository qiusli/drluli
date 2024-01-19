import React, {lazy, Suspense} from 'react';
import {Link} from 'react-router-dom';

import Hamburger from './Hamburger';
import routes from '../../data/routes';
import routes2 from '../../data/routes2';
import hoverOvers from "../../data/hoverOvers";

const Menu = lazy(() => import('react-burger-menu/lib/menus/pushRotate'));

// Websites Navbar, displays routes defined in 'src/data/routes'
class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isGeneralDenOpen: false,
            isCosmeticDenOpen: false,
            open: false,
            items: []
        }
        this.handleClick = this.handleClick.bind(this);

    }

    handleClick(label, items, event) {
        console.log('== click items: ' + JSON.stringify(items));
        if (label === 'General Dentistry') {
            this.setState({
                open: !this.state.open,
                isGeneralDenOpen: !this.state.isGeneralDenOpen,
                items: items
            })
        } else {
            this.setState({
                open: !this.state.open,
                isGeneralDenOpen: !this.state.isGeneralDenOpen,
                items: items
            })
        }
    }

    render() {
        return (
            <header id="header">
                <h1 className="index-link">
                    {routes.filter((l) => l.index).map((l) => (
                        <Link key={l.label} to={l.path}>{l.label}</Link>
                    ))}
                </h1>
                <nav className="links">
                    <ul>
                        {routes.filter((l) => !l.index).map((l) => (
                            <li key={l.label}>
                                <Link to={l.path}>{l.label}</Link>
                            </li>
                        ))}
                        {hoverOvers.filter((l) => !l.index).map((l) => (
                            <li key={l.label} onClick={(e) => this.handleClick(l.label, l.items, e)}>
                                <Link to={l.path}>{l.label}</Link>
                            </li>
                        ))}
                        {routes2.filter((l) => !l.index).map((l) => (
                            <li key={l.label}>
                                <Link to={l.path}>{l.label}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                {this.state.isGeneralDenOpen && <Suspense fallback={<></>}>
                    <Menu right isOpen={this.state.open}>
                        <ul className="hamburger-ul">
                            {this.state.items.map((l) => (
                                <li key={l}>
                                    {l}
                                </li>
                            ))}
                        </ul>
                    </Menu>
                </Suspense>}
                {this.state.isCosmeticDenOpen && <Suspense fallback={<></>}>
                    <Menu right isOpen={this.state.open}>
                        <ul className="hamburger-ul">
                            {this.state.items.map((l) => (
                                <li key={l}>
                                    {l}
                                </li>
                            ))}
                        </ul>
                    </Menu>
                </Suspense>}
                <Hamburger/>
            </header>
        )
    }
}

export default Navigation;
