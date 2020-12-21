import React, { useState } from 'react'
import { Tabs ,Tab} from 'react-bootstrap'
import Investors from './Investors/list'
const Home = () => {
    const [key, setKey] = useState('investors');

    return (
      <div>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab eventKey="investors" title="Investors">
            <Investors />
        </Tab>
        <Tab eventKey="profile" title="Company">
           fdsa
        </Tab>
      </Tabs>
      </div>)
}

export default Home;