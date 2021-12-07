import { PageProps } from "gatsby"
import * as React from "react"
import Layout from "../../components/layout";

interface LiArrayItemProps {
  data: string;
}
const LiArrayItem: React.FC<LiArrayItemProps> = ({data}) => (
  <div>
    {data}
  </div>
)

interface LiArrayProps {
  data: string[];
}
const LiArray: React.FC<LiArrayProps> = ({data}) => (
  <>
    {data.map((item) => <LiArrayItem data={item}/>)}
  </>
)


interface LiHashMapProps {
  data: Map<string, string[]>;
}

const LiHashMap: React.FC<LiHashMapProps> = ({data}) => (
  <>
    {
      Array.from(data.keys()).map((key) => {

        return (
          <div className="li-hash-map-key-row">
            <div className="li-hash-map-key-item">
              {key}
            </div>
            {data.has(key) ?? 
              <div className="li-hash-map-key-value">
                  {
                    data.get(key)?.map((item) => (
                      <div className="li-hash-map-value-item">
                        {item}
                      </div>
                    ))
                  }
              </div>
            }
          </div>
        )
      })
    }
  </>
);


const TwoSum: React.FC<PageProps> = (props: PageProps) => (
  <Layout>
    <>{props.path}</>
    <div>01. Two Sum</div>
    <div>
       static code
    </div>
    <div>
      user input
    </div>
    <div>
      algo visualization
      <div className="input-section">
        <LiArray data={["2","7","11","15"]}></LiArray>
        <label>9</label>
        <LiHashMap data={new Map()}></LiHashMap>
      </div>
      <div className="output-section">
        <LiArray data={[]}></LiArray>
      </div>
    </div>

  </Layout>
)

export default TwoSum