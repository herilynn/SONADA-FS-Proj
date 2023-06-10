import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import SearchBar from '../Search/SearchBar';
import './Navigation.css';
import AllGroups from '../Groups/AllGroups';
import GroupFormModal from '../GroupForm';
import Group from '../Group';

function Navigation(){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        {<GroupFormModal />}
        <ProfileButton user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      <>
        {<GroupFormModal />}
        {/* <SearchBar/> */}
        <LoginFormModal />
        {/* <NavLink to="/signup">Sign Up</NavLink> */}
        <SignupFormModal />
      </>
    );
  }

  return (
    <>
    <a href="https://github.com/herilynn" target="_blank">
      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH4AAAB+CAMAAADV/VW6AAAAZlBMVEX///8AAADc3Nzz8/P8/Pzg4OALCwtwcHCfn5+mpqbY2NjGxsbJycnBwcGbm5vj4+O1tbVPT0+VlZXt7e0ZGRk4ODgqKipJSUlEREQxMTF+fn4/Pz9fX1/R0dFXV1eLi4sgICBoaGiPtSMPAAAFKUlEQVRoge1a2aKqOgwFWyaVQVBUHND//8mLbiVpKewm9WzvA+tNJVm2zVw8b8aMGTNmzHhBShdZB+EOaXM+Hc5NvKCLXuJO9nRtUja52Pk9mgtFchWB5E7w2OXGxzgWlnqqpFYEN7wTKHwNu9jiD4j4qMsVLPqzruaxA6/fZLVMk6xsO5RZki6r9wqLeih15rAHQz0d9guRZtFu+MMuylKxPBiFcgZ9YtTEQsKgN+w9F4zdFwML4oPhe8vPsfv+kkyffpKeHvriXja8JJsJ1SO4Jsuw/xCT6dte9iQ8uSYa4vkiPXHqP7ZkeojaP0FzbXZpI/bPBIGCdkSmv8M2viKadSB4ubm89t/cnVffQTSvb8JzG6+D3ptksI7b8/ukm/fjTquHsz+A166jwz5KcmMKk3kS7Q8RJGYBx9WQ6cteNgzQ12Iygii/BmD5GZke+T2zYHHSgLyWlTBx0gjpUQ/R16xySdQu9MjNb5x87eVb0HCgCmMnP7KKNYHrHmLUlUiU4bVPRFgHbQUtktyy9l7dfVrUr0Ikueaxd0EKL78iCOKT5xRqBjWE00fJwt/w2T0P1QmEZgPX2Iz2DrBgKYJKh2v1byDrt999tGekznKIC+MUJdTYB7cGHQfPo23oXoDb0Ys0DRBAQtvDX8GOsX3+DeT7K0sR1FkHvz89DeREtn02GH5NiVVGVJB4bE0/6yW4gxEAGtDYVlxQ5p3c6aHXKC1Fsn9Db7v6L28+mN7R3fQghNmaHuTJrTM9qjlsM/c/8nvbYh9FPXqFrAENSWyjHirxeRNBBNhJ62IfRSp6b6ih6VXZR1Bwlr0r/R6c2FoGujNegwPIb70q+04RVaiOh4+cyL5iRuZ6daNHJbO9E1VoZOy0+zno2REiGCpQnWwf7J5UMuORpkPgw/0CZcAhUHe4Zxe7ErzO35JyJ+5w2duPtp5YMldI0rpM0VBiHcTUqcwGWOvHayf3asry/QPZ/fKTooBcN8SKuF+SFFSlKk0fqGuXiP6xNc9SDZJ5q92mcS4Sg62v4RwHv+qRQTYY/W9ZoWOtq+kQRmWxGHFhsSzKe2gQojWKq6wsnic9fp1zHcSwYvy+hTTQDZ56bs3D1ge3uADNF+/jT5JSdl+Xbx/5Ob2NalXSdzz62I02zEbB4t7ZWXAa1YusUIyyn2hWJ7G5P4vDbEwzUnwZe4Z6jZArlvvkryKzajR0MvlIh4gc64Tq7PungkVkciek23TXHkaciaDmP+efEw7KwYUyLgLlwEKOGa9K0fexT1WXTPUCJQmp9811zJ8G6r6OrAf/NY0AtYXWvZwZgWZqEDJRGhsUL+g3ZnXSQ30DA24TwC6GSQS1M46tQWf/V8zf32LWUwyQ52pXek8q69//8KOYYNhfKE7dRyLqNZQfFoGQcno+CukxdB6JqBcBjxXVxyNyPINjge1bz46nMJFsjTcTaG+cJzIPtOPsf0Hv3Zn0H9l8tUX7Ar1m/n9O74mx9RsIkOV/wPF+IJuv0nd51rgBf0bf/YFm+MLQH9J3JpCviqwtmy/Rv7D+Ln36f6b/bMYzYPVVeplY0jvWmmYscS0/Te9fHefgQ6ht3C/0fvhhfq2PMWhXZxHM17zGoPWwhmJSrc5cryE0qGu7GiZMWnZ2vvifoDdeTKjJ0fGdDw0BbrHNl0LKiMP6RQ1LoLWNvcOF7YM+xpyG6JuozWhQW/V3MJHrCy8DyOQ5+NikE5pF8pxC1M53n2bt+e/dm8jzDx/7jBkzZnwS/wEWiTcs0wjk3gAAAABJRU5ErkJggg==" className = "git-button"/>
        </a>

        <a href="https://www.linkedin.com/?original_referer=" target="_blank">
      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIIAAACCCAMAAAC93eDPAAAAb1BMVEX///8AZsgAS8EAU8MAXMUAX8YAVcPd5PTQ2/EAYscAV8SMq96duOMAZMfY4/Tj6fb09/w2dMyNqN5PhNHG1e50mdgpcculueQsbMqGpd0AUMI6eM6WseGCndnu8vp/odu7zOtrkta1xOdmjNSqweZ1SSBYAAACj0lEQVR4nO2a23bqIBBARSARKiYx95rUaPr/31ix5mp6Vp1gZJ3OfiMW2Q7h1mG1QhAEQRAEQRAEQZ5FlMZhIuj6t7xLlYRxGplq380zzrhQijyAUuJSKctdEwZ7wR5qfCDCxH62gBfABb4lAm+eQcTFHAGN4LNeCY/PCsEtEHxOHILZMdCIAG6wZyYMCGHgd9IVBrpBowR0bOaGgnAJQw5UyAwF4RKGDGYQcVMGhAAHZmqsHy49kYIUYpNRiEEK4f2kIBiDjRIRghSScWOcxcW2zCD9oxKQwnh15uF1ov04AhyUACnI4bd0sYQ4UJDC+/BLWLfYANbvNUhhPQzCqfukeDwMJhR4b6mp/qxCvyMA86YJhf7eh7zmdSS8DcMWMCiNKBB2cyjkZCNLKBBOj+dzwUELqCEFvUow4LHCmAKcRRSU0PwUIzMKkjYMi3pbobiT1GVZ1oEzffoxoiAjr0EvYLJqSqEiXB13H9dKvntUU7stIwrUHXzibJpSLeSpf2Tz6olR+2QFpxrVTOnCCuHmrur5bu54qoK/m6hbj9+H50Zhit14dC6vsDqJlyts6NIKflXkn/2R6QdqWYXCkYxLWvYexWJRhdNtLmKH7tmeL6nQ7WZp1T58W1Th0Ma8t8ddVqE7dqmD/xKFndMpJC9SkKiACqiACqjwb4UAFf5LBWpSQYIURqcR2m2QtQJtD1Feb7/QpQOHCkqBFEbJAPa2vfGpfzbLm2LeNaayonkaDmoDkwHjlIj+R9M3w2L/56r2b4aVgSkRCxJDFqTHLEgSWpAqtSFhbEHa3ILLAzZcobDhIokF12lsuFS0suBq1cqGC2aa6zU7JX99zW7tCKPX7BAEQRAEQRAEQZA7vgDOTDPZ0MRM9wAAAABJRU5ErkJggg==" className = "linkedin-button"/>
        </a>
      {/* <li className='search-bar'></li> */}
      <div className='div_outer'>
        
        <div className = "logo">
          <NavLink exact to="/">Sonada</NavLink>
          <SearchBar/>
          <AllGroups/>
        </div>

        {/* <div className='search_div'> */}
          
        {/* </div> */}
        <div className = 'session_div'>
          {sessionLinks}
        </div>
      </div>
      <img src="https://secure.meetupstatic.com/next/images/blobs/green-blob.svg" className='default1'/>
      {/* <img src="https://secure.meetupstatic.com/next/images/shared/online_events.svg?w=640" className='default2'/> */}
    </>
  );
}

export default Navigation;