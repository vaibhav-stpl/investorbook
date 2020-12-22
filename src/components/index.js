import React, { useState } from 'react'
import { Tabs ,Tab} from 'react-bootstrap'
import Investors from './Investors'
import Companies from './Companies'
const Home = () => {
    const [key, setKey] = useState('investors');

    return (
      <div>
        <h3><span>Investor</span>Book</h3>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab eventKey="investors" title="Investors">
          {key === 'investors' &&  <Investors /> }
        </Tab>
        <Tab eventKey="companies" title="Company">
          {key === 'companies' &&  <Companies /> }
        </Tab>
      </Tabs>
      </div>)
}

export default Home;