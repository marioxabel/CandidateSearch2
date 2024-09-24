import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { githubProfilesObject, GithubUser } from '../interfaces/Interfaces'
import { Card } from '../components/Card';
import React from 'react';

const CandidateSearch = () => {
  const [randomProfiles, setRandomProfiles] = useState<githubProfilesObject[]>([]);
  const [userProfile, setUserProfile] = useState<GithubUser>({} as GithubUser)
  const [indexOfProfile, setIndexOfProfile] = useState(0);
  const [loading, setLoading] = useState(true);

  // fetch random profiles
  useEffect(() => {
    const fetchData = async () => {
      const data = await searchGithub();
      setRandomProfiles(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  // fetch user info
  useEffect(() => {
    const fetchUser = async () => {
      if (randomProfiles.length > 0 && indexOfProfile < 30) {
        const userData = await searchGithubUser(randomProfiles[indexOfProfile].login);
        setUserProfile(userData);
      }
    }
    fetchUser()
  }, [randomProfiles, indexOfProfile])

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    const target = event.currentTarget as HTMLButtonElement;   
    // Save profiles to local storage
    if (target.dataset.button === 'add') {
      const savedProfiles = JSON.parse(localStorage.getItem('profiles') || '[]') as GithubUser [];
      savedProfiles.push(userProfile)
      localStorage.setItem('profiles', JSON.stringify(savedProfiles))
    }
    // move to next profile
    setIndexOfProfile(prev => prev + 1);
  }
 
  return (
    <>
      <h1>Candidate Data</h1>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          {randomProfiles.length > 0 ? (
            indexOfProfile < randomProfiles.length ? (
              <>
                <Card {...userProfile} />
                <div style={buttonDivStyles}>
                  <button 
                    onClick={handleClick} 
                    style={{ backgroundColor: 'red' }} 
                    data-button='ignore'
                  >
                    -
                  </button>
                  <button 
                    onClick={handleClick} 
                    style={{ backgroundColor: 'green' }} 
                    data-button='add'
                  >
                    +
                  </button>
                </div>
              </>
            ) : (
              <h2>No more profiles, refresh the page to load more</h2>
            )
          ) : (
            <h2>No profiles found</h2>
          )}
        </>
      )}
    </>
  );
}


const buttonDivStyles: React.CSSProperties = {
  border: '1px solid black',
  color: 'whitesmoke',
  fontSize: '1.5rem',
  width: '300px',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '10px',
};



export default CandidateSearch;
