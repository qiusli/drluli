import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from './layouts/Main'; // fallback for lazy pages
import './static/css/main.scss'; // All of our styles

const { PUBLIC_URL } = process.env;

// Every route - we lazy load so that each page can be chunked
// NOTE that some of these chunks are very small. We should optimize
// which pages are lazy loaded in the future.
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Projects = lazy(() => import('./pages/Projects'));
const Resume = lazy(() => import('./pages/Resume'));
const Stats = lazy(() => import('./pages/Stats'));
const GeneralDentistry = lazy(() => import('./pages/Stats'));
const Appointment = lazy(() => import('./pages/Appointment'));
const SubmitSuccess = lazy(() => import('./pages/SubmitSuccess'));

const App = () => (
    <BrowserRouter basename={PUBLIC_URL}>
      <Suspense fallback={<Main />}>
        <Switch>
          <Route exact path="/" component={About} />
          <Route path="/about" component={About} />
          <Route path="/projects" component={Projects} />
          <Route path="/stats" component={Stats} />
          <Route path="/GeneralDentistry" component={GeneralDentistry} />
          <Route path="/contact" component={Contact} />
          <Route path="/appointment" component={Appointment} />
          <Route path="/resume" component={Resume} />
          <Route path="/SubmitSuccess" component={SubmitSuccess} />
          <Route component={NotFound} status={404} />
        </Switch>
      </Suspense>
    </BrowserRouter>
);

export default App;
