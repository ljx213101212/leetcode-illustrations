import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';

interface LiHashMapProps {
  initialData: Map<string, string>;
}

const LiHashMap: React.FC<LiHashMapProps> = ({ initialData }) => {
  const [data, setData] = useState(initialData);

  const addKey = (key: string, value: string) => {
    const newData = { ...data } as Map<string, string>;
    if (newData.has(key)) {
      throw 'key is already exist. add key failed';
    }
    newData.set(key, value);
    setData(newData);
  };

  const getKey = (key: string): string => {
    return data.get(key) ?? '';
  };

  const updateKey = (key: string, value: string) => {
    const updateData = { ...data } as Map<string, string>;
    if (!updateData.has(key)) {
      throw 'key is not exist, please use add function';
    }
    updateData.set(key, value);
    setData(updateData);
  };

  const deleteKey = (key: string) => {
    const deleteData = { ...data } as Map<string, string>;
    deleteData.delete(key);
    setData(deleteData);
  };

  return (
    <LiHashMapContainer>
      {Array.from(data.keys()).map((key) => {
        const val = JSON.parse(data.get(key) ?? '');
        console.log(key, val, data.has(key));
        return (
          <LiHashMapKeyRow className="li-hash-map-key-row">
            <LiHashMapValueWrapper>
              <LiHashMapKeyItem className="li-hash-map-key-item">
                {key}
              </LiHashMapKeyItem>
              <LiHashMapKeyValue className="li-hash-map-value-item">
                {data.has(key) && (
                  <div className="li-hash-map-key-value">
                    {Array.isArray(val) && val?.map((item) => val)}
                    {!Array.isArray(val) && typeof val !== 'object' && val}
                  </div>
                )}
              </LiHashMapKeyValue>
            </LiHashMapValueWrapper>
          </LiHashMapKeyRow>
        );
      })}
    </LiHashMapContainer>
  );
};

const LiHashMapContainer = styled.div`
  display: flex;
`;

const LiHashMapKeyRow = styled.div`
  display: flex;
  margin-top: 1rem;
  flex: 1;
`;

const LiHashMapValueWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const LiHashMapKeyItem = styled.div`
  padding: 0.6rem;
  border: 1px solid;
  // border-bottom: 0;
  min-width: 3rem;
`;

const LiHashMapKeyValue = styled.div`
  padding: 0.6rem;
  border: 1px dashed;
  // border-bottom: 0;
  margin-top: 1rem;
  min-width: 3rem;
`;

export default LiHashMap;
