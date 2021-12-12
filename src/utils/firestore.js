import { db } from '../firebase';
import { doc,  collection, setDoc, addDoc, getDoc, increment, deleteDoc } from 'firebase/firestore';

export const setUserDocument = (user) => {
  const userRef = doc(db, 'users', user.uid);
  setDoc(userRef, user, { merge: true });
};

export const deleteUserDocument = (user) => {
  const userRef = doc(
    db,
    'users',
    user.uid
  );
  return deleteDoc(userRef);
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
  const ticketRef = doc(
    db,
    'users',
    userId,
    'spaces',
    spaceId,
    'tickets',
    slug
  );
  return setDoc(ticketRef, { 
    slug, 
    title: `Titre temporaire ${slug}`, 
    creationDate: new Date(),
    updateDate: new Date(),
    content: '',
    state: 'todo',
    todoList: [],
    todoListDonePercentage: 0
  }, { merge: true });
};

export const setTicketDocument = (userId, spaceId, ticket) => {
  const ticketRef = doc(
    db,
    'users',
    userId,
    'spaces',
    spaceId,
    'tickets',
    ticket.id
  );
  return setDoc(ticketRef, ticket, { merge: true });
};

export const deleteTicketDocument = (userId, spaceId, ticket) => {
  const ticketRef = doc(
    db,
    'users',
    userId,
    'spaces',
    spaceId,
    'tickets',
    ticket.id
  );
  return deleteDoc(ticketRef);
};

export const deleteSpaceDocument = (userId, space) => {
  const SpaceRef = doc(
    db,
    'users',
    userId,
    'spaces',
    space.id
  );
  return deleteDoc(SpaceRef);
};

export const setSpaceDocument = (userId, space) => {
  const SpaceRef = doc(
    db,
    'users',
    userId,
    'spaces',
    space.id
  );
  return setDoc(SpaceRef, space, { merge: true });
};

export const getStatisticsDocument = async (userId, spaceId, statsId) => {
  const StatsRef = doc(
    db,
    'users',
    userId,
    'spaces',
    spaceId,
    'statistics',
    statsId
  );
  const docStats = await getDoc(StatsRef);

  if (docStats.exists()) {
    return docStats.data();
  }
  return false;
};

export const setStatisticsDocument = (userId, spaceId, stats) => {
  const StatsRef = doc(
    db,
    'users',
    userId,
    'spaces',
    spaceId,
    'statistics',
    stats.id
  );
  return setDoc(StatsRef, stats, { merge: true });
};