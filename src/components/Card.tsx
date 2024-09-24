import { GithubUser } from '../interfaces/Interfaces';
import React from 'react';

export const Card = (props: GithubUser) => {
    
  return (
    <div style={divStyles}>
      <img src={props.avatar_url} alt="avatar" style={imgStyles} />
      <div style={innerStyles}>
        <h1 style={h1Styles}>{props.login}</h1>
        <p>Location: {props.location ? props.location : 'No location public'}</p>
        <p>Email: {props.email ? props.email : 'Email hidden'}</p>
        <p>Bio: {props.bio ? props.bio : 'No bio'}</p>
        <p>Company: {props.company ? props.company : 'N/A'}</p>
        <a href={props.html_url} target="_blank">GitHub Profile</a>
      </div>
    </div>
  );
};

const divStyles: React.CSSProperties = {
    border: '1px solid black',
    color: 'whitesmoke',
    maxWidth: '300px',
    backgroundColor: '#1d1d1d',
    textAlign: 'left',
    borderRadius: '20px',
    overflow: 'hidden',
  };
  
  const imgStyles: React.CSSProperties = {
    width: '100%',
    marginBottom: '10px',
  };
  
  const innerStyles: React.CSSProperties = {
    padding: '20px',
  };
  
  const h1Styles: React.CSSProperties = {
    fontSize: '1.2em',
    margin: '5px',
  };
  