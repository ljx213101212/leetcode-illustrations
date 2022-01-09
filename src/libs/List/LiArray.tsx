import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import ArrowUpIcon from '../../assets/arrow-up.svg';
import { colorMixer, getRGBArray } from '../../utils/colors';

const LiArrayPointer: React.FC<any> = ({ left }) => {
  const iconRef = React.useRef<HTMLDivElement>(null);

  const getInitialLeftOffset = () => {
    if (!iconRef.current?.offsetWidth) {
      return left;
    }
    return left - iconRef.current?.offsetWidth / 2;
  };

  return (
    <LiArrayPointerContainer>
      <LiArrayPointerWrapper style={{ left: `${getInitialLeftOffset()}px` }}>
        <div ref={iconRef}>
          <ArrowUpIcon />
        </div>
      </LiArrayPointerWrapper>
    </LiArrayPointerContainer>
  );
};

interface LiArrayPointerSliderProps {
  pointers: Pointer[];
  itemNumber: number;
  stepLength: number;
}
const LiArrayPointerSlider: React.FC<LiArrayPointerSliderProps> = ({
  pointers,
  itemNumber,
  stepLength: halfItemWidth,
}) => {
  const getLeft = (pointer: Pointer) => {
    return (pointer.index + 1) * halfItemWidth;
  };

  return (
    <LiArrayPointerSliderContainer>
      {pointers.map((pointer) => {
        return <LiArrayPointer left={getLeft(pointer)} />;
      })}
    </LiArrayPointerSliderContainer>
  );
};
const LiArrayPointerSliderContainer = styled.div`
  width: 100%;
  border: 1px solid #ccc;
`;

interface LiArrayItemProps {
  data: string;
  backgroundColor: string;
}
const LiArrayItem = React.forwardRef<HTMLDivElement, LiArrayItemProps>(
  (props, ref) => {
    return (
      <>
        <LiArrayItemContainer
          ref={ref!}
          style={{ backgroundColor: `${props.backgroundColor}` }}
        >
          {props.data}{' '}
        </LiArrayItemContainer>
      </>
    );
  }
);
const LiArrayItemContainer = styled.div`
  flex: 1;
  padding: 0.6rem;
  border: 1px solid;
  min-width: 2rem;
}
`;

interface Pointer {
  alias: string;
  index: number;
  backgroundColor: string;
}

const defaultPoints = [
  {
    alias: '1',
    index: 0,
    backgroundColor: 'rgb(173,216,230)',
  },
] as Pointer[];

interface LiArrayProps {
  data: string[];
  pointers?: Pointer[];
}

const LiArray: React.FC<LiArrayProps> = ({ data, pointers: p }) => {
  const arrayItemRef = React.useRef<HTMLDivElement>(null);
  const [arrayItemLength, setArrayItemLength] = useState(0);
  const [pointers, setPointers] = useState<Pointer[]>(p ?? defaultPoints);

  React.useEffect(() => {
    getArrayItemLength();
    window.addEventListener('resize', getArrayItemLength);
    return () => {
      window.removeEventListener('resize', getArrayItemLength);
    };
  }, []);

  const getArrayItemLength = () => {
    const arrayItem = arrayItemRef.current;
    if (typeof arrayItem?.clientWidth === 'number') {
      setArrayItemLength(arrayItem.offsetWidth);
    }
  };

  const getBackgroundColor = (index: number) => {
    let color = 'rgb(255,255,255)';
    for (let i = 0; i < pointers.length; i++) {
      if (pointers[i].index === index) {
        console.log('bingo', index);
        color = colorMixer(
          getRGBArray(color),
          getRGBArray(pointers[i].backgroundColor),
          0.5
        );
      }
    }
    return color;
  };

  return (
    <LiArrayContainer>
      <LiArrayItemWrapper>
        {data.map((item, index) => (
          <LiArrayItem
            data={item}
            ref={arrayItemRef}
            backgroundColor={getBackgroundColor(index)}
          />
        ))}
      </LiArrayItemWrapper>
      <LiArrayPointerSlider
        pointers={pointers}
        stepLength={arrayItemLength / 2}
        itemNumber={data.length}
      ></LiArrayPointerSlider>
    </LiArrayContainer>
  );
};

const LiArrayPointerContainer = styled.div`
  position: relative;
  height: 30px;
`;
const LiArrayPointerWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  height: 24px;
`;

const LiArrayContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;
`;

const LiArrayItemWrapper = styled.div`
  display: flex;
`;

export default LiArray;
