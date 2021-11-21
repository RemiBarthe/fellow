import { db } from '../firebase';
import { doc,  collection, setDoc, addDoc, increment, deleteDoc } from 'firebase/firestore';

export const setUserDocument = (user) => {
  const userRef = doc(db, 'users', user.uid);
  setDoc(userRef, user, { merge: true });
};

export const addSpaceDocument = (userId, title) => {
  const spacesRef = collection(
    db,
    'users',
    userId,
    'spaces'
  );

  addDoc(spacesRef, {
    title: title,
    ticketsNumber: 0
  });
};

export const incrementTicketsNumber = (userId, spaceId) => {
  const spaceRef = doc(
    db,
    'users',
    userId,
    'spaces',
    spaceId
  );
  setDoc(spaceRef, { ticketsNumber: increment(1) }, { merge: true });
};

export const addTicketDocument = (userId, spaceId, slug) => {
  const ticketsRef = doc(
    db,
    'users',
    userId,
    'spaces',
    spaceId,
    'tickets',
    slug
  );
  return setDoc(ticketsRef, { 
    slug, 
    title: `Titre temporaire ${slug}`, 
    creationDate: new Date(),
    updateDate: new Date(),
    content: '',
    state: 'todo'
  }, { merge: true });
};

export const setTicketDocument = (userId, spaceId, ticket) => {
  const ticketsRef = doc(
    db,
    'users',
    userId,
    'spaces',
    spaceId,
    'tickets',
    ticket.id
  );
  return setDoc(ticketsRef, ticket, { merge: true });
};

export const deleteTicketDocument = (userId, spaceId, ticket) => {
  const ticketsRef = doc(
    db,
    'users',
    userId,
    'spaces',
    spaceId,
    'tickets',
    ticket.id
  );
  return deleteDoc(ticketsRef, ticket, { merge: true });
};