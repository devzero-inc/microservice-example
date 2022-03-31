import { ReactNode } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Head from "next/head";
import Header from "./Header";
import { Box, Toolbar, Container } from "@mui/material";

interface LayoutProps {
  children: ReactNode;
}

const mdTheme = createTheme({
  palette: {
    primary: {
      main: "#3F51B5",
    },
  },
});

function Layout(props: LayoutProps) {
  const { children } = props;
  return (
    <>
      <Head>
        <title>DevZero Cafe</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="description" content="DevZero Coffee Shop Demo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <Header />
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              {children}
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default Layout;
