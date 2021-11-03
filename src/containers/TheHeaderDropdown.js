import CIcon from '@coreui/icons-react';
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react';
import React from 'react';
import userManager from 'src/Helper/userManager';

const TheHeaderDropdown = () => {

  const user = JSON.parse(localStorage.getItem("user"));
  const isAuthenticated = user && !user.expired
  const isAdmin = isAuthenticated && user.profile['role'] === 'Admin';

  const onLogoutButtonClick = event => {
    event.preventDefault();
    localStorage.removeItem('user');
    userManager.signoutRedirect({ id_token_hint: user.id_token });
    userManager.removeUser(); // removes the user data from sessionStorage
  };

  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={'avatars/defaultImage.jpg'}
            className="c-avatar-img"
            alt="admin@bootstrapmaster.com"
          />
        </div>
      </CDropdownToggle>
      {isAdmin ? (
        <CDropdownMenu className="pt-0" placement="bottom-end">
          <CDropdownItem
            header
            tag="div"
            color="light"
            className="text-center"
          >
            <strong>Account</strong>
          </CDropdownItem>
          <CDropdownItem>
            <CIcon name="cil-user" className="mfe-2" />Admin
          </CDropdownItem>
          <CDropdownItem divider />
          <CDropdownItem onClick = {onLogoutButtonClick}>
            <CIcon name="cil-lock-locked" className="mfe-2" />
            Lock Out
          </CDropdownItem>
        </CDropdownMenu>
      ) : (<React.Fragment />)}

    </CDropdown>
  )
}

export default TheHeaderDropdown
