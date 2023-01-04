import React from 'react';
import sketch from './test';
import { ReactP5Wrapper } from 'react-p5-wrapper';


function Ojala(){
    return(
        <div className='App'>
            <header>
                <>
                <P5Wrapper sketch={sketch}/>
                </>
            </header>
        </div>
    )
}
export default Ojala;