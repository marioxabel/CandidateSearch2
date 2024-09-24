import { useState, useEffect } from 'react';
import { GithubUser } from '../interfaces/Interfaces';

const SavedCandidates = () => {
  const [savedProfiles, setSavedProfiles] = useState<GithubUser[]>([])

  useEffect(() => {
    const storedData = localStorage.getItem('profiles'); 
    
    if (storedData) {
      setSavedProfiles(JSON.parse(storedData))
    }
  },[])


  function handleClick (event: React.MouseEvent<HTMLButtonElement>) {
    const target = event.currentTarget as HTMLButtonElement; 
    //save the target data att as int, with a fallback
    const targetID = parseInt(target.dataset.id ?? "0");
    
    const filterdProfiles = savedProfiles.filter(element => {
      return element.id !== targetID;
    })
    setSavedProfiles(filterdProfiles)
    localStorage.setItem('profiles', JSON.stringify(filterdProfiles));
  }


  return (
    <>
      <h1>Potential Candidates</h1>
      {savedProfiles.length > 0 ? (
        <div>
          <table style={tableStyles}>
            <thead>
              <tr>
                <th style={thStyles}>Image</th>
                <th style={thStyles}>Name</th>
                <th style={thStyles}>Location</th>
                <th style={thStyles}>Email</th>
                <th style={thStyles}>Company</th>
                <th style={thStyles}>Bio</th>
                <th style={thStyles}>Reject</th>
              </tr>
            </thead>
            <tbody>
              {savedProfiles.map((row, index) => (
                <tr key={row.id} style={index % 2 === 0 ? evenRowStyles : {}}>
                  <td style={tdStyles}>
                    <img src={row.avatar_url} alt={row.login} style={{ borderRadius: '10%', width: '50px', height: '50px' }} />
                  </td>
                  <td style={tdStyles}>{row.login}</td>
                  <td style={tdStyles}>{row.location || 'N/A'}</td>
                  <td style={tdStyles}>{row.email || 'N/A'}</td>
                  <td style={tdStyles}>{row.company || 'N/A'}</td>
                  <td style={tdStyles}>{row.bio || 'N/A'}</td>
                  <td style={tdStyles}>
                    <button data-id={row.id} onClick={handleClick} style={{ backgroundColor: 'red', color: 'whitesmoke', border: 'none', borderRadius: '5px', padding: '5px 10px' }}>
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h2>No candidates saved, save some profiles to see them here</h2>
      )}
    </>
  );
};

export default SavedCandidates;


const tableStyles: React.CSSProperties  = {
  width: '100%',
  borderCollapse: 'collapse',
  margin: '20px 0',
  fontSize: '1.1em',
  fontFamily: 'Arial, sans-serif',
};

const thStyles: React.CSSProperties  = {
  padding: '12px 15px',
  textAlign: 'left',
  backgroundColor: 'black',
  color: '#ffffff',
};

const tdStyles: React.CSSProperties  = {
  padding: '12px 15px',
  textAlign: 'left',
};

const evenRowStyles: React.CSSProperties  = {
  backgroundColor: 'grey',
};