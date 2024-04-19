"use client";

import React from 'react';
import Typed from 'typed.js';

const TypedBios = () => {
const el = React.useRef(null);
const typed = React.useRef<Typed | null>(null);

React.useEffect(() => {
    typed.current = new Typed(el.current, {
        stringsElement: '#bios',
        typeSpeed: 40,
        backSpeed: 10,
        loop: true,
        backDelay: 1000,
    });
    return () => typed.current?.destroy();
}, []);

  return (
    <div>
      <span>👋 </span>
      <ul id="bios" className="hidden">
        <li>
          I'm aliased as <b className="text-primary-500">Amos</b> at work.
        </li>
        <li>
          I'm a <b className="text-primary-500">Software</b> Engineer.
        </li>
        <li>
          I'm a <b className="text-primary-500">Machine Learning</b> Engineer.
        </li>
        <li>
          I'm a PC <b className="text-primary-500">Gamer</b>.
        </li>
        <li>
          I'm a <b className="text-primary-500">Anime</b> Fan.
        </li>
        <li>
          I'm a <b className="text-primary-500">cat</b>-person
        </li>
      </ul>
      <span ref={el} className="text-neutral-900 dark:text-neutral-200" />
    </div>
  );
};

export default TypedBios;