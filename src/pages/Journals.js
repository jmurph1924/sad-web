import * as React from 'react'
import Journals from '../components/Journals/Journals';

//Creating Journals Page
const JournalsPage = () => {
    return(
        <div style={{ background: "#041C32", height: "100%", minHeight: "980px" }}>
            <Journals />
        </div>
    );
}
//Exporting Journals Page
export default JournalsPage