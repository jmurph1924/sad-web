// Always gets Imported
import * as React from 'react'
// This is your component that has the content portion of the page
import SampleComponent from '../components/SampleComponent/SampleComponent'

// Functional component in react
const SamplePage = () => {

    return (
        //Sketchily sets a height and background. Change if the component is running into the Footer section
        <div style={{ background: "#041C32", height: "2000px" }}>
            {/* The component that is linked with the page */}
            <SampleComponent />
        </div>
    )
}

// Has to be exported at the bottom
export default SamplePage