/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

import { VITE_APP } from '../constants';
import { search } from './search';
import DataService from './firebase';

const mapError = (e: unknown) => {
  if (typeof e === "string") {
    return e.toUpperCase()
  } else if (e instanceof Error) {
    return e.message
  }
}

export {
  VITE_APP,
  axios,
  mapError,
  search,
  DataService,
}