import { axiosInstance } from './API/axiosInstance';
import API from './API/api.js';
import TextHelper from './data/TextHelper';
import OutputHelper from './data/OutputHelper';
import { useKeyPress, useLocalStorage, useLocation } from './hooks';
import { socketInstance, useSocket, socketAuthCallback } from './socket';
import Animator, { AnimationWrapper, AnimatedObject } from "./animations/Animator";
import ArchiveAnimations from "./animations/Archive";
import ElementHelper from './element/ElementHelper';

export {
  axiosInstance,
  API,
  TextHelper,
  OutputHelper,
  useKeyPress,
  useLocalStorage,
  useLocation,
  socketInstance,
  useSocket,
  socketAuthCallback,
  Animator,
  AnimationWrapper,
  ArchiveAnimations,
  AnimatedObject,
  ElementHelper
};
