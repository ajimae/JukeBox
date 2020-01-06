function currentTimeConverter(currentTime, totalTime, scale = 360) {
  const degree = (currentTime * scale) / totalTime;
  return degree;
}

export default currentTimeConverter;
