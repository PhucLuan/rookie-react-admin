import React from 'react';
import { connect } from 'react-redux';
import { CallbackComponent } from 'redux-oidc';
//import { push } from 'react-router-redux';
import userManager from 'src/Helper/userManager';
import { useHistory } from 'react-router';

const CallbackPage = () => {

    const history = useHistory();

    console.log("Ahihi")

    return (
        <CallbackComponent
        userManager={userManager}
        successCallback={() => history.push('/')}
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
