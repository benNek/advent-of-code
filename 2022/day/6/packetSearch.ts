function calculateWindowSize(windowFrequencies): number {
  return Object.values(windowFrequencies).reduce((acc, current) => (acc as number) + (current as number), 0) as number;
}

export default function searchForPacket(buffer: string, markerCount: number) {
  const windowFrequencies = {};
  for (let i = 0; i < buffer.length; i++) {
    let char = buffer[i];
    if (windowFrequencies[char]) {
      windowFrequencies[char]++;
    } else {
      windowFrequencies[char] = 1;
    }

    if (calculateWindowSize(windowFrequencies) >= markerCount) {
      if (Object.values(windowFrequencies).some(count => count !== 1)) {
        // there are duplicates. move the window
        const windowStartChar = buffer[i - markerCount + 1];
        windowFrequencies[windowStartChar]--;
        if (windowFrequencies[windowStartChar] === 0) {
          delete windowFrequencies[windowStartChar];
        }

      } else {
        return i + 1;
      }
    }
  }
}