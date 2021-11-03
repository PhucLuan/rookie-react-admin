import React from 'react';
import { useHistory } from 'react-router';
import { CallbackComponent } from 'redux-oidc';
import userManager from 'src/Helper/userManager';

const CallbackPage = () => {

    const history = useHistory();

    const handleLoginSuccess = (user) => {

      localStorage.setItem('user', JSON.stringify(user));
      history.push('/dashboard');
    }

    return (
        <CallbackComponent
        userManager={userManager}
        successCallback={handleLoginSuccess}
        errorCallback={error => {
            alert("Ahihi")
          //this.props.dispatch(push('/'));
          console.error(error);
        }}
      >
        <div>Redirecting...</div>
      </CallbackComponent>
    )
}

export default CallbackPage


// class CallbackPage extends React.Component {
//   render() {
//     return (
//       <CallbackComponent
//         userManager={userManager}
//         successCallback={() => this.props.dispatch(push('/'))}
//         errorCallback={error => {
//           this.props.dispatch(push('/'));
//           console.error(error);
//         }}
//       >
//         <div>Redirecting...</div>
//       </CallbackComponent>
//     );
//   }
// }

// export default connect()(CallbackPage);
