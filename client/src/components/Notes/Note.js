import React, { useRef, useState } from 'react';
import useOnclickOutside from 'react-cool-onclickoutside';
import styled from 'styled-components';
import { CloseCircleTwoTone } from '@ant-design/icons';
import { Input, message } from 'antd';

const MAX_CHARACTERS_PER_LINE = 77;

const NoteContent = styled.div`
  grid-template-columns: 1fr auto;
  justify-content: space-between;
  grid-column-gap: 50px;
  align-items: start;
  display: grid;
`;

const Actions = styled.div.attrs(({ isHovered }) => ({
  visibility: !isHovered ? 'hidden' : 'visible'
}))`
  visibility:  ${props => props.visibility};
`;

const NoteTxt = styled.div`
  white-space: pre-line;
`;

const { TextArea } = Input;

const Note = ({ id, note, onUpdateNote, onDeleteNote }) => {
  const ref = useRef();

  // State hooks
  const [updateOngoing, setUpdateOngoing] = useState(false);
  const [newNote, setNewNote] = useState(note);
  const [isHovered, setIsHovered] = useState(false);

  // Handlers
  const handleUpdateOngoing = () => setUpdateOngoing(true);

  const handleOnChangeNote = e => setNewNote(e.target.value);

  const handleUpdateNote = (e) => {
    if((!e && newNote !== '') || (e && newNote && e.key === 'Enter' && !e.shiftKey)) {
      onUpdateNote({ variables: { _id: id, content: newNote } })
        .catch(updateNoteMutationError => {
          message.error(updateNoteMutationError);
        }).finally(() => {
          setUpdateOngoing(false);
        });
    }
  };

  const handleDeleteNote = (e) => {
    e.stopPropagation();

    onDeleteNote({ variables: { _id: id }, refetchQueries: ['NotesQuery'] }).then(() => {
      message.success('Note deleted');
    }).catch(deleteNoteMutationError => {
      message.error(deleteNoteMutationError);
    });
  };

  const handleOnMouseOver = () => setIsHovered(true);
  const handleOnMouseLeave = () => setIsHovered(false);

  useOnclickOutside(ref, () => {
    if(updateOngoing) {
      handleUpdateNote();
    }
  });

  return (
    // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
    <NoteContent
      onClick={handleUpdateOngoing}
      onMouseOver={handleOnMouseOver}
      onMouseLeave={handleOnMouseLeave}
    >
      <div ref={ref}>
        {updateOngoing ? (
          <TextArea
            rows={Math.round(newNote.length / MAX_CHARACTERS_PER_LINE) + 1 | 2 }
            value={newNote}
            onChange={handleOnChangeNote}
            onKeyDown={handleUpdateNote}
          />

        ) : (
          <NoteTxt>{ newNote }</NoteTxt>
        )}
      </div>
      <Actions isHovered={isHovered}>
        <CloseCircleTwoTone twoToneColor="#1890ff" onClick={handleDeleteNote} style={{ fontSize: '20px' }} />
      </Actions>
    </NoteContent>
  );
};

export default Note;
