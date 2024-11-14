import React from 'react';
import { Button, Card, CardContent, Divider } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, Outlet } from 'react-router-dom';
import { path } from '../../app/App';

export const Layout = () => {

  const theme = createTheme({
    palette: {
      warning: {
        main: '#f8d777',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xl">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Card sx={{ width: '100%' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {
                path.map(el => {
                  return (
                    <Link
                      key={el.id}
                      to={el.path}
                      style={{ textDecoration: 'none' }} >
                      <Button
                        variant="outlined"
                        color='warning'
                        sx={{ mr: '10px', color: '#000', fontWeight: 500 }}
                      >
                        {el.name}
                      </Button>
                    </Link>
                  )
                })
              }
            </CardContent>
            <Divider />
            <Outlet />
          </Card>
        </Box>
      </Container>
    </ThemeProvider >
  );
};
