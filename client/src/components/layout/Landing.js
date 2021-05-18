import React from 'react';
import { Link } from 'react-router-dom';
export const Landing = () => {
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div class='landing-inner'>
          <h1 class='x-large'>Developer Connector</h1>
          <p class='lead'>Hello Developers!!!</p>
          <p class='lead2'>
            Create your own profile/portfolio, share posts and get help from
            other developers
          </p>
          <div class='buttons'>
            <Link to='/register' class='btn btn-primary'>
              Sign Up
            </Link>
            <Link to='/login' class='btn btn-light'>
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
