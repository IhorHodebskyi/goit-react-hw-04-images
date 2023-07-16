import { useState } from 'react';
import { MagnifyingGlass } from 'react-loader-spinner';
// import { toast } from 'react-toastify';
import { Header, Form, Button, Input, ButtonLabel } from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [searchName, setSearchName] = useState('');
  const handleSearchNameChange = event =>
    setSearchName(event.currentTarget.value);

  const handleSubmit = event => {
    event.preventDefault();
    if (searchName.trim() === '') {
      return alert('Wow so easy!');
    }
    onSubmit(searchName);
    setSearchName('');
  };
  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <Button>
          <ButtonLabel>
            <MagnifyingGlass
              visible={true}
              height="80"
              width="80"
              ariaLabel="MagnifyingGlass-loading"
              wrapperStyle={{}}
              wrapperClass="MagnifyingGlass-wrapper"
              glassColor="#c0efff"
              color="#e15b64"
            />
          </ButtonLabel>
        </Button>

        <Input
          type="text"
          name="searchName"
          value={searchName}
          onChange={handleSearchNameChange}
          // autocomplete="off"
          // autofocus
          placeholder="Search images and photos"
        />
      </Form>
    </Header>
  );
};

