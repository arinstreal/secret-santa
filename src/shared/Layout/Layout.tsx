import { Typography } from "@mui/material";
import React from "react";
import styles from "./Layout.module.scss";

const Layout = () => {
  return (
    <Typography
      variant="h1"
      noWrap
      component="div"
      align="center"
      sx={{flexGrow: 1, typography: { xs: "h2", md: 'h1'},display: { sm: 'block' } }}
      fontFamily="GreatVibes Regular"
      className={styles.layout}
      color="white"
    >
      Secret Santa
      {/*<Link href={process.env.PUBLIC_URL} underline="none" color="white">Secret Santa</Link>*/}
    </Typography>
  )
}

export default Layout;