import React, { useState } from 'react'
import { Tabs ,Tab} from 'react-bootstrap'
import Investors from './Investors'
import Companies from './Companies'
const Home = () => {
    const [key, setKey] = useState('investors');

    return (
      <div class="main-wrapper">
        <div class="container">
        <h3 class="logo"><span>Investor</span>Book</h3>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        class="tab-header"
      >
        <Tab eventKey="investors" title="Investors">
          {key === 'investors' &&  <Investors /> }
        </Tab>
        <Tab eventKey="companies" title="Company">
          {key === 'companies' &&  <Companies /> }
        </Tab>
      </Tabs>
        </div>
      </div>)
}

export default Home;