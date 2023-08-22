function Masking(userId: string) {
  const mask = "*".repeat(userId.length - 3);
  return userId.slice(0, 3) + mask;
}

export default Masking;
