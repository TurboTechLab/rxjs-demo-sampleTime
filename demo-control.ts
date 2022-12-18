import {fromEvent, map} from 'rxjs';

export const start = fromEvent(document.getElementById('start'),'click')
                     .pipe(map(click => 'start'));
export const stop = fromEvent(document.getElementById('stop'),'click')
                     .pipe(map(click => 'stop'));