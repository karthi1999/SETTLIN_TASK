import crypto from 'crypto';

const generateRandomUuid = () => {
  const buffer = crypto.randomBytes(8); // 8 bytes = 64 bits

  // Convert the buffer to a 64-bit integer
  const randomUint64 = buffer.readBigUInt64BE(0);

  // Convert to string and pad with zeros to ensure it's 19 characters long
  const paddedResult = randomUint64.toString().padStart(19, '0').slice(0, 19);
  return -paddedResult;
}

export default generateRandomUuid;
