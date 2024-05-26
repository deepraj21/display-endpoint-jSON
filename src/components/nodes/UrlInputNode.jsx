import React, { useState } from 'react';
import { Handle, Position } from 'react-flow-renderer';

const UrlInputNode = ({ data }) => {
    const [url, setUrl] = useState(data.url || '');

    const onChange = (evt) => {
        setUrl(evt.target.value);
        data.onChange(evt.target.value);
    };

    return (
        <div style={{ padding: 10, border: '1px solid white', borderRadius: 5 }}>
            <label style={{ color : 'white'}}>Endpoint URL:</label>
            <input type="text" value={url} onChange={onChange} />
            <Handle type="source" position={Position.Right} />
        </div>
    );
};

export default UrlInputNode;


