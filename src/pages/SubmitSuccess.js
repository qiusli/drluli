import React from 'react';
import { Link } from 'react-router-dom';

import Main from '../layouts/Main';

const SubmitSuccess = () => (
    <Main
        title="Contact"
        description="Contact Dr.Lu Li via email @ drluli@gmail.com"
    >
        <article className="post" id="contact">
            <header>
                <div className="title">
                    <h4 data-testid="heading"><Link to="/contact">Your appointment has been confirmed and we will contact you shortly!</Link></h4>
                </div>
            </header>
        </article>
    </Main>
);

export default SubmitSuccess;
