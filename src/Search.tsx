import * as React from 'react';

import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';

export function Search<S>() {

  const [value, setValue] = React.useState('');
  const [suggestions, setSuggestions] = React.useState<S[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  };

  const handleSelect = (idx: number) => {
  };

  const shouldShowSuggestions = suggestions.length > 0 && value.length > 2;


  return (
    <div style={{ width: '400px' }}>
      <TextField
        fullWidth
        onChange={handleChange}
        value={value}
        placeholder="start typing a movie title"
      />
      {shouldShowSuggestions && (
        <Paper>
          {suggestions.map((suggestion, idx) => (
            <MenuItem
              key={`suggestion-${idx}`}
              onClick={() => handleSelect(idx)}
            >
              {/* {renderSuggestion(suggestion)} */}
            </MenuItem>
          ))}
        </Paper>
      )}
    </div>
  );
}
