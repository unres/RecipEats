import React from 'react';
import PasswordChangeForm from '../PasswordChange';
import "../Account/account.css"
class AccountPage extends React.Component{

render(){
  return(
  <div className='account'>
    <h1>Account Page</h1>
    <h2>Change Password</h2>
    <PasswordChangeForm />
  </div>
  )
}


}
export default AccountPage;
