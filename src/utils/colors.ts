//colorChannelA and colorChannelB are ints ranging from 0 to 255
function colorChannelMixer(
  colorChannelA: number,
  colorChannelB: number,
  amountToMix: number
) {
  var channelA = colorChannelA * amountToMix;
  var channelB = colorChannelB * (1 - amountToMix);
  return channelA + channelB;
}

//rgbA and rgbB are arrays, amountToMix ranges from 0.0 to 1.0
//example (red): rgbA = [255,0,0]
export function colorMixer(
  rgbA: number[],
  rgbB: number[],
  amountToMix: number
) {
  var r = colorChannelMixer(rgbA[0], rgbB[0], amountToMix);
  var g = colorChannelMixer(rgbA[1], rgbB[1], amountToMix);
  var b = colorChannelMixer(rgbA[2], rgbB[2], amountToMix);
  return 'rgb(' + r + ',' + g + ',' + b + ')';
}

export function getRGBArray(rgb: string) {
  return rgb.match(/\d+/g) as unknown as number[];
}
