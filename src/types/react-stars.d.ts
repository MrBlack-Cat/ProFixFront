declare module 'react-stars' {
    import * as React from 'react';
  
    interface ReactStarsProps {
      count: number;
      value?: number;
      onChange?: (newRating: number) => void;
      size?: number;
      color1?: string;
      color2?: string;
      half?: boolean;
      edit?: boolean;
      className?: string;
    }
  
    export default class ReactStars extends React.Component<ReactStarsProps> {}
  }
  