import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLinks } from '../redux/Slice/links';
import { LinkBlock } from './linkBlock/LinkBlock';

export const Links = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    const links = localStorage.getItem('links');
    if (links) {
      dispatch(setLinks(JSON.parse(links)))
    }
  }, [dispatch])

  return (
    <LinkBlock />
  );
};
