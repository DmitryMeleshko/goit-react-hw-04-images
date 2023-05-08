import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  SearchShell,
  SearchForm,
  SearchButton,
  SearchInput,
} from './Searchbar.styled';

export function Searchbar ({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleChange = evt => {
    setQuery(evt.currentTarget.value.toLowerCase().trim());
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    if (query === " ") {
      return toast.error('😱 Please enter a value for search images!');
    }

    onSubmit(query);
    setQuery (query);
  };

    return (
      <SearchShell>
        <SearchForm onSubmit={handleSubmit} autoComplete="off">
          <SearchButton type="submit">
            <span>Search</span>
          </SearchButton>

          <SearchInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleChange}
            value={query}
          />
        </SearchForm>
      </SearchShell>
    );
  }

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};