import { timer, sampleTime , scan , switchMap, 
         tap, EMPTY, merge, startWith } from 'rxjs';
import {start, stop} from './demo-control';

const mockUnitChange = () => Math.round( Math.random()*10 - 4);
//Emits random values around 30000, every 5 sec
const mockSource = timer(1000,5000).pipe(
                    scan( (acc, v) => acc + mockUnitChange(), 30000 ),
                    tap(v => console.log("source value :" + v) ),
                   );

//Filter the source and emits the latest values, every 15 sec
const sampleToSave = mockSource.pipe(                        
                        sampleTime(15000),
                        tap(v => console.log("sample for saving :" + v) ),
                     );

const demoControl = merge(start,stop).pipe(
   startWith('stop'),
   switchMap(command => (command == 'start')? sampleToSave : EMPTY)
).subscribe();                     

