import InputBase from '@mui/material/InputBase';
import styled from 'styled-components';
import { alpha, styled as muiStyled } from '@mui/material/styles';

export const StyledIconButton = muiStyled('button')(({ theme }) => ({
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    '&:hover': {
      background: alpha(theme.palette.primary.main, 0.1), // Set background color on hover
    },
  }));
  
  export const StyledIcon = styled.span`
    font-size: 1.5em;
  `;
  
  export const TableWrapper = styled.div`
    width: 80%;
    margin: auto;
  `;
  
  export const SearchContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  `;
  
  export const Search = muiStyled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '80%',
    border: '2px solid', // Added border with 2px width
    borderColor: theme.palette.primary.main, // Set border color to primary color
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  export const SearchIconWrapper = muiStyled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  export const StyledInputBase = muiStyled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));
export  const styles = `
  .table-header-cell {
    color: white; /* צבע הטקסט */
   background-color: #1565c0; /* רקע */
    font-weight: bold; /* משקל הגופן */
    padding: 3px; /* רווחים */
  }
  `;
  