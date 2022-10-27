import { Link, Typography } from "@mui/material";
import React from "react";
import styles from "./Layout.module.scss";

const Layout = () => {
  return (
    <Typography
      variant="h1"
      noWrap
      component="div"
      align="center"
      fontFamily="GreatVibes Regular"
      sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
      className={styles.layout}
    >
      <Link href={process.env.PUBLIC_URL} underline="none" color="white">Secret Santa</Link>
    </Typography>
  )
}

export default Layout;