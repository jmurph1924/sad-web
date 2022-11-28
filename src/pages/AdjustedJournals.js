import * as React from 'react'
import AdjustedJournals from '../components/AdjustedJournals/AdjustedJournals';

//Creating Journals Page
const AdjustedJournalsPage = () => {
    return(
        <div style={{ background: "#041C32", height: "100%", minHeight: "980px" }}>
            <AdjustedJournals />
        </div>
    );
}
//Exporting Journals Page
export default AdjustedJournalsPage