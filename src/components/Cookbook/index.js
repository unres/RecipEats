import React from 'react';
import CookbookCreate from './cookbookCreate.js';
import CookbookRead from './cookbookRead.js'
import './cookbook.css';

class Cookbook extends React.Component{
  render() {
    return (
      <div className='cookbook'>
        <CookbookCreate />
        <CookbookRead />
      </div>
    )
  }
}

export default Cookbook;