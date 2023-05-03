export default class CommonUtils {
  public static buffer2HexAddress(address: Buffer): string {
    return "0x" + address.toString("hex").slice(-40);
  }

  public static buffer2Hash(hash: Buffer): string {
    return "0x" + hash.toString("hex");
  }

  public static buffer2NumberString(buffer: Buffer): string {
    return BigInt(CommonUtils.buffer2Hash(buffer)).toString();
  }
}
