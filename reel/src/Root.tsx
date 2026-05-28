import React from 'react';
import {Composition} from 'remotion';
import {ZorfixReel, DURATION, FPS, WIDTH, HEIGHT} from './ZorfixReel';

export const Root: React.FC = () => (
  <Composition
    id="ZorfixReel"
    component={ZorfixReel}
    durationInFrames={DURATION}
    fps={FPS}
    width={WIDTH}
    height={HEIGHT}
  />
);
