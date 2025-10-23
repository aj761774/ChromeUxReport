import { Button, CircularProgress, TextField, Typography } from '@mui/material';
import './index.css';

const Search = ({ urls, isSearching, handleChange, handleSearch }) => {
  return (
    <div className="search">
      <Typography variant="subtitle1" gutterBottom>
        <strong>URL:</strong>
      </Typography>
      <TextField
        placeholder="Enter URL"
        value={urls}
        onChange={handleChange}
        sx={{
          // general sizing
          height: 40,
          width: 300,
          '& .MuiOutlinedInput-root': {
            height: 40,
            borderRadius: '6px',
            fontSize: '16px',
            '& fieldset': {
              borderColor: 'white',
            },
            '&:hover fieldset': {
              borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'white',
            },
          },

          // input text itself
          '& .MuiInputBase-input': {
            color: 'white',
            fontSize: '16px',
            padding: '0 12px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            boxSizing: 'border-box',
          },

          // placeholder color
          '& .MuiInputBase-input::placeholder': {
            color: 'white',
            opacity: 0.7,
          },

          // label (normal + focused)
          '& .MuiInputLabel-root': {
            color: 'white',
            top: '50%',
            transform: 'translateY(-50%)', // vertical centering
            fontSize: '16px',
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: 'white',
            top: 0, // move up when focused
            transform: 'translateY(-50%) scale(0.75)',
          },
        }}
      />
      <Button
        variant="contained"
        onClick={handleSearch}
        disabled={isSearching}
        sx={{
          position: 'relative',
          height: '40px',
          width: '120px',
          '&.Mui-disabled': {
            backgroundColor: '#1976d2', // keep default color
            color: 'white',
          },
        }}
      >
        {isSearching ? (
          <CircularProgress
            size={22}
            sx={{
              color: 'white',
              position: 'absolute',
            }}
          />
        ) : (
          'Search'
        )}
      </Button>
    </div>
  );
};

export default Search;
