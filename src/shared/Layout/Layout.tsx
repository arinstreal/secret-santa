import { AppBar, Box, Link, Toolbar, Typography } from "@mui/material";
import React from "react";

const Layout = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h1"
            noWrap
            component="div"
            align="center"
            fontFamily="Yeseva One"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            <Link href="/" underline="none" color="white">Secret Santa</Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Layout;