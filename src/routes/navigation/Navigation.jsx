import { Outlet } from "react-router-dom";
import React, { Fragment } from "react";
import { ReactComponent as CrownLogo } from "../../assets/crown.svg";
import CartIcon from "../../components/cart-icon/CartIcon";
import CartDropdown from "../../components/cart-dropdown/CartDropdown";

import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../store/user/user.selector";
import { selectIsCartOpen } from "../../store/cart/cart.selector";

import {
  LogoContainer,
  NavigationContainer,
  NavLinks,
  NavLink,
} from "./Navigation.styles.jsx";
import { signOutStart } from "../../store/user/user.action";

const Navigation = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(userSelector);
  const isCartOpen = useSelector(selectIsCartOpen);

  const signOutUser = () => dispatch(signOutStart());

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrownLogo className="logo" />
        </LogoContainer>

        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>

          {currentUser ? (
            <NavLink as="span" onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinks>

        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
