
// // import React from 'react';
// // import { StyledIconButton } from './allEmployee.muiStyle'; // ייבוא הקומפוננטה StyledIconButton
// // import { FaPlus } from 'react-icons/fa';
// // import GetAppIcon from '@mui/icons-material/GetApp';

// // const NavBar = ({ onAdd, onExport }) => {
// //   return (
// //     <div className="navbar">
// //       <div className="navbar-links">
// //         <StyledIconButton variant="contained" onClick={onAdd}>
// //           <FaPlus /> ADD EMPLOYEE
// //         </StyledIconButton>
// //         <StyledIconButton variant="contained" onClick={onExport}>
// //           <GetAppIcon /> DOWNLOAD TO EXCEL FILE
// //         </StyledIconButton>
// //       </div>
// //     </div>
// //   );
// // };

// // export default NavBar;
// // NavBar.js

// // import React from 'react';
// // import { styled } from '@mui/system';
// // import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
// // import { FaPlus, FaFileExcel } from 'react-icons/fa';

// // const StyledAppBar = styled(AppBar)({
// //   backgroundColor: '#0a4477',
// // });

// // const StyledToolbar = styled(Toolbar)({
// //   display: 'flex',
// //   justifyContent: 'space-between',
// // });

// // const StyledTypography = styled(Typography)({
// //   fontWeight: 'bold',
// // });

// // const StyledIconButton = styled(IconButton)({
// //   color: '#ffffff',
// //   '&:hover': {
// //     backgroundColor: 'transparent',
// //   },
// // });

// // const NavBar = ({ onAdd, onExport }) => {
// //   return (
// //     <StyledAppBar position="static">
// //       <StyledToolbar>
// //         <Typography variant="h6">
// //           <StyledTypography>My Company</StyledTypography>
// //         </Typography>
// //         <div>
// //           <StyledIconButton onClick={onAdd}>
// //             <FaPlus />
// //             <Typography variant="body1" sx={{ ml: 1 }}>Add Employee</Typography>
// //           </StyledIconButton>
// //           <StyledIconButton onClick={onExport}>
// //             <FaFileExcel />
// //             <Typography variant="body1" sx={{ ml: 1 }}>Download to Excel</Typography>
// //           </StyledIconButton>
// //         </div>
// //       </StyledToolbar>
// //     </StyledAppBar>
// //   );
// // };

// // export default NavBar;
// //mui 'עובד מהמם
// import React from 'react';
// import { styled, alpha } from '@mui/material/styles';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import MenuIcon from '@mui/icons-material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import Menu from '@mui/material/Menu';
// import { FaPlus, FaFileExcel } from 'react-icons/fa';

// const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
//   '&:hover': {
//     backgroundColor: theme.palette.primary.main,
//     color: theme.palette.primary.contrastText,
//   },
// }));

// export default function NavBar({ onAdd, onExport }) {
//   const [anchorEl, setAnchorEl] = React.useState(null);

//   const handleMenu = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar position="static">
//         <Toolbar>
//           <Typography
//             variant="h6"
//             noWrap
//             component="div"
//             sx={{ flexGrow: 1, textAlign: 'left', marginLeft: '-12px' }} // שינוי כאן
//           >
//            <img width="673" height="248" src="https://www.madanes.com/wp-content/uploads/2021/07/LOGO-8.png" class="attachment-full size-full wp-image-2433" alt="" srcset="https://www.madanes.com/wp-content/uploads/2021/07/LOGO-8.png 673w, https://www.madanes.com/wp-content/uploads/2021/07/LOGO-8-300x111.png 300w" sizes="(max-width: 673px) 100vw, 673px"></img>

//           </Typography>
//           <IconButton
//             size="large"
//             edge="start"
//             color="inherit"
//             aria-label="open drawer"
//             aria-controls="menu-appbar"
//             aria-haspopup="true"
//             onClick={handleMenu}
//             sx={{ mr: 2 }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Menu
//             id="menu-appbar"
//             anchorEl={anchorEl}
//             anchorOrigin={{
//               vertical: 'top',
//               horizontal: 'right',
//             }}
//             keepMounted
//             transformOrigin={{
//               vertical: 'top',
//               horizontal: 'right',
//             }}
//             open={Boolean(anchorEl)}
//             onClose={handleClose}
//           >
//             <StyledMenuItem onClick={onAdd}>
//               <FaPlus />
//               Add Employee
//             </StyledMenuItem>
//             <StyledMenuItem onClick={onExport}>
//               <FaFileExcel />
//               Download to Excel
//             </StyledMenuItem>
//           </Menu>
//         </Toolbar>
//       </AppBar>
//     </Box>
//   );
// }
import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { FaPlus, FaFileExcel } from 'react-icons/fa';

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}));

export default function NavBar({ onAdd, onExport }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, textAlign: 'left' }} // שינוי כאן
          >
            <img  src="https://upload.wikimedia.org/wikipedia/he/thumb/6/63/Cal_logo_2019.svg/1200px-Cal_logo_2019.svg.png"  alt="logo" style={{width: '60px', marginRight: '10px'}}></img> {/* שינוי כאן */}
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <StyledMenuItem onClick={onAdd}>
              <FaPlus />
              Add Employee
            </StyledMenuItem>
            <StyledMenuItem onClick={onExport}>
              <FaFileExcel />
              Download to Excel
            </StyledMenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
