import React from 'react';
import { Handle, Position } from 'react-flow-renderer';

const JsonDisplayNode = ({ data }) => {
    return (
        <div style={{ padding: 10, border: '1px solid white', borderRadius: 5 }}>
            <label style={{ color : 'white'}}>JSON Data : </label>
            <pre style={{ overflow: 'auto', maxHeight: 150 , color: 'white'}}>{JSON.stringify(data.json, null, 2)}</pre>
            <Handle type="target" position={Position.Left} />
        </div>
    );
};

export default JsonDisplayNode;
