import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-apollo';
import styled, { css } from 'styled-components';
import { CreateNoteMutation, DeleteNoteMutation, UpdateNoteMutation }  from './graphql/mutations';
import NotesQuery from './graphql/queries';
import Page from '../../components/Layout/Page';
import Note from '../../components/Notes/Note';
import { Button, Input, message } from 'antd';

const pageSectionStyle = css`
  box-shadow: 0px 0px 5px 2px #0d2538;
  background: white;
`;

const CreateNoteSection = styled.div`
  border-radius: 15px 15px 0 0;
  margin-bottom: 25px;
  padding: 20px;
  display: flex;
  ${pageSectionStyle}
`;

const NotesListSection = styled.div`
  border-radius: 0 0 15px 15px;
  overflow-y: scroll;
  padding: 20px 0;
  height: 500px;
  width: 600px;
  ${pageSectionStyle}
`;

const ListElement = styled.div`
  border-bottom: solid 1px rgba(191,185,191,0.36);
  padding:  15px 0px 15px 10px;
  margin: 0 20px;
  
  &:hover {
    cursor: pointer;
  }
    
  &:last-child {
    border-bottom: none;
  }
`;

const NotesPage = () => {
  // Graphql query
  const { loading, data, error } = useQuery(NotesQuery);

  // State hooks
  const [newNote, setNewNote] = useState('');

  // Graphql mutations
  const [createNoteMutation] = useMutation(CreateNoteMutation);
  const [deleteNoteMutation] = useMutation(DeleteNoteMutation);
  const [updateNoteMutation] = useMutation(UpdateNoteMutation);

  if (error) {
    message.error('Error :(');
    return null;
  }

  // Handlers
  const handleCreateNote = () => {
    if (newNote) {
      createNoteMutation({ variables: { content: newNote }, refetchQueries: ['NotesQuery'] }).then(() => {
        message.success('Note created');
      }).catch(createNoteMutationError => {
        message.error(createNoteMutationError);
      });
      setNewNote('');
    }
  };

  const handleOnChangeNewNote = e => setNewNote(e.target.value);

  return (
    <Page currentPage="notes" loading={loading}>
      <CreateNoteSection>
        <Input
          value={newNote}
          onChange={handleOnChangeNewNote}
          placeholder="Add a note here"
          style={{  height: '50px' }}
        />
        <Button type="primary" onClick={handleCreateNote} style={{  height: '50px' }}>Create note</Button>
      </CreateNoteSection>
      <NotesListSection>
        {data?.notes.map(note => {
          const { content, _id } = note;

          return (
            <ListElement key={_id}>
              <Note
                id={_id}
                note={content}
                onUpdateNote={updateNoteMutation}
                onDeleteNote={deleteNoteMutation}
              />
            </ListElement>
          );
        })}
      </NotesListSection>
    </Page>
  );
};

export default NotesPage;
