import { interval, sampleTime , scan , tap } from 'rxjs';

const mockUnitChange = () => Math.round( Math.random()*10 - 4);
//Emits random values around 30000, every 5 sec
const mockSource = interval(5000).pipe(
                    scan( (acc, v) => acc + mockUnitChange(), 30000 )
                   );

//Filter the source and emits the latest values, every 15 sec
const sampleToSave = mockSource.pipe(
                        tap(v => console.log("realtime value :" + v) ),
                        sampleTime(15000),
                     );
sampleToSave.subscribe( x => console.log("sample for saving :" + x) );