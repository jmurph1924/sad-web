import React from "react";
import { useDispatch } from "react-redux";

const RouteChangeDispatch = ({
    location: { pathname },
    children,
    match: {
        params: { value }
    }
}) => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        
    })
}