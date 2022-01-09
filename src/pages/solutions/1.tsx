import { PageProps } from 'gatsby';
import * as React from 'react';
import { useState } from 'react';
import Layout from '../../components/layout';
import styled from 'styled-components';
import LiHashMap from '../../libs/Map/LiHashMap';
import LiArray from '../../libs/List/LiArray';

const sampleHashMap = new Map();
sampleHashMap.set('2', '0');
sampleHashMap.set('7', '1');
sampleHashMap.set('11', '3');
sampleHashMap.set('15', '4');

const TwoSum: React.FC<PageProps> = (props: PageProps) => (
  <Layout>
    <>{props.path}</>
    <div>01. Two Sum</div>
    <div>static code</div>
    <div>user input</div>
    <div>
      algo visualization
      <div className="input-section">
        <LiArray data={['2', '7', '11', '15']}></LiArray>
        <LiHashMap initialData={sampleHashMap}></LiHashMap>
      </div>
      <div className="output-section">
        {/* <LiArray data={[]}></LiArray> */}
      </div>
    </div>
  </Layout>
);

export default TwoSum;
