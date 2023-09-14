{authUser ? (
    // Display user information and a sign-out button if authenticated
    <div className={styles.authBox}>
      <div>{`Signed In as ${authUser.email}`}</div>
      <div>{`Order Count: ${cartCount}`}</div>
      <button className={styles.authButton} onClick={userSignOut}>
        Sign Out
      </button>
      {/* <Cart/> */}

    </div>
  ) : (
    <></>
  )}
//   npm install --save @fortawesome/fontawesome-svg-core
// npm install --save @fortawesome/free-solid-svg-icons
// npm install --save @fortawesome/react-fontawesome

// npm install --save @fortawesome/fontawesome-svg-core
// npm install --save @fortawesome/free-solid-svg-icons
// npm install --save @fortawesome/react-fontawesome